import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "../../test/test-utils";
import LoadingScreen from "../LoadingScreen";

describe("LoadingScreen", () => {
  it("renders loading spinner", () => {
    render(<LoadingScreen />);
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveAttribute("aria-label", "Loading content");
  });

  it("has spinner with accessible text", () => {
    render(<LoadingScreen />);
    const spinner = screen.getByRole("status").querySelector(".chakra-spinner");
    expect(spinner).toHaveAttribute("aria-valuetext", "Loading...");
  });

  it("has correct animation properties", () => {
    render(<LoadingScreen />);
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveStyle({
      opacity: "1",
      transform: "scale(1)"
    });
  });

  it("has correct transition properties", () => {
    render(<LoadingScreen />);
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveStyle({
      transition: expect.stringContaining("opacity, transform")
    });
  });

  it("is positioned correctly", () => {
    render(<LoadingScreen />);
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveStyle({
      position: "fixed",
      inset: "0"
    });
  });
});
