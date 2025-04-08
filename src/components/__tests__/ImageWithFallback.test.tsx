import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImageWithFallback from "../ImageWithFallback";

describe("ImageWithFallback", () => {
  const props = {
    src: "test-image.jpg",
    fallbackSrc: "fallback-image.jpg",
    alt: "Test image",
  };

  it("renders image with correct src and alt", () => {
    render(<ImageWithFallback {...props} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", props.src);
    expect(img).toHaveAttribute("alt", props.alt);
  });

  it("uses fallback image when main image fails to load", () => {
    render(<ImageWithFallback {...props} />);
    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", props.fallbackSrc);
  });

  it("handles missing fallbackSrc gracefully", () => {
    const { src, alt } = props;
    render(<ImageWithFallback src={src} alt={alt} fallbackSrc="" />);
    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "");
  });

  it("passes through additional props", () => {
    render(
      <ImageWithFallback
        {...props}
        className="test-class"
        data-testid="test-image"
      />
    );
    const img = screen.getByRole("img");

    expect(img).toHaveClass("test-class");
    expect(img).toHaveAttribute("data-testid", "test-image");
  });
});
