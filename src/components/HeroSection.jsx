import {
  Box,
  Button,
  Heading,
  keyframes,
  Text,
  useColorMode,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = ({ about }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const animation = `${fadeIn} 1s ease-out`;

  return (
    <Box
      as="section"
      aria-labelledby="hero-heading"
      textAlign="center"
      py={20}
      bg={colorMode === "light" ? "blue.50" : "gray.800"}
      borderRadius="xl"
      animation={animation}
      role="banner"
    >
      <VStack spacing={6} maxW="4xl" mx="auto" px={4}>
        <Heading
          as="h1"
          id="hero-heading"
          size="3xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          letterSpacing="tight"
          _after={{
            content: '""',
            display: "block",
            width: "40px",
            height: "4px",
            bgGradient: "linear(to-r, blue.400, purple.500)",
            mx: "auto",
            mt: 4,
          }}
        >
          Building Digital Experiences
        </Heading>
        <Text
          fontSize="xl"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          maxW="2xl"
        >
          {about}
        </Text>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            colorScheme="blue"
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
            aria-label="View my projects"
            _focus={{
              boxShadow: `0 0 0 3px ${theme.colors.blue[200]}`,
              outline: "none",
            }}
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "lg",
              transition: "all 0.3s ease",
              zIndex: -1,
            }}
            _hover={{
              transform: "translateY(-2px)",
              _after: {
                transform: "scale(1.1)",
                opacity: 0,
              },
            }}
          >
            View My Work
          </Button>
        </motion.div>
      </VStack>
    </Box>
  );
};

export default HeroSection;
