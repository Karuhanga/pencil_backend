const fs = require('fs');

const db = require('../services/db');

const TOPIC_PATHS = JSON.parse(fs.readFileSync('./data/topics.json'));
const TOPIC_LEVELS = ['Topic Level 1', 'Topic Level 2', 'Topic Level 3'];

function getOrCreateTopic(topicName, parentTopic, dbClient) {
    console.debug(`Setting up ${topicName} with parent ${parentTopic && parentTopic.value.topicName}...`);
    return dbClient.findOneAndUpdate(
        {topicName},
        {$setOnInsert: {topicName, parentTopicId: parentTopic && parentTopic.value._id}},
        {returnOriginal: false, upsert: true,},
    );
}

async function loadTopics(topicPaths, topicLevels, dbClient) {
    for (const topicPath of topicPaths) {
        let parentTopic;
        for (const topicLevel of topicLevels) {
            const topicName = topicPath[topicLevel];
            if (!topicName) break;

            parentTopic = await getOrCreateTopic(topicName, parentTopic, dbClient);
        }
    }
}

function setupTopicIndices(dbClient) {
    console.debug("Setting up topic indices...");
    return dbClient.createIndex({topicName: 1}, {unique: true})
}

db.connectToCollection(db.TOPIC_COLLECTION, dbClient => {
    return setupTopicIndices(dbClient).then(() => loadTopics(TOPIC_PATHS, TOPIC_LEVELS, dbClient));
});
