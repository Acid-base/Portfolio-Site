import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Skeleton,
  Tag,
  Text,
  useColorMode,
  VisuallyHidden,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ImageWithFallback = lazy(() => import("./ImageWithFallback"));

const MotionBox = motion(Box);

const ProjectCard = ({ project, index }) => {
  const { colorMode } = useColorMode();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref={ref}
      as="article"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      p={6}
      borderRadius="xl"
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="xl"
      position="relative"
      overflow="hidden"
    >
      <Suspense fallback={<Skeleton height="200px" />}>
        <ImageWithFallback
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          borderRadius="md"
          mb={4}
          height="200px"
          width="100%"
          objectFit="cover"
        />
      </Suspense>
      <Heading as="h3" size="md" mb={3}>
        {project.title}
      </Heading>
      <Text mb={4}>{project.description}</Text>
      <Flex wrap="wrap" gap={2} mb={4}>
        {project.technologies.map((tech) => (
          <Tag
            key={tech}
            size="sm"
            colorScheme="blue"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          >
            {tech}
          </Tag>
        ))}
      </Flex>
      <HStack spacing={4}>
        <Link
          href={project.link}
          isExternal
          aria-label={`View ${project.title} source code on GitHub`}
          _hover={{
            transform: "translateY(-2px)",
            color: "blue.400",
          }}
          transition="all 0.2s"
        >
          <FaGithub size={20} />
          <VisuallyHidden>GitHub</VisuallyHidden>
        </Link>
        {project.demo && (
          <Link
            href={project.demo}
            isExternal
            aria-label={`View live demo of ${project.title}`}
            _hover={{
              transform: "translateY(-2px)",
              color: "blue.400",
            }}
            transition="all 0.2s"
          >
            <FaExternalLinkAlt size={20} />
            <VisuallyHidden>Live Demo</VisuallyHidden>
          </Link>
        )}
      </HStack>
    </MotionBox>
  );
};

export default ProjectCard;
