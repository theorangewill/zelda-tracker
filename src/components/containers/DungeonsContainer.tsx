import { DungeonKeys, DungeonsSchema, ImagesSchema, ItemsSchema } from "../../schemas/gameData";
import ImageToggleableItem from '../ImageToggleableItem';

interface Props {
    section: DungeonsSchema;
    images: ImagesSchema;
    items: ItemsSchema;
    onToggle: (dungeonKey: string, element: DungeonKeys) => void;
}

export default function DungeonsContainerComponent({ section, images, items, onToggle }: Props) {

  return (
    <div className="bg-gray-800 border border-gray-700 p-1 m-2 rounded-xl shadow-xl">
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-lg font-bold text-white mb-2">Dungeons</h2>
        {Object.entries(section || {}).map(([key, dungeon]) => (
        <div 
          key={key}
          className={`relative flex flex-row items-center justify-between
    w-full
    border ${dungeon.completed ? 'border-green-700 border-4' : 'border-gray-700'} rounded-lg mt-3 mb-1 mx-1 p-1 pr-3 pl-3 pt-2`}
        >
          
          <span className="absolute -top-2 left-2 bg-gray-800 px-2 text-xs font-semibold text-gray-300">{dungeon.name}</span>
          
          <div className="flex-shrink-0 w-16 h-16 border border-gray-600 rounded overflow-hidden">
            <img src={dungeon.image} alt={`${dungeon.name} Dungeon`} className="w-full h-full object-cover" />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_compass`} 
              element="compass" 
              image={images.compass}
              name={`${dungeon.name} Compass`}
              active={dungeon.compass} 
              onToggle={() => onToggle(key, 'compass')} 
              blocked={false}
            />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_map`} 
              element="map" 
              image={images.map} 
              name={`${dungeon.name} Map`} 
              active={dungeon.map} 
              onToggle={() => onToggle(key, 'map')} 
              blocked={false}
            />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_item`} 
              element="item" 
              image={items[dungeon.item.name].image} 
              name={`${dungeon.name} Item`} 
              active={dungeon.item.completed} 
              onToggle={() => onToggle(key, 'item')} 
              blocked={false}
              />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_boss_key`} 
              element="boss_key" 
              image={images.boss_key} 
              name={`${dungeon.name} Boss Key`} 
              active={dungeon.boss_key} 
              onToggle={() => onToggle(key, 'boss_key')} 
              blocked={false} 
            />
          </div>

          <div className="flex-shrink-0 w-16 h-16 overflow-hidden">
            <ImageToggleableItem key={`${key}_boss`} 
              element="boss" 
              image={dungeon.boss.image} 
              name={`${dungeon.name} Boss`} 
              active={dungeon.boss.completed}
              onToggle={() => onToggle(key, 'boss')} 
              blocked={false} 
            />
          </div>
        </div>
        ))}
      </div>
    </div>
    
  );
}
