import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Root from "./root";
import { GameContextProvider } from "../../utils/use-game-context";

const RootView = () => (
  <GameContextProvider>
    <Root />
  </GameContextProvider>
);

jest.mock("../../utils/get-initial-word", () => {
  return {
    getInitialWord: () => "tests",
  };
});

describe("Root View", () => {
  it("captures keyboard events and updates state as user types", () => {
    render(<RootView />);

    userEvent.keyboard("abcd");
    expect(screen.getByText(/A/i, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText(/B/i, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText(/C/i, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText(/D/i, { selector: "span" })).toBeInTheDocument();

    userEvent.keyboard("{Backspace}");

    expect(screen.getByText(/A/i, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText(/B/i, { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText(/C/i, { selector: "span" })).toBeInTheDocument();
    expect(
      screen.queryByText(/D/i, { selector: "span" })
    ).not.toBeInTheDocument();
  });

  it("renders green for correct letter states", () => {
    render(<RootView />);

    userEvent.keyboard("tests");
    userEvent.keyboard("{Enter}");

    const elements = Array.from("tests")
      .map((char) => screen.queryAllByText(char, { selector: "span" }))
      .reduce((acc, elementArr) => {
        return [...acc, ...elementArr];
      }, []);

    elements.forEach((element) => expect(element).toHaveClass("letter--valid"));
  });

  it("renders yellow for correct letters in incorrect places", () => {
    //test case of TESTS -> RESET will check that the second E renders as invalid (not misplace) since it's already been placed correctly

    render(<RootView />);

    userEvent.keyboard("reset");
    userEvent.keyboard("{Enter}");

    const selector = ".word-row:first-child > span.letter";

    const r = screen.queryByText(/r/i, {
      selector,
    });

    const e = screen.queryAllByText(/e/i, {
      selector,
    });
    const s = screen.queryByText(/s/i, {
      selector,
    });
    const t = screen.queryByText(/t/i, {
      selector,
    });

    const elements = [r, e[0], s, e[1], t];

    expect(elements[0]).toHaveClass("letter--invalid");
    expect(elements[1]).toHaveClass("letter--valid");
    expect(elements[2]).toHaveClass("letter--valid");
    expect(elements[3]).toHaveClass("letter--invalid");
    expect(elements[4]).toHaveClass("letter--misplace");
  });

  it("renders correct state for unconfirmed letters", () => {
    render(<RootView />);

    userEvent.keyboard("tests");

    const elements = Array.from("tests")
      .map((char) => screen.queryAllByText(char, { selector: "span" }))
      .reduce((acc, elementArr) => {
        return [...acc, ...elementArr];
      }, []);

    elements.forEach((element) =>
      expect(element).toHaveClass("letter--current")
    );
  });

  it("renders the correct keyboard colors after a guess", () => {
    render(<RootView />);

    userEvent.keyboard("words");
    userEvent.keyboard("{Enter}");

    let elements = Array.from("words")
      .map((char) =>
        screen.queryAllByText(char, { selector: ".keyboard-button" })
      )
      .reduce((acc, elementArr) => {
        return [...acc, ...elementArr];
      }, []);

    expect(elements[0]).toHaveClass("keyboard-button--invalid");
    expect(elements[1]).toHaveClass("keyboard-button--invalid");
    expect(elements[2]).toHaveClass("keyboard-button--invalid");
    expect(elements[3]).toHaveClass("keyboard-button--invalid");
    expect(elements[4]).toHaveClass("keyboard-button--valid");

    userEvent.keyboard("reset");
    userEvent.keyboard("{Enter}");

    elements = Array.from("reset")
      .map((char) =>
        screen.queryAllByText(char, { selector: ".keyboard-button" })
      )
      .reduce((acc, elementArr) => {
        return [...acc, ...elementArr];
      }, []);

    expect(elements[0]).toHaveClass("keyboard-button--invalid");
    expect(elements[1]).toHaveClass("keyboard-button--valid");
    expect(elements[2]).toHaveClass("keyboard-button--valid");
    expect(elements[3]).toHaveClass("keyboard-button--valid");
    expect(elements[4]).toHaveClass("keyboard-button--misplace");

    elements = Array.from("zxcvbnm")
      .map((char) =>
        screen.queryAllByText(char, { selector: ".keyboard-button" })
      )
      .reduce((acc, elementArr) => {
        return [...acc, ...elementArr];
      }, []);

    elements.forEach((element) =>
      expect(element).toHaveClass("keyboard-button--default")
    );
  });

  it("shows the modal when the word is guessed", () => {
    render(<RootView />);
    expect(screen.queryByTestId("completion-modal")).not.toBeInTheDocument();
    userEvent.keyboard("tests");
    userEvent.keyboard("{Enter}");

    expect(screen.getByTestId("completion-modal")).toBeInTheDocument();
  });

  it("shows the modal after 6 guesses are submitted", () => {
    render(<RootView />);
    expect(screen.queryByTestId("completion-modal")).not.toBeInTheDocument();
    userEvent.keyboard("react{Enter}");
    userEvent.keyboard("voids{Enter}");
    userEvent.keyboard("error{Enter}");
    userEvent.keyboard("event{Enter}");
    userEvent.keyboard("modal{Enter}");
    userEvent.keyboard("value{Enter}");
    expect(screen.getByTestId("completion-modal")).toBeInTheDocument();
  });

  it("should not accept keyboard input when modal is open", () => {
    render(<RootView />);
    expect(screen.queryByTestId("completion-modal")).not.toBeInTheDocument();
    userEvent.keyboard("tests{Enter}");

    expect(screen.getByTestId("completion-modal")).toBeInTheDocument();

    userEvent.keyboard("v");

    const selector = ".word-row .letter";

    expect(
      screen.getByText(/e/i, {
        selector,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/v/i, {
        selector,
      })
    ).not.toBeInTheDocument();
  });
});
