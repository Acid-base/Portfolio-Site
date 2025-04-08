import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import theme from './theme';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} storageKey="portfolio-color-mode" />
    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </>
);
