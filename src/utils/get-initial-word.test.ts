import { getInitialWord } from "./get-initial-word";

describe("get initial word", () => {
  it("should return different words on different dates", () => {
    const date1 = new Date("2022-03-26T00:00:00+0000");
    const date2 = new Date("2022-02-27T00:00:00+0000");
    const date3 = new Date("2022-02-28T00:00:00+0000");

    const results = [
      getInitialWord(date1),
      getInitialWord(date2),
      getInitialWord(date3),
    ];

    const uniqueKeys = new Set(results);

    expect(uniqueKeys.size).toBeGreaterThan(1);
  });
});
