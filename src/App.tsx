import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatbotPage } from './Pages/ChatbotPage';
import { StartPage } from './Pages/StartPage';

/**
 * Root application component that sets up routing.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>
  );
}
