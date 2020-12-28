const db = require('./services/db');

function getTopic(topicName, dbClient) {
    dbClient[db.TOPIC_COLLECTION].findOne({topicName});
}
