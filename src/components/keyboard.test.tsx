import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Keyboard } from "./keyboard";
import { LOWER_ALPHABET } from "../utils/constants";

describe("Keyboard", () => {
  it("should render each key in the alphabet, plus enter and backspace", () => {
    render(<Keyboard />);

    Array.from(LOWER_ALPHABET).forEach((letter) =>
      expect(screen.getByText(letter))
    );

    expect(screen.getByLabelText("Enter")).toBeInTheDocument();
    expect(screen.getByLabelText("Backspace")).toBeInTheDocument();
  });
  it("should call the callback function with key details when clicked", () => {
    const callback = jest.fn();

    render(<Keyboard onClick={callback} />);

    userEvent.click(
      screen.getByText("a", { selector: "button.keyboard-button" })
    );

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith("a");

    userEvent.click(
      screen.getByLabelText("Enter", { selector: "button.keyboard-button" })
    );

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith("Enter");

    userEvent.click(
      screen.getByLabelText("Backspace", { selector: "button.keyboard-button" })
    );

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenLastCalledWith("Backspace");
  });
});
