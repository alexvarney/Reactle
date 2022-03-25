import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Root from "./root";
import { GameContextProvider } from "../../utils/use-game-context";
//import {getInitialWord} from '../../utils/get-initial-word';

const RootView = () => (
  <GameContextProvider>
    <Root />
  </GameContextProvider>
);

jest.mock("../../utils/get-initial-word", () => {
  return {
    getInitialWord: () => "value",
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

    userEvent.keyboard("value");
    userEvent.keyboard("{Enter}");

    const elements = Array.from("value").map((char) =>
      screen.getByText(char, { selector: "span" })
    );

    elements.forEach((element) => expect(element).toHaveClass("letter--valid"));
  });

  it("renders yellow for correct letters in incorrect places", () => {
    render(<RootView />);

    userEvent.keyboard("merit");
    userEvent.keyboard("{Enter}");

    const elements = Array.from("merit").map((char) =>
      screen.getByText(char, { selector: "span" })
    );

    expect(elements[0]).toHaveClass("letter--invalid");
    expect(elements[1]).toHaveClass("letter--misplace");
    expect(elements[2]).toHaveClass("letter--invalid");
    expect(elements[3]).toHaveClass("letter--invalid");
    expect(elements[4]).toHaveClass("letter--invalid");
  });

  it("renders correct state for unconfirmed letters", () => {
    render(<RootView />);

    userEvent.keyboard("value");

    const elements = Array.from("value").map((char) =>
      screen.getByText(char, { selector: "span" })
    );

    elements.forEach((element) =>
      expect(element).toHaveClass("letter--current")
    );
  });
});
