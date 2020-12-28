const db = require('./services/db');

const model = require('./model');

function findQuestionNumbersUnderTopic(topic, page, perPage) {
    return new Promise(((resolve, reject) => {
        db.connectToDB(dbClient => {
            return model.findQuestionsUnderTopic(topic, (page - 1)*perPage, perPage, dbClient).then(questions => {
                resolve(questions.map(question => question.questionNumber));
            }).catch(reject);
        });
    }));
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
    findQuestionNumbersUnderTopic,
    findTopics,
    findQuestions,
};
