// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.900",
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
    },
    Box: {
      variants: {
        "project-card": {
          p: 6,
          borderRadius: "xl",
          borderWidth: "1px",
          transition: "all 0.3s ease",
          _hover: {
            transform: "translateY(-4px)",
            shadow: "lg",
            borderColor: "blue.400",
          },
        },
      },
    },
    Tag: {
      variants: {
        "skill-tag": {
          container: {
            bg: "blue.500",
            color: "white",
            px: 4,
            py: 2,
            borderRadius: "full",
            transition: "all 0.2s",
            _hover: {
              transform: "translateY(-2px)",
              boxShadow: "md",
            },
          },
        },
      },
    },
    Link: {
      baseStyle: {
        transition: "all 0.2s ease",
        _hover: {
          textDecoration: "none",
          transform: "scale(1.1)",
        },
      },
    },
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "light" ? "blue.500" : "blue.200",
          color: props.colorMode === "light" ? "white" : "gray.800",
          _hover: {
            bg: props.colorMode === "light" ? "blue.600" : "blue.300",
          },
        }),
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});

export default theme;
