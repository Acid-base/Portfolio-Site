import { Box, Heading, SimpleGrid, Tag, VStack, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { Skill } from "../types";

interface SkillsSectionProps {
  skills: Skill;
}

const MotionBox = motion(Box);

const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  const { colorMode } = useColorMode();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      as="section"
      id="skills"
      py={16}
    >
      <VStack spacing={8} align="flex-start">
        <Heading as="h2" size="xl">
          Skills
        </Heading>
        {Object.entries(skills).map(([category, skillList]) => (
          <Box key={category} width="100%">
            <Heading as="h3" size="md" mb={4} color={colorMode === "light" ? "gray.700" : "gray.300"}>
              {category}
            </Heading>
            <SimpleGrid columns={[2, 3, 4]} spacing={3}>
              {skillList.map((skill) => (
                <Tag
                  key={skill}
                  size="lg"
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="blue"
                >
                  {skill}
                </Tag>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default SkillsSection;
