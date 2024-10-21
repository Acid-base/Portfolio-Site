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
  // Removed keyframes import
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import theme from "./theme"; // Import the custom theme
import { css } from '@emotion/react';


// Animation keyframes
const fadeIn = css`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Portfolio = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  
  return (
    <ChakraProvider theme={theme}>
      <Box 
        minHeight="100vh" 
        py={12}
        animation={`${fadeIn} 1s ease-out`}
      >
        <Container maxW="container.lg">
          <VStack spacing={12} align="stretch">
            {/* Header Section */}
            <Flex 
              justifyContent="space-between" 
              alignItems="center"
              pb={6}
              borderBottom="2px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
            >
              <Box>
                <Heading 
                  as="h1" 
                  size="2xl" 
                  mb={3}
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                >
                  {personalInfo.name}
                </Heading>
                <Text 
                  fontSize="xl" 
                  color={colorMode === "light" ? "gray.600" : "gray.300"}
                >
                  {personalInfo.title}
                </Text>
              </Box>
              <Button 
                onClick={toggleColorMode}
                size="lg"
                variant="ghost"
                _hover={{ transform: "rotate(180deg)" }}
                transition="all 0.5s ease"
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Flex>

            {/* About Section */}
            <VStack align="stretch" spacing={6}>
              <Heading as="h2" size="xl">
                About Me
              </Heading>
              <Text 
                fontSize="lg" 
                lineHeight="tall"
                color={colorMode === "light" ? "gray.700" : "gray.300"}
              >
                {personalInfo.about}
              </Text>
            </VStack>

            {/* Projects Section */}
            <VStack align="stretch" spacing={6}>
              <Heading as="h2" size="xl">
                Projects
              </Heading>
              <SimpleGrid columns={[1, null, 3]} spacing={6}>
                {projects.map((project) => (
                  <Box 
                    key={project.id} 
                    variant="project-card"
                    bg={colorMode === "light" ? "white" : "gray.800"}
                  >
                    <Heading as="h3" size="md" mb={3}>
                      {project.title}
                    </Heading>
                    <Text mb={4} color={colorMode === "light" ? "gray.600" : "gray.300"}>
                      {project.description}
                    </Text>
                    <Link 
                      href={project.link} 
                      color="blue.400" 
                      isExternal
                      display="inline-flex"
                      alignItems="center"
                      _hover={{
                        color: "blue.500",
                        transform: "translateX(4px)",
                      }}
                    >
                      View Project →
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

            {/* Skills Section */}
            <VStack align="stretch" spacing={6}>
              <Heading as="h2" size="xl">
                Skills
              </Heading>
              <Flex flexWrap="wrap" gap={3}>
                {skills.map((skill) => (
                  <Tag
                    key={skill}
                    variant="skill-tag"
                    colorScheme="blue"
                    size="lg"
                  >
                    {skill}
                  </Tag>
                ))}
              </Flex>
            </VStack>

            {/* Social Links */}
            <HStack 
              justifyContent="center" 
              spacing={8}
              py={6}
            >
              {[
                { icon: FaGithub, href: personalInfo.github },
                { icon: FaLinkedin, href: personalInfo.linkedin },
                { icon: FaEnvelope, href: `mailto:${personalInfo.email}` }
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  isExternal
                  fontSize="2xl"
                  color={colorMode === "light" ? "gray.600" : "gray.400"}
                  _hover={{
                    color: "blue.400",
                    transform: "translateY(-2px)",
                  }}
                >
                  <social.icon size={28} />
                </Link>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Portfolio;
