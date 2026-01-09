import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './styles.css';

function App() {
  return (
    <BrowserRouter basename="/zelda-tracker">
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
