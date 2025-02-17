import { IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 10,
          }}
        >
          <IconButton
            icon={<FaArrowUp />}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            colorScheme="blue"
            size="lg"
            rounded="full"
            shadow="md"
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
