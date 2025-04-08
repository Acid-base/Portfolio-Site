import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KeyboardShortcuts from "../KeyboardShortcuts";

describe("KeyboardShortcuts", () => {
  it("renders keyboard shortcuts information", () => {
    render(<KeyboardShortcuts isOpen={true} onClose={() => {}} />);

    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.getByText(/keyboard shortcuts/i)).toBeInTheDocument();
  });

  it("displays arrow key navigation instructions", () => {
    render(<KeyboardShortcuts isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/↑/)).toBeInTheDocument();
    expect(screen.getByText(/↓/)).toBeInTheDocument();
    expect(screen.getByText(/scroll/i)).toBeInTheDocument();
  });

  it("displays home/end key instructions", () => {
    render(<KeyboardShortcuts isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/end/i)).toBeInTheDocument();
    expect(screen.getByText(/top/i)).toBeInTheDocument();
    expect(screen.getByText(/bottom/i)).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(<KeyboardShortcuts isOpen={true} onClose={() => {}} />);

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveAttribute("aria-label", "Keyboard shortcuts");
  });

  it("uses semantic list structure", () => {
    render(<KeyboardShortcuts isOpen={true} onClose={() => {}} />);

    const list = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(items.length).toBeGreaterThan(0);
  });
});
