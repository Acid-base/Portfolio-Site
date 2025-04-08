import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageTransition from "../PageTransition";

describe("PageTransition", () => {
  it("renders children with animation wrapper", () => {
    render(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies initial animation properties", () => {
    render(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    );

    const container = screen.getByTestId("page-transition");
    expect(container).toHaveStyle({
      opacity: "0",
      transform: expect.stringContaining("translateY")
    });
  });

  it("maintains child element attributes", () => {
    render(
      <PageTransition>
        <div data-testid="child" className="test-class">
          Test content
        </div>
      </PageTransition>
    );

    const child = screen.getByTestId("child");
    expect(child).toHaveClass("test-class");
  });

  it("has correct ARIA attributes", () => {
    render(
      <PageTransition>
        <main>Test content</main>
      </PageTransition>
    );

    const container = screen.getByTestId("page-transition");
    expect(container).toHaveAttribute("aria-live", "polite");
  });

  it("handles multiple children", () => {
    render(
      <PageTransition>
        <div>First child</div>
        <div>Second child</div>
      </PageTransition>
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });
});
