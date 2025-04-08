import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

export const useKeyboardNav = (): void => {
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case '/':
          event.preventDefault();
          // Implement keyboard shortcuts modal
          break;
        case 'g':
          const nextKey = (e: KeyboardEvent): void => {
            switch (e.key.toLowerCase()) {
              case 'h':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
              case 'p':
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
              case 'c':
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            document.removeEventListener('keypress', nextKey);
          };
          document.addEventListener('keypress', nextKey, { once: true });
          break;
        case 't':
          toggleColorMode();
          break;
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [toggleColorMode]);
};
