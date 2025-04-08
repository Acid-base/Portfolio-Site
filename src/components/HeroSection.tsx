import { Box, Button, Flex, Heading, Icon, Link, Text, VStack, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PersonalInfo } from "../types";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

const MotionBox = motion(Box) as typeof motion.div;
const MotionFlex = motion(Flex);

const HeroSection: FC<HeroSectionProps> = ({ personalInfo }) => {
  const { colorMode } = useColorMode();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <MotionBox
      as="section"
      aria-label="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      py={20}
    >
      <VStack spacing={10} alignItems="flex-start">
        <VStack spacing={6} alignItems="flex-start" variants={itemVariants}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient={colorMode === "light"
              ? "linear(to-r, blue.500, purple.500)"
              : "linear(to-r, blue.300, purple.300)"
            }
            bgClip="text"
            variants={itemVariants}
          >
            {personalInfo.name}
          </Heading>
          <Heading as="h2" size="lg" color={colorMode === "light" ? "gray.600" : "gray.300"} variants={itemVariants}>
            {personalInfo.title}
          </Heading>
          <Text fontSize="xl" maxW="2xl" lineHeight="tall" variants={itemVariants}>
            {personalInfo.about}
          </Text>
        </VStack>

        <MotionFlex
          gap={4}
          variants={itemVariants}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            colorScheme="blue"
            rightIcon={<Icon as={FaArrowDown} />}
            _hover={{ transform: 'translateY(2px)' }}
          >
            View My Work
          </Button>
          <Button
            as={Link}
            href={personalInfo.github}
            isExternal
            size="lg"
            leftIcon={<Icon as={FaGithub} />}
            variant="outline"
            aria-label="GitHub Profile"
            _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
          >
            GitHub
          </Button>
          <Button
            as={Link}
            href={personalInfo.linkedin}
            isExternal
            size="lg"
            leftIcon={<Icon as={FaLinkedin} />}
            variant="outline"
            aria-label="LinkedIn Profile"
            _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
          >
            LinkedIn
          </Button>
          <Button
            as={Link}
            href={`mailto:${personalInfo.email}`}
            size="lg"
            leftIcon={<Icon as={MdEmail} />}
            variant="outline"
            aria-label="Email Contact"
            _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
          >
            Contact
          </Button>
        </MotionFlex>
      </VStack>
    </MotionBox>
  );
};

export default HeroSection;
