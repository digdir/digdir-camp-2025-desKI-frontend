import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout, { clientLoader } from '~/root';
import { clientAction } from '~/routes/settings';
import { StartPage } from '~/Pages/StartPage';
import { ChatbotPage } from '~/Pages/ChatbotPage';

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
    </Route>
  )
);
