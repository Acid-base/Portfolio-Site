import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Textarea,
    VStack,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useState } from "react";
import { FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message should be at least 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      try {
        // In a real app, you would send the form data to your API endpoint
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        toast({
          title: "Message sent successfully!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        toast({
          title: "Failed to send message",
          description: "Please try again or contact me directly via email.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors for this field when user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      role="region"
    >
      <MotionContainer maxW="container.md">
        <VStack spacing={8} align="flex-start">
          <Heading as="h2" size="xl">Get In Touch</Heading>
          <Text fontSize="lg">
            I'm currently available for freelance work or full-time positions. If you have a project that needs coding or a position to fill, feel free to contact me.
          </Text>

          <Box
            w="100%"
            p={8}
            borderRadius="xl"
            bg={bg}
            boxShadow="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <Flex gap={5} width="100%" direction={{ base: 'column', md: 'row' }}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaUser} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaEnvelope} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl isInvalid={!!errors.subject}>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.subject}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.message}>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    minHeight="150px"
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                  rightIcon={<FaPaperPlane />}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </MotionContainer>
    </MotionBox>
  );
};

export default ContactForm;
