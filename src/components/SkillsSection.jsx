import {
  Box,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaTools, FaUsers } from "react-icons/fa";

const MotionBox = motion(Box);

const SkillCard = ({ title, skills, icon }) => {
  const { colorMode } = useColorMode();

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      borderRadius="xl"
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="xl"
      role="group"
      aria-labelledby={`skills-${title.toLowerCase()}`}
    >
      <VStack spacing={4} align="flex-start">
        <Icon
          as={icon}
          boxSize={6}
          color={colorMode === "light" ? "blue.500" : "blue.200"}
        />
        <Heading as="h3" size="md" id={`skills-${title.toLowerCase()}`}>
          {title}
        </Heading>
        {skills.map((skill) => (
          <Text
            key={skill}
            fontSize="md"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            as={motion.p}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {skill}
          </Text>
        ))}
      </VStack>
    </MotionBox>
  );
};

const SkillsSection = ({ skills }) => {
  const skillsConfig = [
    { title: "Frontend", skills: skills.frontend, icon: FaCode },
    { title: "Backend", skills: skills.backend, icon: FaServer },
    { title: "Tools", skills: skills.tools, icon: FaTools },
    { title: "Soft Skills", skills: skills.softSkills, icon: FaUsers },
  ];

  return (
    <Box as="section" py={16} id="skills">
      <VStack spacing={12} align="stretch">
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Skills & Technologies
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsConfig.map((config) => (
            <SkillCard
              key={config.title}
              title={config.title}
              skills={config.skills}
              icon={config.icon}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default SkillsSection;
