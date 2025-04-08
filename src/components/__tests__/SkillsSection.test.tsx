import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { Skill } from "../../types";
import SkillsSection from "../SkillsSection";

const renderWithChakra = (component: ReactElement) => {
  return render(component);
};

describe("SkillsSection", () => {
  const mockSkills: Skill = {
    "Frontend": ["React", "TypeScript", "Chakra UI"],
    "Backend": ["Node.js", "Express", "MongoDB"],
    "Tools": ["Git", "Docker", "VS Code"]
  };

  it("renders skills categories", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);

    Object.keys(mockSkills).forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("renders all skills", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);

    Object.values(mockSkills).flat().forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("renders skills heading", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
  });

  it("has correct ARIA landmarks", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    expect(screen.getByRole("region", { name: /skills/i })).toBeInTheDocument();
  });

  it("renders skills in a list format", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(Object.keys(mockSkills).length);

    Object.values(mockSkills).flat().forEach(skill => {
      expect(screen.getByText(skill).closest("li")).toBeInTheDocument();
    });
  });

  it("matches snapshot", () => {
    const { container } = render(<SkillsSection skills={mockSkills} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with empty skills", () => {
    const { container } = render(<SkillsSection skills={{}} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with single category", () => {
    const { container } = render(
      <SkillsSection skills={{ "Frontend": ["React"] }} />
    );
    expect(container).toMatchSnapshot();
  });
});
