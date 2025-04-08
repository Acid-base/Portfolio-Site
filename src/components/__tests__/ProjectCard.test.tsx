import { fireEvent, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { Project } from "../../types";
import ProjectCard from "../ProjectCard";

const renderWithChakra = (component: ReactElement) => {
  return render(component);
};

describe("ProjectCard", () => {
  const mockProject: Project = {
    id: 1,
    title: "Test Project",
    description: "Test Description",
    technologies: ["React", "TypeScript"],
    imageUrl: "/test-image.jpg",
    githubUrl: "https://github.com/test/project",
    liveUrl: "https://test-project.com"
  };

  it("renders project information", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it("renders technologies", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("renders links", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute("href", mockProject.githubUrl);
    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute("href", mockProject.liveUrl);
  });

  it("renders project image with fallback", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    const image = screen.getByRole("img", { name: mockProject.title });
    expect(image).toHaveAttribute("src", mockProject.imageUrl);
    expect(image).toHaveAttribute("alt", mockProject.title);
  });

  it("handles missing optional URLs gracefully", () => {
    const projectWithoutLiveUrl = { ...mockProject, liveUrl: undefined };
    renderWithChakra(<ProjectCard project={projectWithoutLiveUrl} />);
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /code/i })).toBeInTheDocument();
  });

  it("has accessible links", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByRole("link", { name: /code/i });
    const demoLink = screen.getByRole("link", { name: /live demo/i });
    expect(githubLink).toHaveAttribute("aria-label", expect.stringContaining(mockProject.title));
    expect(demoLink).toHaveAttribute("aria-label", expect.stringContaining(mockProject.title));
  });

  it("maintains proper semantic structure", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(mockProject.title);
    expect(screen.getByRole("list")).toBeInTheDocument(); // For technologies
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech).closest("li")).toBeInTheDocument();
    });
  });

  it("applies hover effects", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    const card = screen.getByRole("article");
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({
      transform: expect.stringContaining("scale")
    });
  });

  it("has correct animation properties", () => {
    renderWithChakra(<ProjectCard project={mockProject} />);
    const card = screen.getByRole("article");
    expect(card).toHaveStyle({
      transform: "scale(1)",
      transition: expect.stringContaining("transform")
    });
  });

  it("matches snapshot with all props", () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without optional URLs", () => {
    const projectWithoutUrls = {
      ...mockProject,
      githubUrl: "",
      liveUrl: "",
    };
    const { container } = render(<ProjectCard project={projectWithoutUrls} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without image", () => {
    const projectWithoutImage = {
      ...mockProject,
      imageUrl: "/placeholder.jpg", // Use placeholder instead of undefined
    };
    const { container } = render(<ProjectCard project={projectWithoutImage} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with hover state", () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = screen.getByRole("article");
    fireEvent.mouseEnter(card);
    expect(container).toMatchSnapshot();
  });
});
