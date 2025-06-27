import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StartPage } from './Pages/StartPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
