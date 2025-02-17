import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContactForm from "../ContactForm";

describe("ContactForm", () => {
  const renderWithChakra = (component) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  it("renders all form fields", () => {
    renderWithChakra(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("displays validation errors for empty form submission", async () => {
    renderWithChakra(<ContactForm />);
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    renderWithChakra(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    const mockToast = vi.fn();
    vi.mock("@chakra-ui/react", async () => {
      const actual = await vi.importActual("@chakra-ui/react");
      return {
        ...actual,
        useToast: () => mockToast,
      };
    });

    renderWithChakra(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Test message" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});
