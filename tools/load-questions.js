const fs = require('fs');

const db = require('../services/db');
const model = require('../model');

const QUESTIONS = JSON.parse(fs.readFileSync('./data/questions.json'));
const ANNOTATION_KEYS = ['Annotation 1', 'Annotation 2', 'Annotation 3', 'Annotation 4', 'Annotation 5'];

function createQuestion(questionNumber, topics, dbClient){
    console.debug(`Inserting question: ${questionNumber} with topics ${topics.map(topic => topic._id)}...`);
    const questionClient = dbClient.collection(db.QUESTION_COLLECTION);
    return questionClient.insertOne({questionNumber, topicIds: topics.map(topic => topic._id)});
}

// could parallelize this if perf sensitive, but this is easier to debug
async function loadQuestions(questions, annotationKeys, dbClient) {
    for (const question of questions) {
        const annotations = annotationKeys.map(annotationKey => question[annotationKey]).filter(annotation => !!annotation);
        const topics = await Promise.all(annotations.map(annotation => model.getTopicByName(annotation, dbClient))); // could do a single query here :)
        await createQuestion(question['Question number'], topics, dbClient);
    }
}

function setupQuestionIndices(dbClient) {
    console.debug("Setting up question indices...");
    const questionClient = dbClient.collection(db.QUESTION_COLLECTION);
    return questionClient.createIndex({questionNumber: 1, topicName: 1}, {unique: true})
}

db.connectToDB(dbClient => {
    return setupQuestionIndices(dbClient).then(() => loadQuestions(QUESTIONS, ANNOTATION_KEYS, dbClient));
});
