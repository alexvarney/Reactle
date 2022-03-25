import { renderHook, act } from "@testing-library/react-hooks";
import { useGameState } from "./use-game-state";
import userEvent from "@testing-library/user-event";

describe("useGameState", () => {
  it("ignores inputs after the fifth letter of the word", () => {
    const { result } = renderHook(() => useGameState());
    userEvent.keyboard("abcdefghijk");

    expect(result.current.current).toEqual("abcde");

    userEvent.keyboard("{Backspace}");
    expect(result.current.current).toEqual("abcd");
  });
  it("after exactly 5 characters are input, pressing enter locks the guess and jumps to a new line", () => {
    const { result } = renderHook(() => useGameState());
    userEvent.keyboard("hel");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("lo");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("words");
    expect(result.current.current).toEqual("words");
    expect(result.current.previous).toContain("hello");
  });

  it("should only accept valid english words", () => {
    const { result } = renderHook(() => useGameState());
    userEvent.keyboard("hello");
    userEvent.keyboard("{Enter}");
    expect(result.current.previous).toContain("hello");
    userEvent.keyboard("asdfg");
    userEvent.keyboard("{Enter}");
    expect(result.current.previous).not.toContain("asdfg");
    expect(result.current.current).toEqual("asdfg");
  });
});
