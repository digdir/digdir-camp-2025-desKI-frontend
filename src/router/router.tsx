import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ChatbotPage } from '~/Pages/ChatbotPage';
import { StartPage } from '~/Pages/StartPage';
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
      <Route index element={<StartPage />} />
      <Route path="chatbot" element={<ChatbotPage />} />
    </Route>,
  ),
);
