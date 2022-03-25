import { renderHook, act } from "@testing-library/react-hooks";
import {
  useKeyboardListener,
  TKeyEventCallback,
} from "./use-keyboard-listener";
import userEvent from "@testing-library/user-event";

describe("useKeyboardListener", () => {
  it("should call the callback function when a key is pressed", () => {
    const fn = jest.fn();

    renderHook(() => useKeyboardListener(fn, jest.fn(), jest.fn()));

    userEvent.keyboard("test");

    expect(fn).toBeCalledTimes(4);
  });

  it("should only call the callback for upper and lower characters in the latin alphabet", () => {
    let fn = jest.fn();

    renderHook(() => useKeyboardListener(fn, jest.fn(), jest.fn()));

    userEvent.keyboard(";;;;");

    expect(fn).toBeCalledTimes(0);

    userEvent.keyboard("ab.C_d");

    expect(fn).toBeCalledTimes(4);

    fn = jest.fn();

    renderHook(() => useKeyboardListener(fn, jest.fn(), jest.fn()));

    expect(fn).toHaveBeenCalledTimes(0);

    userEvent.keyboard("AbCdEfGhIjKlMnOpQrStUvWxYz;");

    expect(fn).toHaveBeenCalledTimes(26);
  });

  it("should fire when the backspace key is pressed", () => {
    let keyUp = jest.fn();
    let backspace = jest.fn();
    let enter = jest.fn();

    renderHook(() => useKeyboardListener(keyUp, backspace, enter));

    userEvent.keyboard("{Backspace}");

    expect(backspace).toBeCalledTimes(1);
    expect(keyUp).toHaveBeenCalledTimes(0);

    userEvent.keyboard("ab.C_d{Backspace}");

    expect(backspace).toBeCalledTimes(2);
    expect(keyUp).toBeCalledTimes(4);
  });
});
