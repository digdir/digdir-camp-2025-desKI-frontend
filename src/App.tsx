import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatbotPage } from './Pages/ChatbotPage';
import { StartPage } from './Pages/StartPage';
import Layout from './components/Layout/Layout';

/**
 * Root application component that sets up routing.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
