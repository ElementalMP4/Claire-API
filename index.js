const express = require('express');
const app = express();

const { generate } = require("./brain");

const port = 3000;

app.use(express.static('public'));

app.get('/chat', (req, res) => {
    const prompt = req.query.prompt;
    res.send(generate(prompt));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});