import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/common.css';

// Importing designsystemet here and only here
// Import local styles as needed
import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';

/*
 * Main entry point for the React application.
 */
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

/*
 * Render the main application component into the root element.
 * The application is wrapped in StrictMode for highlighting potential problems in the application.
 */
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
