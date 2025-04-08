import { IconButton, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10,
      }}
    >
      <IconButton
        aria-label="Scroll to top"
        icon={<FaArrowUp />}
        onClick={scrollToTop}
        size="lg"
        colorScheme={colorMode === 'light' ? 'gray' : 'whiteAlpha'}
        variant="solid"
        borderRadius="full"
        boxShadow="lg"
      />
    </motion.div>
  );
};

export default ScrollToTop;
