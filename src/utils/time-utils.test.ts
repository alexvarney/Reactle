import { daysBetween } from "./time-utils";

describe("days since", () => {
  it("should calculate the correct offsets", () => {
    const date1 = new Date("2022-01-01T00:00:00+0000");
    const date2 = new Date("2022-01-02T00:00:00+0000");

    expect(daysBetween(date1, date2)).toBe(1);

    const date3 = new Date("2022-01-01T00:00:00+0000");
    const date4 = new Date("2022-02-01T00:00:00+0000");

    expect(daysBetween(date3, date4)).toBe(31);
  });
});
