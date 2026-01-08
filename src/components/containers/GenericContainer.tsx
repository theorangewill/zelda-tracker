import { GenericContainerSchema } from "../../schemas/gameData";
import ImageToggleableItem from '../ImageToggleableItem';
import formatLabel from "../../utils/formatLabel";
import ButtonToggleableItem from "../ButtonToggleableItem";

interface Props {
    section: GenericContainerSchema;
    onToggle?: (...args: any[]) => void;
    hookedItems: Set<string>;
    cols?: Record<string, number>;
}

export default function GenericContainerComponent({ section, onToggle, hookedItems, cols }: Props) {

  return (
    <div>
    {Object.entries(section).map(([key, elements]) => (
    <div key={key} className="bg-gray-800 border border-gray-700 p-3 m-2 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold text-white mb-2">{formatLabel(key)}</h2>
        <div className={`grid gap-1 p-2`}
          style={{
              gridTemplateColumns: `repeat(${cols?.[key] ? cols[key] : 8}, minmax(0, 1fr))`,
            }}
          >
            {Object.entries(elements || {}).map(([element_key, element]) => (
              element.image ?
                <ImageToggleableItem 
                  key={element_key} 
                  element={element_key} 
                  image={element.image} 
                  name={element.name} 
                  active={element.completed} 
                  onToggle={onToggle} 
                  blocked={hookedItems.has(element_key)} 
              />
              : 
                <ButtonToggleableItem
                  key={element_key}
                  element={element_key}
                  image={element.image}
                  name={element.name}
                  active={element.completed}
                  onToggle={onToggle}
                  blocked={hookedItems.has(element_key)}
                />
            ))}
        </div>
    </div>
    ))}
    </div>
  );
}
