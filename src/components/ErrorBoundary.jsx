import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          p={8}
          borderRadius="xl"
          bg={this.props.colorMode === "light" ? "red.50" : "red.900"}
          color={this.props.colorMode === "light" ? "red.600" : "red.200"}
          role="alert"
        >
          <VStack spacing={4} align="center">
            <WarningIcon boxSize={8} />
            <Heading size="md">Something went wrong</Heading>
            <Text>We're working on fixing this issue.</Text>
            <Button
              onClick={() => window.location.reload()}
              colorScheme="red"
              size="sm"
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Wrapper to provide color mode to class component
const ErrorBoundaryWrapper = (props) => {
  const { colorMode } = useColorMode();
  return <ErrorBoundary {...props} colorMode={colorMode} />;
};

export default ErrorBoundaryWrapper;
