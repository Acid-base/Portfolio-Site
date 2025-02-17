import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "../ProjectCard";

describe("ProjectCard", () => {
  const mockProject = {
    id: 1,
    title: "Test Project",
    description: "Test Description",
    technologies: ["React", "TypeScript"],
    link: "https://github.com/test",
    demo: "https://demo.test",
  };

  const renderWithChakra = (component) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  it("renders project details correctly", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    mockProject.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("renders links with proper accessibility labels", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(
      screen.getByLabelText(`View ${mockProject.title} source code on GitHub`)
    ).toHaveAttribute("href", mockProject.link);
    expect(
      screen.getByLabelText(`View live demo of ${mockProject.title}`)
    ).toHaveAttribute("href", mockProject.demo);
  });

  it("renders image with proper alt text", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(
      screen.getByAltText(`Screenshot of ${mockProject.title}`)
    ).toBeInTheDocument();
  });
});
