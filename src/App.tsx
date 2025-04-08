import {
  Box,
  Container,
  HStack,
  Link,
  SimpleGrid,
  useColorMode
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC, lazy, Suspense, useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import LoadingScreen from './components/LoadingScreen';
import { personalInfo, projects, skills } from './data/portfolio-data';
import { useKeyboardNav } from './hooks/useKeyboardNav';

// Lazy load components
const HeroSection = lazy(() => import('./components/HeroSection'));
const ProjectCard = lazy(() => import('./components/ProjectCard'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const PageTransition = lazy(() => import('./components/PageTransition'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ThemeToggle = lazy(() => import('./components/ThemeToggle'));

// Create motion components
const MotionBox = motion(Box);

interface SocialLinkType {
  icon: IconType;
  href: string;
  label: string;
}

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { colorMode, toggleColorMode } = useColorMode();

  useKeyboardNav();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const socialLinks: SocialLinkType[] = [
    { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" }
  ];

  return (
    <Suspense fallback={<LoadingScreen />}>
      <PageTransition>
        <Box minHeight="100vh" py={12}>
          <Container maxW="container.xl">            <ThemeToggle />

            <HeroSection personalInfo={personalInfo} />

            <SimpleGrid columns={[1, null, 3]} spacing={8} py={16} id="projects">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>            <SkillsSection skills={skills} />

            <ContactForm />

            <HStack justify="center" spacing={8} py={16}>
              {socialLinks.map((social) => (
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
  );
};

export default App;
