import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import theme from "../theme";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Helper to mock framer-motion animations
const mockAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

// Helper to create accessible test IDs
const createTestId = (component: string, element: string) => `${component}-${element}`;

export * from "@testing-library/react";
export { createTestId, mockAnimation, customRender as render };
