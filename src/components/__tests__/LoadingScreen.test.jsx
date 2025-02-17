import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingScreen from "../LoadingScreen";

describe("LoadingScreen", () => {
  it("renders loading spinner", () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has correct aria attributes for accessibility", () => {
    render(<LoadingScreen />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", expect.any(String));
  });
});
