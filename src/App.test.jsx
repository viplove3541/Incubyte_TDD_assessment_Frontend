import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders form and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter numbers/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate/i })
    ).toBeInTheDocument();
  });

  test("calculates sum correctly with newline and commas", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), {
      target: { value: "1\n4,3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(await screen.findByText(/Sum is 8/i)).toBeInTheDocument();
  });

  test("handles different delimiters", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), {
      target: { value: "//;\n1;2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(await screen.findByText(/Sum is 3/i)).toBeInTheDocument();
  });

  test("displays an error message when negative numbers are entered", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), {
      target: { value: "1,-4,3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/Error: negative numbers not allowed/i)
    ).toBeInTheDocument();
  });

  test("displays an error message for multiple negative numbers", async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), {
      target: { value: "1,-2,-3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/Error: negative numbers not allowed: -2,-3/i)
    ).toBeInTheDocument();
  });
});
