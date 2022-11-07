const database = require("./database");

function generate(prompt) {
    const replyPairs = database.getAllRepliesForWord(prompt);
    let tokens = tokeniseReplies(replyPairs);

    if (tokens.length == 0) return null;
    let result = "";
    let next = getRandomStartWord(words);
    if (next == null) return null;
    while (next.next !== "StopWord") {
        if (result.length + (next.word + " ").length > length) break;
        result += next.word + " ";
        let potentials = getWordList(words, next.getNext());
        next = getMostLikely(potentials);
    }
    if (result.length + next.word.length <= length) result.push(next.word);
    return result;
}

function getWordList(wordList) {

}

function getRandomStartWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function getMostLikely(wordList) {
    wordList.sort((a, b) => a.frequency > b.frequency);
    return wordList[0];
}

function tokeniseReplies(replyPairs) {
    let sentences = replyPairs.map(replyPair => replyPair.reply);
    let tokens = [];
    for (sentence of sentences) {
        let words = sentence.split(" ");
        for (var i = 0; i < words.length; i++) {
            if (i == words.length - 1) tokens.push({ word: words[i], next: "StopWord" });
            else tokens.push({ word: words[i], next: words[i + 1] });
        }
    }
    let tokensWithCounts = [];
    for (token of tokens) {
        if (tokensWithCounts.includes(token)) {
            let index = tokens.findIndex(t => t.word == token.word && t.next == token.next);
            let existingRecord = tokensWithCounts[index];
            tokensWithCounts[index] = { word: existingRecord.word, next: existingRecord.next, frequency: existingRecord.frequency++ };
        } else {
            tokensWithCounts.push({ word: token.word, next: token.next, frequency: 1 });
        }
    }
    return tokensWithCounts;
}

function learn(message, reply) {

}

module.exports = { generate, learn }