import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const MotionIconButton = motion(IconButton);

const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MotionIconButton
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      variant="ghost"
      color={colorMode === "light" ? "gray.600" : "yellow.200"}
      onClick={toggleColorMode}
      icon={
        <Icon
          as={colorMode === "light" ? FaMoon : FaSun}
          transition="all 0.2s ease-out"
        />
      }
      initial={{ rotate: -30, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      whileHover={{
        scale: 1.2,
        rotate: colorMode === "light" ? -30 : 30
      }}
      whileTap={{ scale: 0.9 }}
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex="999"
    />
  );
};

export default ThemeToggle;
