const database = require("./database");

const length = 2000;

function learn(message, reply) {
    database.storeNewMessagePair(message, reply);
}

function generate(prompt) {
    let replyPairs = [];
    let words = prompt.split(" ");
    let result = "";
    for (word of words) {
        replyPairs = [...replyPairs, ...database.getAllRepliesForWord(word)];
    }
    let tokens = tokeniseReplies(replyPairs);
    if (tokens.length == 0) return "Huh";
    let next = getRandomStartWord(tokens);
    while (next.next !== "StopWord") {
        if (result.length + (next.word + " ").length > length) break;
        result += next.word + " ";
        let potentials = getWordList(tokens, next.next);
        next = getMostLikely(potentials);
    }
    if (result.length + next.word.length <= length) result += next.word;
    return result.replaceAll("/@/", "'");
}

function getWordList(wordList, nextWord) {
    return wordList.filter(x => x.word == nextWord);
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

module.exports = { generate, learn, getMostLikely }