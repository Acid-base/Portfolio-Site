import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      'html, body': {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.900' : 'whiteAlpha.900',
        minHeight: '100vh',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
      },
      variants: {
        ghost: (props: { colorMode: string }) => ({
          bg: props.colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
          _hover: {
            bg: props.colorMode === 'light' ? 'gray.200' : 'whiteAlpha.200',
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: 'tight',
      },
    },
    Box: {
      variants: {
        card: (props: { colorMode: string }) => ({
          bg: props.colorMode === 'light' ? 'white' : 'gray.800',
          borderRadius: 'xl',
          p: 6,
          transition: 'all 0.2s',
          boxShadow:
            props.colorMode === 'light'
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.18)',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow:
              props.colorMode === 'light'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)',
          },
        }),
      },
    },
  },
});

export default theme;
