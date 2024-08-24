import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Container,
  useColorMode,
  Button,
  HStack,
  Link,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Portfolio = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const personalInfo = {
    name: "Daniel Yates",
    title: "MERN Stack Developer",
    about: `I'm an inspired full-stack developer who loves to learn new technologies and solve new and interesting problems.
    I specialize in React, Node.js, Express.js, and Mongodb. When I'm not coding, you can find me hiking, foraging and cultivating tasty mushrooms, or wrestling with automating my gardening chores.`,
    github: "https://github.com/Acid-base",
    linkedin: "https://www.linkedin.com/in/daniel-yates-b0ba47201/",
    email: "daniel.jo.yates@gmail.com",
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full web shop with admin portal and backend services, custom frontend built with React.  Backed by Medusa E-commerce, PostgreSQL.",
      link: "https://github.com/janesmith/ecommerce-platform",
    },
    {
      id: 2,
      title: "",
      description:
        "A React-based weather application using OpenWeatherMap API and Geolocation.",
      link: "https://github.com/Acid-base/weather-app",
    },
    {
      id: 3,
      title: "Task Manager",
      description:
        "A productivity app built with React and Firebase, featuring real-time updates.",
      link: "https://github.com/Acid-base/task-manager",
    },
  ];

  const skills = [
    "React",
    "Node.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "GraphQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "Agile Methodologies",
  ];

  return (
    <ChakraProvider>
      <Box minHeight="100vh" py={8}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h1" size="2xl" mb={2}>
                  {personalInfo.name}
                </Heading>
                <Text fontSize="xl">{personalInfo.title}</Text>
              </Box>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Flex>

            <VStack align="stretch" spacing={4}>
              <Heading as="h2" size="xl">
                About Me
              </Heading>
              <Text>{personalInfo.about}</Text>
            </VStack>

            <VStack align="stretch" spacing={4}>
              <Heading as="h2" size="xl">
                Projects
              </Heading>
              <SimpleGrid columns={[1, null, 3]} spacing={4}>
                {projects.map((project) => (
                  <Box key={project.id} borderWidth={1} borderRadius="lg" p={4}>
                    <Heading as="h3" size="md" mb={2}>
                      {project.title}
                    </Heading>
                    <Text mb={4}>{project.description}</Text>
                    <Link href={project.link} color="blue.500" isExternal>
                      View Project
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

            <VStack align="stretch" spacing={4}>
              <Heading as="h2" size="xl">
                Skills
              </Heading>
              <Flex flexWrap="wrap" gap={2}>
                {skills.map((skill) => (
                  <Tag
                    key={skill}
                    size="md"
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    {skill}
                  </Tag>
                ))}
              </Flex>
            </VStack>

            <HStack justifyContent="center" spacing={4}>
              <Link href={personalInfo.github} isExternal>
                <FaGithub size={24} />
              </Link>
              <Link href={personalInfo.linkedin} isExternal>
                <FaLinkedin size={24} />
              </Link>
              <Link href={`mailto:${personalInfo.email}`}>
                <FaEnvelope size={24} />
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Portfolio;

