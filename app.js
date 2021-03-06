const express = require('express');
const config = require('./config');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

app.get('/topics', function (req, res) {
    const page = +req.query.page || 1;
    const perPage = +req.query.perPage || 10;

    controllers.findTopics(page, perPage).then(data => res.json({data, page, perPage}));
});

app.get('/questions', function (req, res) {
    const page = +req.query.page || 1;
    const perPage = +req.query.perPage || 10;

    controllers.findQuestions(page, perPage).then(data => res.json({data, page, perPage}));
});

app.get('/search', function (req, res) {
    const topic = req.query.q;
    const page = +req.query.page || 1;
    const perPage = +req.query.perPage || 100;

    if (!topic) return res.status(422).json({message: "Missing 'q' query param."});

    controllers.findQuestionNumbersUnderTopic(topic, page, perPage)
        .then(data => res.json({data, page, perPage}));
});

app.get('*', function(req, res){
    res.redirect("/search");
});

app.listen(config.API_PORT, function () {
    console.info(`App listening on port ${config.API_PORT}!`);
});
