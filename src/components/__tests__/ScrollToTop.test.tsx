import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "../ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    window.scrollY = 0;
    window.scrollTo = vi.fn().mockImplementation(() => {});
  });

  it("is hidden when at the top of the page", () => {
    render(<ScrollToTop />);
    const button = screen.queryByRole("button", { name: /scroll to top/i });
    expect(button).not.toBeVisible();
  });

  it("becomes visible when scrolling down", () => {
    render(<ScrollToTop />);

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button).toBeVisible();
  });

  it("scrolls to top when clicked", () => {
    render(<ScrollToTop />);

    // Simulate scroll to make button visible
    Object.defineProperty(window, 'scrollY', { value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });

  it("has correct accessibility attributes", () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', { value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Scroll to top");
    expect(button).toHaveAttribute("title", "Scroll to top");
  });

  it("removes scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
