import { renderHook, act } from "@testing-library/react-hooks";
import { useGameState } from "./use-game-state";
import userEvent from "@testing-library/user-event";

describe("useGameState", () => {
  it("ignores inputs after the fifth letter of the word", () => {
    const { result } = renderHook(() => useGameState());

    userEvent.keyboard("abcdefghijk");

    expect(result.current.state.current).toEqual("abcde");

    userEvent.keyboard("{Backspace}");
    expect(result.current.state.current).toEqual("abcd");
  });
  it("after exactly 5 characters are input, pressing enter locks the guess and jumps to a new line", () => {
    const { result } = renderHook(() => useGameState());

    userEvent.keyboard("hel");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("lo");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("words");
    expect(result.current.state.current).toEqual("words");
    expect(result.current.state.previous).toContain("hello");
  });

  it("should only accept valid english words", () => {
    const { result } = renderHook(() => useGameState());

    userEvent.keyboard("hello");
    userEvent.keyboard("{Enter}");
    expect(result.current.state.previous).toContain("hello");
    userEvent.keyboard("asdfg");
    userEvent.keyboard("{Enter}");
    expect(result.current.state.previous).not.toContain("asdfg");
    expect(result.current.state.current).toEqual("asdfg");
  });

  it("should only accept a word once", () => {
    const { result } = renderHook(() => useGameState());

    userEvent.keyboard("hello");
    userEvent.keyboard("{Enter}");

    userEvent.keyboard("hello");
    userEvent.keyboard("{Enter}");

    userEvent.keyboard("hello");
    userEvent.keyboard("{Enter}");

    expect(result.current.state.previous.length).toBe(1);
  });

  it("should allow setting the target word", () => {
    const { result } = renderHook(() => useGameState());

    act(() => result.current.dispatch({ type: "set-target", value: "hello" }));
    expect(result.current.state.target).toEqual("hello");
  });
});
