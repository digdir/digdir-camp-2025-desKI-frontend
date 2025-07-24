import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/common.css';

// Importing designsystemet here and only here
// Import local styles as needed
import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
