const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const config = require('../config');

const TOPIC_COLLECTION = "topics";

function connectToCollection(collectionName, dbCollectionClientConsumer) {
    MongoClient.connect(config.DB_URL, function(err, client) {
        assert.equal(null, err);

        const db = client.db(config.DB_NAME);
        const collection = db.collection(collectionName);

        dbCollectionClientConsumer(collection).finally(() => client.close());
    });
}

module.exports = {
    connectToCollection,
    TOPIC_COLLECTION,
}
