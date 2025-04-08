import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PersonalInfo } from "../../types";
import HeroSection from "../HeroSection";

describe("HeroSection", () => {
  const mockPersonalInfo: PersonalInfo = {
    name: "Test Name",
    title: "Test Title",
    about: "Test About Text",
    github: "https://github.com/test",
    linkedin: "https://linkedin.com/test",
    email: "test@example.com"
  };

  it("renders hero section with personal info", () => {
    render(<HeroSection personalInfo={mockPersonalInfo} />);

    expect(screen.getByText(mockPersonalInfo.name)).toBeInTheDocument();
    expect(screen.getByText(mockPersonalInfo.title)).toBeInTheDocument();
    expect(screen.getByText(mockPersonalInfo.about)).toBeInTheDocument();
  });

  it("renders with correct heading levels", () => {
    render(<HeroSection personalInfo={mockPersonalInfo} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h1).toHaveTextContent(mockPersonalInfo.name);
    expect(h2).toHaveTextContent(mockPersonalInfo.title);
  });

  it("renders social links correctly", () => {
    render(<HeroSection personalInfo={mockPersonalInfo} />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    const emailLink = screen.getByRole("link", { name: /email/i });

    expect(githubLink).toHaveAttribute("href", mockPersonalInfo.github);
    expect(linkedinLink).toHaveAttribute("href", mockPersonalInfo.linkedin);
    expect(emailLink).toHaveAttribute("href", `mailto:${mockPersonalInfo.email}`);
  });

  it("has correct ARIA attributes", () => {
    render(<HeroSection personalInfo={mockPersonalInfo} />);
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-label", "hero");
  });

  it("renders with animation properties", () => {
    render(<HeroSection personalInfo={mockPersonalInfo} />);
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("style");
    expect(section).toMatchSnapshot();
  });
});
