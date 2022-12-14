const config = require("./config.json");
const db = require('better-sqlite3')(config.databaseName || "Claire.db");

const GET_ALL_SENTENCES_CONTAINING_WORD = "SELECT * FROM MessagePairs WHERE LOWER(message) LIKE ?";
const STORE_NEW_MESSAGE_PAIR = "INSERT INTO MessagePairs VALUES (?, ?)";
const CREATE_TABLE = "CREATE TABLE IF NOT EXISTS MessagePairs (message TEXT, reply TEXT)";
const COUNT_ALL_PAIRS = "SELECT COUNT(*) FROM MessagePairs";

db.exec(CREATE_TABLE);

function getAllRepliesForWord(word) {
    return db.prepare(GET_ALL_SENTENCES_CONTAINING_WORD).all("% " + word + " %");
}

function storeNewMessagePair(message, reply) {
    db.prepare(STORE_NEW_MESSAGE_PAIR).run(message, reply);
}

function getPairCount() {
    return db.prepare(COUNT_ALL_PAIRS).all()[0]["COUNT(*)"];
}

module.exports = { getAllRepliesForWord, storeNewMessagePair, getPairCount };