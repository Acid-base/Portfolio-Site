import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("Integration: Navigation and Scrolling", () => {
  it("keyboard navigation interacts with scroll position", () => {
    render(<App />);

    const mainContent = screen.getByRole("main");
    expect(mainContent).toBeInTheDocument();

    // Simulate keyboard navigation
    fireEvent.keyDown(document, { key: "ArrowDown" });
    expect(window.scrollTo).toHaveBeenCalled();

    // Verify ScrollToTop appears after scroll
    global.scrollY = 500;
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: /scroll to top/i })).toBeVisible();
  });

  it("scroll to top button works with keyboard shortcuts", () => {
    render(<App />);

    // Show scroll to top button
    global.scrollY = 500;
    fireEvent.scroll(window);

    // Press Home key
    fireEvent.keyDown(document, { key: "Home" });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    // Button should hide after scroll
    global.scrollY = 0;
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: /scroll to top/i })).not.toBeVisible();
  });

  it("contact form submission triggers page scroll", async () => {
    render(<App />);

    const form = screen.getByRole("form");

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message" } });

    // Submit form
    fireEvent.submit(form);

    // Verify scroll behavior
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
