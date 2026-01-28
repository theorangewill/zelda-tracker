import { QuestsSchema, ItemsSchema } from "../../schemas/gameData";
import formatLabel from "../../utils/formatLabel";
import ButtonToggleableItem from "../ButtonToggleableItem";

interface Props {
    name: string;
    section: QuestsSchema | ItemsSchema;
    onToggle?: (...args: any[]) => void;
    hookedItems: Set<string>;
}

export default function DefinedContainerComponent({ name, section, onToggle, hookedItems }: Props) {
  if (!section || Object.keys(section).length === 0) {
    return null;
  }
  return (
    <div>
      <div className="bg-gray-800 border border-gray-700 p-5 m-2 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold text-white mb-2">{formatLabel(name)}</h2>
        <div className={`grid gap-1 p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
          {Object.entries(section || {}).map(([element_key, element]) => (
            <ButtonToggleableItem
              key={element_key}
              element={element_key}
              image={element.image}
              name={formatLabel(element_key)}
              active={element.completed}
              onToggle={onToggle}
              blocked={hookedItems.has(element_key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
