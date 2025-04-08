import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../../App";

describe("Integration: Error Handling and Loading", () => {
  it("shows loading screen while data is being fetched", () => {
    render(<App />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText(/loading content/i)).toBeInTheDocument();
  });

  it("error boundary catches errors and shows fallback UI", () => {
    render(<App />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Test error recovery
    const resetButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(resetButton);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("handles transition between loading and content states", async () => {
    vi.useFakeTimers();

    render(<App />);

    // Initial loading state
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Advance timers to simulate content load
    await act(async () => {
      vi.runAllTimers();
    });

    // Loading screen should be gone
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    // Main content should be visible
    expect(screen.getByRole("main")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("preserves keyboard shortcuts during error states", () => {
    render(<App />);

    // Error boundary should be shown
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Keyboard shortcuts should still work
    fireEvent.keyDown(document, { key: "Home" });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
