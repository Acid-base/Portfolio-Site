import * as chakraUI from "@chakra-ui/react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "../../test/test-utils";
import ContactForm from "../ContactForm";

vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    useToast: () => {
      const toast = () => Math.random().toString();
      toast.close = vi.fn();
      toast.closeAll = vi.fn();
      toast.update = vi.fn();
      toast.isActive = vi.fn();
      toast.promise = vi.fn();
      return toast;
    },
  };
});

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("displays validation errors for empty form submission", async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    const toast = chakraUI.useToast();

    render(<ContactForm />);

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
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Message sent",
        status: "success"
      }));
    });
  });

  it("resets form after successful submission", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    });
  });

  it("updates form data when input values change", () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: "Jane" } });
    fireEvent.change(emailInput, { target: { value: "jane@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello" } });

    expect(nameInput).toHaveValue("Jane");
    expect(emailInput).toHaveValue("jane@test.com");
    expect(messageInput).toHaveValue("Hello");
  });

  it("renders with correct animation properties", () => {
    render(<ContactForm />);
    const section = screen.getByRole("region");

    expect(section).toHaveAttribute("style");
  });
});
