import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSection from "../SkillsSection";

describe("SkillsSection", () => {
  const mockSkills = {
    frontend: ["React", "TypeScript"],
    backend: ["Node.js", "Python"],
    tools: ["Git", "Docker"],
    softSkills: ["Problem Solving", "Communication"],
  };

  const renderWithChakra = (component) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  it("renders all skill categories", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
    expect(screen.getByText("Soft Skills")).toBeInTheDocument();
  });

  it("renders all skills within categories", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    Object.values(mockSkills)
      .flat()
      .forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
  });

  it("has proper ARIA attributes", () => {
    renderWithChakra(<SkillsSection skills={mockSkills} />);
    ["frontend", "backend", "tools", "soft-skills"].forEach((category) => {
      const group = screen.getByRole("group", {
        name: new RegExp(category, "i"),
      });
      expect(group).toBeInTheDocument();
    });
  });
});
