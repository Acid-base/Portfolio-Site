import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroSection from "../components/HeroSection";

describe("HeroSection", () => {
  const mockAbout = "Test about text";

  it("renders hero text and about content", () => {
    render(<HeroSection about={mockAbout} />);
    expect(
      screen.getByText("Building Digital Experiences")
    ).toBeInTheDocument();
    expect(screen.getByText(mockAbout)).toBeInTheDocument();
  });

  it("renders call-to-action button", () => {
    render(<HeroSection about={mockAbout} />);
    expect(screen.getByText("View My Work")).toBeInTheDocument();
  });
});
