const brain = require("./brain");

const TEST_DATA = [
    { word: "first", next: "firstNext", frequency: 3 },
    { word: "second", next: "secondNext", frequency: 2 },
    { word: "third", next: "third", frequency: 1 }
]

test("Brain token sort returns expected result", () => {
    expect(brain.getMostLikely(TEST_DATA)).toEqual({ word: "first", next: "firstNext", frequency: 3 })
});