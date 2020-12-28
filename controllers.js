const db = require('./services/db');

const model = require('./model');

function findQuestionIdsUnderTopic(topic, page, perPage) {
    // todo implement this
    return Promise.resolve([1, 2]);
}

function findQuestions(page, perPage) {
    return new Promise(((resolve, reject) => {
        db.connectToDB(dbClient => {
            return model.findQuestions((page - 1)*perPage, perPage, dbClient).then(resolve).catch(reject);
        });
    }));
}

function findTopics(page, perPage) {
    return new Promise(((resolve, reject) => {
        db.connectToDB(dbClient => {
            return model.findTopics((page - 1)*perPage, perPage, dbClient).then(resolve).catch(reject);
        });
    }));
}

module.exports = {
    findQuestionIdsUnderTopic,
    findTopics,
    findQuestions,
};
