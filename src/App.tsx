import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePageOne from './pages/GamePageOne';
import './styles.css';
import GamePageTwo from './pages/GamePageTwo';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/06-majora" element={<GamePageOne gameId='06-majora' />} />
          <Route path="/05-ocarina" element={<GamePageTwo gameId='05-ocarina' />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
