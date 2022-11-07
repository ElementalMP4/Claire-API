const express = require('express');
const app = express();
const config = require("./config.json");

const { generate } = require("./brain");

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.redirect("/index.html");
});

app.get('/chat', (req, res) => {
    const prompt = req.query.prompt;
    res.send(JSON.stringify({ message: generate(prompt) }));
});

app.get("/learn", (req, res) => {
    let learningEnabled = config.learningEnabled;
    if (learningEnabled) {
        res.send("Learning is enabled");
    } else {
        res.send("Learning is disabled");
    }
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});