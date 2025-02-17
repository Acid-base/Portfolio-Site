import { Box, Spinner, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "light" ? "white" : "gray.800"}
      zIndex="9999"
      role="status"
      aria-label="Loading content"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          aria-label="Loading"
        />
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
