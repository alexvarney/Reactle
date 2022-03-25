import { renderHook, act } from "@testing-library/react-hooks";
import {
  useKeyboardListener,
  TKeyEventCallback,
} from "./use-keyboard-listener";
import userEvent from "@testing-library/user-event";

describe("useKeyboardListener", () => {
  it("should call the callback function when a key is pressed", () => {
    const fn = jest.fn();

    renderHook(() => useKeyboardListener(fn));

    userEvent.keyboard("test");

    expect(fn).toBeCalledTimes(4);
  });

  it("should only call the callback for upper and lower characters in the latin alphabet", () => {
    let fn = jest.fn();

    renderHook(() => useKeyboardListener(fn));

    userEvent.keyboard(";;;;");

    expect(fn).toBeCalledTimes(0);

    userEvent.keyboard("ab.C_d");

    expect(fn).toBeCalledTimes(4);

    fn = jest.fn();

    renderHook(() => useKeyboardListener(fn));

    expect(fn).toHaveBeenCalledTimes(0);

    userEvent.keyboard("AbCdEfGhIjKlMnOpQrStUvWxYz;");

    expect(fn).toHaveBeenCalledTimes(26);
  });

  it("should fire when the backspace key is pressed", () => {
    let fn = jest.fn();

    renderHook(() => useKeyboardListener(fn));

    userEvent.keyboard("{Backspace}");

    expect(fn).toBeCalledTimes(1);

    userEvent.keyboard("ab.C_d{Backspace}");

    expect(fn).toBeCalledTimes(6);
  });
});
