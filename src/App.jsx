import { lazy, Suspense, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  useColorMode,
  Button,
  HStack,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import theme from "./theme";
import { personalInfo, projects, skills } from './data/portfolio-data';
import LoadingScreen from './components/LoadingScreen';
import { useKeyboardNav } from './hooks/useKeyboardNav';

// Lazy load components
const HeroSection = lazy(() => import('./components/HeroSection'));
const ProjectCard = lazy(() => import('./components/ProjectCard'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const PageTransition = lazy(() => import('./components/PageTransition'));

const MotionBox = motion(Box);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  // Use keyboard navigation hook
  useKeyboardNav();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<LoadingScreen />}>
        <PageTransition>
          <Box minHeight="100vh" py={12}>
            <Container maxW="container.xl">
              {/* Header */}
              <HStack justify="flex-end" mb={8}>
                <Button
                  onClick={toggleColorMode}
                  size="lg"
                  variant="ghost"
                  _hover={{ transform: "rotate(180deg)" }}
                  transition="all 0.5s ease"
                >
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </HStack>

              {/* Hero Section */}
              <HeroSection about={personalInfo.about} />

              {/* Projects Section */}
              <SimpleGrid
                columns={[1, null, 3]}
                spacing={8}
                py={16}
                id="projects"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </SimpleGrid>

              {/* Skills Grid */}
              <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                py={16}
              >
                <SimpleGrid columns={[1, 2, 4]} spacing={8}>
                  {Object.entries(skills).map(([category, skillList]) => (
                    <Box
                      key={category}
                      p={6}
                      borderRadius="xl"
                      bg={colorMode === "light" ? "white" : "gray.800"}
                      boxShadow="xl"
                    >
                      <motion.div
                        initial={{ x: -20 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                      ></motion.div>
                        {skillList.map((skill) => (
                          <Box
                            key={skill}
                            p={2}
                            mb={2}
                            bg={colorMode === "light" ? "blue.50" : "blue.900"}
                            borderRadius="md"
                          >
                            {skill}
                          </Box>
                        ))}
                      </motion.div>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>

              {/* Contact Section */}
              <HStack justify="center" spacing={8} py={16}>
                {[
                  { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
                  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" }
                ].map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={social.href}
                      isExternal
                      fontSize="2xl"
                      color={colorMode === "light" ? "gray.600" : "gray.400"}
                      _hover={{ color: "blue.400" }}
                    >
                      <social.icon size={32} />
                    </Link>
                  </motion.div>
                ))}
              </HStack>
            </Container>
          </Box>
        </PageTransition>
        <ScrollToTop />
      </Suspense>
    </ChakraProvider>
  );
};

export default App;
