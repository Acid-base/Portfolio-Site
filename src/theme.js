// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
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
          borderRadius: "full",
          px: 4,
          py: 2,
          transition: "all 0.2s ease",
          _hover: {
            transform: "scale(1.05)",
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
  },
});

export default theme;
