const db = require('./services/db');

function getTopicByName(topicName, dbClient) {
    const topicClient = dbClient.collection(db.TOPIC_COLLECTION);
    return topicClient.findOne({topicName});
}

function getTopicById(topicId, dbClient) {
    const topicClient = dbClient.collection(db.TOPIC_COLLECTION);
    return topicClient.findOne({_id: topicId});
}

function getAllQuestions(dbClient) {
    const questionClient = dbClient.collection(db.QUESTION_COLLECTION);
    return questionClient.find().toArray();
}

function findTopics(offset, limit, dbClient) {
    const topicClient = dbClient.collection(db.TOPIC_COLLECTION);
    return topicClient.find().sort( { _id: 1 } ).skip(offset).limit(limit).toArray();
}

function findQuestions(offset, limit, dbClient) {
    const questionClient = dbClient.collection(db.QUESTION_COLLECTION);
    return questionClient.find().sort( { _id: 1 } ).skip(offset).limit(limit).toArray();
}

function findQuestionIdsUnderTopic(topicName, offset, limit, dbClient) {
    const indexClient = dbClient.collection(db.INDEX_COLLECTION);
    return indexClient.find({topicName}, {_id : 1}).sort( { _id: 1 } ).skip(offset).limit(limit).toArray();
}

module.exports = {
    getTopicByName,
    findTopics,
    findQuestions,
    getAllQuestions,
    getTopicById,
    findQuestionIdsUnderTopic,
}
