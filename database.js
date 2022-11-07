const config = require("./config.json");
const db = require('better-sqlite3')(config.databaseName || "Claire.db");

const GET_ALL_SENTENCES_CONTAINING_WORD = "SELECT * FROM MessagePairs WHERE LOWER(message) LIKE ?";
const CREATE_TABLE = "CREATE TABLE IF NOT EXISTS MessagePairs (message TEXT, reply TEXT)"

db.exec(CREATE_TABLE);

function getAllRepliesForWord(word) {
    return db.prepare(GET_ALL_SENTENCES_CONTAINING_WORD).all("% " + word + " %");
}

module.exports = { getAllRepliesForWord };