const express = require('express');
const config = require('./config');
const findQuestionIdsUnderTopic = require('./controller').findQuestionIdsUnderTopic;

const app = express();
app.use(express.json());

app.get('/search', function (req, res) {
    const topic = req.query.q;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    if (!topic) return res.status(422).json({message: "Missing 'q' query param."});

    findQuestionIdsUnderTopic(topic, page, perPage)
        .then(data => res.json({data, page, perPage}));
})

app.listen(config.API_PORT, function () {
    console.info(`App listening on port ${config.API_PORT}!`);
});
