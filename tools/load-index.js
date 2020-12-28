const db = require('../services/db');
const model = require('../model');

function removeDuplicates(array){
    return array.filter((value, index, array) => array.indexOf(value) === index);
}

async function findTopicAndAncestorNames(topicId, dbClient) {
    let topic = await model.getTopicById(topicId, dbClient);
    const topicNames = [topic.topicName];
    while (topic.parentTopicId){
        topic = await model.getTopicById(topic.parentTopicId, dbClient);
        topicNames.push(topic.topicName);
    }
    return topicNames;
}

async function indexQuestionTopics(question, dbClient) {
    console.debug(`Indexing question: ${question.questionNumber}`);

    const indexClient = dbClient.collection(db.INDEX_COLLECTION);
    let topicNames = [];

    for (const topicId of question.topicIds) {
        const additionalTopicNames = await findTopicAndAncestorNames(topicId, dbClient);
        topicNames = [...topicNames, ...additionalTopicNames];
    }
    topicNames = removeDuplicates(topicNames);

    return indexClient.insertMany(topicNames.map(topicName => ({questionNumber: question.questionNumber, topicName})));
}

function loadIndices(dbClient) {
    return model.getAllQuestions(dbClient).then(questions => Promise.all(questions.map(question => indexQuestionTopics(question, dbClient))));
}

function setupIndexIndices(dbClient){
    console.debug("Setting up index indices...");
    const indexClient = dbClient.collection(db.INDEX_COLLECTION);
    return indexClient.createIndex({questionNumber: 1, topicName: 1}, {unique: true});
}


db.connectToDB(dbClient => {
    return setupIndexIndices(dbClient).then(() => loadIndices(dbClient));
});
