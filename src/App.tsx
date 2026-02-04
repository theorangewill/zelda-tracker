import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePageOne from './pages/GamePageOne';
import './styles.css';
import GamePageTwo from './pages/GamePageTwo';
import GamePageAdventureOfLink from './pages/GamePageAdventureOfLink';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/01-zelda" element={<GamePageTwo gameId='01-zelda' />} />
          <Route path="/02-adventureoflink" element={<GamePageAdventureOfLink gameId='02-adventureoflink' />} />
          <Route path="/03-linktothepast" element={<GamePageTwo gameId='03-linktothepast' />} />
          <Route path="/04-linksawakening" element={<GamePageTwo gameId='04-linksawakening' />} />
          <Route path="/06-majora" element={<GamePageOne gameId='06-majora' />} />
          <Route path="/05-ocarina" element={<GamePageTwo gameId='05-ocarina' />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
