const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const config = require('../config');

const TOPIC_COLLECTION = "topics";
const QUESTION_COLLECTION = "questions";
const INDEX_COLLECTION = "question_topic_index";

function connectToDB(dbClientConsumer) {
    MongoClient.connect(config.DB_URL, function(err, client) {
        assert.equal(null, err);

        const db = client.db(config.DB_NAME);

        dbClientConsumer(db).finally(() => client.close());
    });
}

module.exports = {
    connectToDB,
    TOPIC_COLLECTION,
    QUESTION_COLLECTION,
    INDEX_COLLECTION,
}
