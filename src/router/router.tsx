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
      <Route path="servicedesk">
        <Route index element={<StartPage />} />
        <Route
          path=":solutionSlug"
          element={<ChatbotPage source="servicedesk" />}
        />
      </Route>
      <Route
        path="brukerstotte"
        element={<ChatbotPage source="brukerstotte" />}
      />
    </Route>,
  ),
);
