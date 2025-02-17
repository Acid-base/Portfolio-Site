import {
  Badge,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

const KeyboardShortcuts = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();

  const shortcuts = [
    { key: "H", description: "Go to Home" },
    { key: "P", description: "Go to Projects" },
    { key: "S", description: "Go to Skills" },
    { key: "C", description: "Go to Contact" },
    { key: "?", description: "Show/Hide Shortcuts" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyboard Shortcuts</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {shortcuts.map(({ key, description }) => (
              <HStack key={key} justify="space-between">
                <Badge
                  px={2}
                  py={1}
                  borderRadius="md"
                  bg={colorMode === "light" ? "gray.100" : "gray.700"}
                >
                  {key}
                </Badge>
                <Text>{description}</Text>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KeyboardShortcuts;
