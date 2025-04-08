import { WarningIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface ErrorBoundaryProps extends Props {
  colorMode: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
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

const ErrorBoundaryWrapper: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode();
  return <ErrorBoundary {...props} colorMode={colorMode} />;
};

export default ErrorBoundaryWrapper;
