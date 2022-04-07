import { renderHook } from "@testing-library/react-hooks";
import { useKeyboardListener } from "./use-keyboard-listener";
import userEvent from "@testing-library/user-event";
import { ALPHABET } from "./constants";

describe("useKeyboardListener", () => {
  it("should call the callback function when any letter is pressed with the key value", () => {
    const fn = jest.fn();

    renderHook(() => useKeyboardListener(fn));

    userEvent.keyboard(ALPHABET);

    expect(fn).toBeCalledTimes(26);

    Array.from(ALPHABET).forEach((letter) => expect(fn).toBeCalledWith(letter));
  });

  it("should fire when the backspace key is pressed", () => {
    let keyPress = jest.fn();
    renderHook(() => useKeyboardListener(keyPress));

    userEvent.keyboard("{Backspace}");

    expect(keyPress).toHaveBeenCalledTimes(1);

    userEvent.keyboard("ab{Backspace}");

    expect(keyPress).toBeCalledTimes(4);
  });
  it("should fire when the enter key is pressed", () => {
    let keyPress = jest.fn();
    renderHook(() => useKeyboardListener(keyPress));

    userEvent.keyboard("{Enter}");

    expect(keyPress).toHaveBeenCalledTimes(1);

    userEvent.keyboard("ab{Enter}");

    expect(keyPress).toBeCalledTimes(4);
  });
});
