import { DungeonKeys, DungeonsSchema, ImagesSchema } from "../../schemas/gameData";
import formatLabel from "../../utils/formatLabel";
import ImageToggleableItem from '../ImageToggleableItem';

interface Props {
    section: DungeonsSchema;
    images: ImagesSchema;
    itemsImages: Record<string, string>;
    onToggle: (dungeonKey: string, element: DungeonKeys) => void;
    containerCols: string;
}

export default function DungeonsContainerComponent({ section, images, itemsImages, onToggle, containerCols }: Props) {

  return (
    <div className="bg-gray-800 border border-gray-700 p-1 m-2 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold text-white mb-2">Dungeons</h2>

      <div className={`grid grid-cols-1 md:grid-cols-${containerCols} gap-3 p-2`}>
        {Object.entries(section || {}).map(([key, dungeon]) => (
        <div 
          key={key}
          className={`relative flex flex-row items-center justify-between
            w-full
            border ${dungeon.completed ? 'border-green-700 border-4' : 'border-gray-700'} rounded-lg mt-3 mb-1 mx-1 p-1 pr-3 pl-3 pt-2`
          }
        >
          
          <span className="absolute -top-2 left-2 bg-gray-800 px-2 text-xs font-semibold text-gray-300">{formatLabel(key)}</span>
          
          <div className="cursor-pointer flex-shrink-0 w-16 h-16 border border-gray-600 rounded overflow-hidden" onClick={() => onToggle(key, 'all')}>
            <img src={dungeon.image} alt={`${formatLabel(key)}`} className="w-full h-full object-cover"  />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_compass`} 
              element="compass" 
              image={images.compass}
              name={`${formatLabel(key)} Compass`}
              active={dungeon.compass} 
              onToggle={() => onToggle(key, 'compass')} 
              blocked={false}
            />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_map`} 
              element="map" 
              image={images.map} 
              name={`${formatLabel(key)} Map`} 
              active={dungeon.map} 
              onToggle={() => onToggle(key, 'map')} 
              blocked={false}
            />
          </div>

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_item`} 
              element="item" 
              image={itemsImages[dungeon.item.key] ?? ''} 
              name={`${formatLabel(key)} Item`} 
              active={dungeon.item.completed} 
              onToggle={() => onToggle(key, 'item')} 
              blocked={false}
              />
          </div>

          {dungeon.item2 ? 
          
            (<div className="flex-shrink-0 w-8 h-8 overflow-hidden">
              <ImageToggleableItem key={`${key}_item2`} 
                element="item" 
                image={itemsImages[dungeon.item2.key] ?? ''} 
                name={`${formatLabel(key)} Item 2`} 
                active={dungeon.item2.completed} 
                onToggle={() => onToggle(key, 'item2')} 
                blocked={false}
                />
            </div>)
            : null
          }

          <div className="flex-shrink-0 w-8 h-8 overflow-hidden">
            <ImageToggleableItem key={`${key}_boss_key`} 
              element="boss_key" 
              image={images.boss_key} 
              name={`${formatLabel(key)} Boss Key`} 
              active={dungeon.boss_key} 
              onToggle={() => onToggle(key, 'boss_key')} 
              blocked={false} 
            />
          </div>

          <div className="flex-shrink-0 w-16 h-16 overflow-hidden">
            <ImageToggleableItem key={`${key}_boss`} 
              element="boss" 
              image={dungeon.boss.image} 
              name={`${formatLabel(key)} Boss`} 
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
