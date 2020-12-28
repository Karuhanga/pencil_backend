const fs = require('fs');

const db = require('../services/db');

const TOPIC_PATHS = JSON.parse(fs.readFileSync('./data/topics.json'));
const TOPIC_LEVEL_KEYS = ['Topic Level 1', 'Topic Level 2', 'Topic Level 3'];

function getOrCreateTopic(topicName, parentTopic, topicClient) {
    console.debug(`Setting up ${topicName} with parent ${parentTopic && parentTopic.value.topicName}...`);
    return topicClient.findOneAndUpdate(
        {topicName},
        {$setOnInsert: {topicName, parentTopicId: parentTopic && parentTopic.value._id}},
        {returnOriginal: false, upsert: true,},
    );
}

async function loadTopics(topicPaths, topicLevelKeys, topicClient) {
    for (const topicPath of topicPaths) {
        let parentTopic;
        for (const topicLevelKey of topicLevelKeys) {
            const topicName = topicPath[topicLevelKey];
            if (!topicName) break;

            parentTopic = await getOrCreateTopic(topicName, parentTopic, topicClient);
        }
    }
}

function setupTopicIndices(dbClient) {
    console.debug("Setting up topic indices...");
    return dbClient.createIndex({topicName: 1}, {unique: true})
}

db.connectToDB(dbClient => {
    const topicClient = dbClient.collection(db.TOPIC_COLLECTION);
    return setupTopicIndices(topicClient).then(() => loadTopics(TOPIC_PATHS, TOPIC_LEVEL_KEYS, topicClient));
});
