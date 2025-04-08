import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import ErrorBoundary from "../ErrorBoundary";

describe("ErrorBoundary", () => {
  const ErrorComponent = () => {
    throw new Error("Test error");
  };

  const consoleError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders error UI when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows error details in development", () => {
    // Mock NODE_ENV directly
    vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/test error/i)).toBeInTheDocument();

    // Reset mock
    vi.unstubAllGlobals();
  });

  it("provides a way to reset the error state", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const resetButton = screen.getByRole("button", { name: /try again/i });
    expect(resetButton).toBeInTheDocument();
  });
});
