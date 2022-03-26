import { getInitialWord } from "./get-initial-word";

describe("get initial word", () => {
  it("should return different words", () => {
    const results = Array.from({ length: 10 }).map(() => getInitialWord());

    const uniqueKeys = new Set(results);

    expect(uniqueKeys.size).toBeGreaterThan(1);
  });
});
