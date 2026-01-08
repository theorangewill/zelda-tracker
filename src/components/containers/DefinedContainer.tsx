import { QuestsSchema, ItemsSchema } from "../../schemas/gameData";
import ImageToggleableItem from '../ImageToggleableItem';
import formatLabel from "../../utils/formatLabel";
import ButtonToggleableItem from "../ButtonToggleableItem";

interface Props {
    name: string;
    section: QuestsSchema | ItemsSchema;
    onToggle?: (...args: any[]) => void;
    hookedItems: Set<string>;
    type: 'image' | 'button';
    cols: number;
}

export default function DefinedContainerComponent({ name, section, onToggle, hookedItems, type, cols }: Props) {

  return (
    <div>
      <div className="bg-gray-800 border border-gray-700 p-5 m-2 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold text-white mb-2">{formatLabel(name)}</h2>
        <div className={`grid gap-1 p-2`}
        style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {Object.entries(section || {}).map(([element_key, element]) => (
          type === "image" ?
            <ImageToggleableItem
              key={element_key}
              element={element_key}
              image={element.image}
              name={element.name}
              active={element.completed}
              onToggle={onToggle}
              blocked={hookedItems.has(element_key)}
            />
          : type === "button" ? 
            <ButtonToggleableItem
              key={element_key}
              element={element_key}
              image={element.image}
              name={element.name}
              active={element.completed}
              onToggle={onToggle}
              blocked={hookedItems.has(element_key)}
            />
          : null
          ))}
        </div>
      </div>
    </div>
  );
}
