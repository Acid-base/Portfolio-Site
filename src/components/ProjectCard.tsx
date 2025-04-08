import { Box, Button, Heading, Image, Link, Stack, Tag, Text, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const MotionBox = motion(Box);

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { colorMode } = useColorMode();

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        borderRadius="lg"
        mb={4}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <Stack spacing={4}>
        <Heading size="md" letterSpacing="tight">
          {project.title}
        </Heading>
        <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
          {project.description}
        </Text>
        <Stack direction="row" flexWrap="wrap" spacing={2}>
          {project.technologies.map((tech) => (
            <Tag
              key={tech}
              size="md"
              variant="subtle"
              colorScheme="blue"
            >
              {tech}
            </Tag>
          ))}
        </Stack>        <Stack direction="row" spacing={4} pt={2}>
          <Button
            as={Link}
            href={project.githubUrl}
            isExternal
            leftIcon={<FaGithub />}
            size="sm"
            variant="ghost"
          >
            Code
          </Button>
          {project.liveUrl && (
            <Button
              as={Link}
              href={project.liveUrl}
              isExternal
              size="sm"
              colorScheme="blue"
            >
              Live Demo
            </Button>
          )}
          {project.apiUrl && (
            <Button
              as={Link}
              href={project.apiUrl}
              isExternal
              size="sm"
              colorScheme="green"
            >
              API Docs
            </Button>
          )}
        </Stack>
      </Stack>
    </MotionBox>
  );
};

export default ProjectCard;
