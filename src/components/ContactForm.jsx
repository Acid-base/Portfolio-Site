import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      as="section"
      id="contact"
      py={16}
    >
      <VStack spacing={8} align="stretch" maxW="600px" mx="auto" px={4}>
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Get In Touch
        </Heading>
        <Box
          as="form"
          onSubmit={handleSubmit}
          p={8}
          borderRadius="xl"
          bg={colorMode === "light" ? "white" : "gray.800"}
          boxShadow="xl"
        >
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                _hover={{
                  borderColor: colorMode === "light" ? "blue.400" : "blue.300",
                }}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                _hover={{
                  borderColor: colorMode === "light" ? "blue.400" : "blue.300",
                }}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.message}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                _hover={{
                  borderColor: colorMode === "light" ? "blue.400" : "blue.300",
                }}
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              loadingText="Sending..."
              w="full"
              mt={4}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default ContactForm;
