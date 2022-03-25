import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RootView from "./root";

describe("Root View", () => {
  it("captures keyboard events and updates state as user types", () => {
    render(<RootView />);

    userEvent.keyboard("test");
    expect(screen.getByText(/test/i)).toBeInTheDocument();

    userEvent.keyboard("{Backspace}");

    expect(screen.getByText(/tes/i)).toBeInTheDocument();
  });

  it("ignores inputs after the fifth letter of the word", () => {
    render(<RootView />);
    userEvent.keyboard("abcdefghijk");

    expect(screen.getByText("abcde")).toBeInTheDocument();
    expect(screen.queryByText("abcdefghijk")).not.toBeInTheDocument();

    userEvent.keyboard("{Backspace}");
    expect(screen.getByText("abcd")).toBeInTheDocument();
  });
  it("after exactly 5 characters are input, pressing enter locks the guess and jumps to a new line", () => {
    render(<RootView />);
    userEvent.keyboard("hel");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("lo");
    userEvent.keyboard("{Enter}");
    userEvent.keyboard("words");
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("words")).toBeInTheDocument();
  });
});
