import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RootView from "./root";

it("captures keyboard events and updates state as user types", () => {
  render(<RootView />);

  userEvent.keyboard("test");
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
