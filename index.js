const express = require('express');
const app = express();
const config = require("./config.json");

const claire = require("./brain");

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.redirect("/index.html");
});

app.get('/chat', (req, res) => {
    const prompt = req.query.prompt;
    res.send(JSON.stringify({ message: claire.generate(prompt) }));
});

app.get("/learn", (req, res) => {
    let learningEnabled = config.learningEnabled;
    if (learningEnabled) {
        claire.learn(req.query.message, req.query.reply);
        res.statusMessage = "Added new message pair";
        res.status(200).end();
    } else {
        res.statusMessage = "Learning is disabled";
        res.status(403).end();
    }
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});