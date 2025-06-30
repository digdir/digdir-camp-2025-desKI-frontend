import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StartPage } from './Pages/StartPage';

/*
 * Main application component that sets up the routing for the application.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
