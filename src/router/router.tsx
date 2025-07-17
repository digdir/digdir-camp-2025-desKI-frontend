import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ChatbotPage } from '~/Pages/ChatbotPage';
import { BrukerstotteStartPage } from '~/Pages/StartPages/BrukerstotteStartPage';
import { ServicedeskStartPage } from '~/Pages/StartPages/ServicedeskStartPage';
import RootLayout, { clientLoader } from '~/root';
import { clientAction } from '~/routes/settings';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      loader={clientLoader}
      action={clientAction}
    >
      <Route index element={<ServicedeskStartPage />} />
      <Route path="brukerstotte" element={<BrukerstotteStartPage />} />
      <Route path="chatbot" element={<ChatbotPage />} />
    </Route>,
  ),
);
