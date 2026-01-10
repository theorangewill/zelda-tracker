import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './styles.css';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<Game />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
