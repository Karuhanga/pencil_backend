const db = require('./services/db');

const model = require('./model');

function findQuestionIdsUnderTopic(topic, page, perPage) {
    // todo implement this
    return Promise.resolve([1, 2]);
}

function findTopics(page, perPage) {
    return new Promise(((resolve, reject) => {
        db.connectToCollection(db.TOPIC_COLLECTION, dbClient => {
            return model.findTopics((page - 1)*perPage, perPage, dbClient).then(resolve).catch(reject);
        });
    }));
}

module.exports = {
    findQuestionIdsUnderTopic,
    findTopics,
};
