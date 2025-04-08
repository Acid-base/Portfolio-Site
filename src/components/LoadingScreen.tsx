import { Box, Spinner, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';

const LoadingScreen: FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      role="status"
      aria-label="Loading content"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        aria-valuetext="Loading..."
      />
    </Box>
  );
};

export default LoadingScreen;
