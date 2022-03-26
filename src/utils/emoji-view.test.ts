import { getEmojiView } from "./emoji-view";

describe("Emoji Generation", () => {
  it("should match snapshots", () => {
    let testState = {
      previous: ["words", "guest", "never", "kelly"],
      current: "",
      target: "kelly",
    };

    expect(getEmojiView(testState, "solved", 1)).toMatchInlineSnapshot(`
"Reactle #1 (4/6)
⬛⬛⬛⬛⬛
⬛⬛🟨⬛⬛
⬛🟩⬛⬛⬛
🟩🟩🟩🟩🟩
"
`);
    testState = {
      previous: ["never", "close", "stuff", "stand", "mends", "ended"],
      current: "",
      target: "ended",
    };

    expect(getEmojiView(testState, "solved", 1)).toMatchInlineSnapshot(`
"Reactle #1 (6/6)
🟨🟨⬛🟩⬛
⬛⬛⬛⬛🟨
⬛⬛⬛⬛⬛
⬛⬛⬛🟨🟩
⬛🟨🟨🟨⬛
🟩🟩🟩🟩🟩
"
`);

    testState = {
      previous: ["stuff", "never", "guess", "right", "words", "tests"],
      current: "",
      target: "total",
    };

    expect(getEmojiView(testState, "incomplete", 1)).toMatchInlineSnapshot(`
"Reactle #1 (x/6)
⬛🟨⬛⬛⬛
⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛
⬛⬛⬛⬛🟨
⬛🟩⬛⬛⬛
🟩⬛⬛🟨⬛
"
`);
  });
});
