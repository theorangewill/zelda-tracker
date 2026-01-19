import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Settings, ArrowLeft } from 'lucide-react';
import GenericContainerComponent from '../components/containers/GenericContainer';
import DefinedContainerComponent from '../components/containers/DefinedContainer';
import DungeonsContainerComponent from '../components/containers/DungeonsContainer';
import EquipmentsContainerComponent from '../components/containers/EquipmentsContainer';
import HeartPiecesContainerComponent from '../components/containers/HeartPiecesContainer';
import HeaderComponent from '../components/containers/HeaderComponent';
import StatusContainerComponent from '../components/containers/StatusContainer';
import CongratulationsModal from '../components/modals/CongratulationsModal';
import ManageSaveModal from '../components/modals/ManageSaveModal';
import { useGameLoader } from '../hooks/useGameLoader';
import { useGameProgress } from '../hooks/useGameProgress';
import { useGamePersistence } from '../hooks/useGamePersistence';
import ItemsContainerComponent from '../components/containers/ItemsContainer';


export default function GamePageTwo({ gameId }: { gameId: string }) {
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const navigate = useNavigate();
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const { baseGame, gameData, setGameData } = useGameLoader(gameId);


  const itemsImages = useMemo(() => {
    if (!gameData) return {};

    const images: Record<string, string> = {};

    for (const [key, item] of Object.entries(gameData.items || {})) {
      if (item.image) {
        images[key] = item.image;
      }
    }

    for (const item of Object.values(gameData.equipments || {})) {
      for (const [subkey, subitem] of Object.entries(item)) {
        if (subitem.image) {
          images[subkey] = subitem.image;
        }
      }
    }

    return images;
  }, [gameData]);

  const {
    progress,
    hookedItems,
    amtHeartContainers,
    amtMagicPower,
    toggleSelected,
    toggleSelectedDungeon,
  } = useGameProgress(gameData, setGameData);


  const {
    handleExport,
    handleImport,
    handleReset,
  } = useGamePersistence({
    gameId,
    gameData,
    baseGame,
    setGameData,
    closeModal: () => setShowImportExportModal(false),
  });

  useEffect(() => {
    if (progress === 100) {
      setShowCongratsModal(true);
    }
  }, [progress]);

  if (!gameData || !gameId) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-xl text-gray-400">
        <p>Loading...</p>
      </div>
    );
  }






  return (
    <div className="min-h-screen bg-gray-900 animate-fadeIn flex flex-col">
      <header className="w-full flex items-center justify-between px-4 py-1 bg-gray-800/90 backdrop-blur-md shadow-lg top-0 left-0 z-50">
        <button
          type="button"
          onClick={() => navigate('/')}
          title="Back to Home"
          className="flex items-center gap-2 text-white hover:text-primary transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={() => setShowImportExportModal(true)}
          title="Settings"
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all duration-200 border border-gray-600 hover:border-primary flex items-center gap-2"
        >
          <Settings size={22} strokeWidth={2.2} className="hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      {showImportExportModal && (<ManageSaveModal show={setShowImportExportModal} handleExport={handleExport} handleImport={handleImport} handleReset={handleReset} />)}

      {showCongratsModal && (<CongratulationsModal show={setShowCongratsModal} />)}

      <div className="flex-1 p-1 pt-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-start-1 lg:row-start-1 lg:row-span-3">
              <HeaderComponent
                title={gameData.title}
                image={gameData.images.logo}
                progress={progress}
              />

              <StatusContainerComponent
                images={gameData.images}
                health={gameData.health}
                amtHeartContainers={amtHeartContainers}
                magic_power={gameData.magic_power}
                amtMagicPower={amtMagicPower}
                cols={gameData.styling.health ?? "10"}
              />

              <ItemsContainerComponent
                name='Items'
                section={gameData.items}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.items ?? "5"}
              />

              <EquipmentsContainerComponent
                section={gameData.equipments}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                containerCols="1"
                cols={gameData.styling.equipments}
              />

              <GenericContainerComponent
                section={gameData.abilities?.sidebar || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.abilities}
                infos={gameData.infos.abilities}
              />

              <GenericContainerComponent
                section={gameData.collectibles?.sidebar || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.collectibles}
                infos={gameData.infos.collectibles}
              />

              <HeartPiecesContainerComponent
                section={gameData.health}
                image={gameData.images.heart_piece}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
              />

            </div>

            <div className="lg:col-start-2 lg:row-start-1">
              
              <DungeonsContainerComponent
                section={gameData.dungeons}
                images={gameData.images}
                itemsImages={itemsImages}
                onToggle={toggleSelectedDungeon}
                containerCols="1"
              />
            </div>

            <div className="lg:col-start-3 lg:row-start-1">
              <GenericContainerComponent
                section={gameData.abilities?.main || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.abilities}
                infos={gameData.infos.abilities}
              />
            </div>

            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <GenericContainerComponent
                section={gameData.collectibles?.main || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.collectibles}
                infos={gameData.infos.collectibles}
              />

              <DefinedContainerComponent
                name='Quests'
                section={gameData.quests}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
              />

              <DefinedContainerComponent
                name='Minigames'
                section={gameData.minigames}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
              />

              <GenericContainerComponent
                section={gameData.abilities?.bottom || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.abilities}
                infos={gameData.infos.abilities}
              />

              <GenericContainerComponent
                section={gameData.collectibles?.bottom || {}}
                onToggle={toggleSelected}
                hookedItems={hookedItems}
                cols={gameData.styling.collectibles}
                infos={gameData.infos.collectibles}
              />

          </div>


          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
