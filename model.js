function getTopic(topicName, dbClient) {
    dbClient.findOne({topicName});
}

function findTopics(offset, limit, dbClient) {
    return dbClient.find().sort( { _id: 1 } ).skip(offset).limit(limit).toArray();
}

module.exports = {
    getTopic,
    findTopics,
}
