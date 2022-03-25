import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import _RootView from "./root";
import { GameContextProvider } from "../../utils/use-game-context";

const RootView = () => (
  <GameContextProvider>
    <_RootView />
  </GameContextProvider>
);

describe("Root View", () => {
  it("captures keyboard events and updates state as user types", () => {
    render(<RootView />);

    userEvent.keyboard("abcd");
    expect(screen.getByText(/A/i)).toBeInTheDocument();
    expect(screen.getByText(/B/i)).toBeInTheDocument();
    expect(screen.getByText(/C/i)).toBeInTheDocument();
    expect(screen.getByText(/D/i)).toBeInTheDocument();

    userEvent.keyboard("{Backspace}");

    expect(screen.getByText(/A/i)).toBeInTheDocument();
    expect(screen.getByText(/B/i)).toBeInTheDocument();
    expect(screen.getByText(/C/i)).toBeInTheDocument();
    expect(screen.queryByText(/D/i)).not.toBeInTheDocument();
  });
});
