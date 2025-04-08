import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Box,
  useColorMode,
} from '@chakra-ui/react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Shortcut {
  key: string;
  description: string;
}

const KeyboardShortcuts: FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();

  const shortcuts: Shortcut[] = [
    { key: '/', description: 'Open keyboard shortcuts' },
    { key: 'g h', description: 'Go to home' },
    { key: 'g p', description: 'Go to projects' },
    { key: 'g c', description: 'Go to contact' },
    { key: 't', description: 'Toggle dark/light mode' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyboard Shortcuts</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="stretch" spacing={4}>
            {shortcuts.map(({ key, description }) => (
              <HStack key={key} justify="space-between">
                <Text>{description}</Text>
                <Box
                  px={3}
                  py={1}
                  borderRadius="md"
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                >
                  <Text fontFamily="monospace">{key}</Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KeyboardShortcuts;
