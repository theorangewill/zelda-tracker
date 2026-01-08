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

export default function EquipmentsContainerComponent({ section, onToggle, hookedItems, cols }: Props) {

  return (
  <div className="bg-gray-800 border border-gray-700 p-3 m-2 rounded-xl shadow-xl">
    <h2 className="text-lg font-bold text-white mb-2">Equipments</h2>
    <div className="flex flex-col gap-1 p-2">
      {Object.entries(section || {}).map(([key, equipment]) => (
      <div key={key} className="relative border border-gray-700 rounded-lg mt-3 mb-1 mx-1 p-1 pt-2">
        <span className="absolute -top-2 left-2 bg-gray-800 px-2 text-xs font-semibold text-gray-300">{formatLabel(key)}</span>
          <div className={`grid gap-1 p-2`}
            style={{
              gridTemplateColumns: `repeat(${cols?.[key] ? cols[key] : 8}, minmax(0, 1fr))`,
            }}
          >
          {Object.entries(equipment || {}).map(([variant_key, variant]) => (
            variant.image ?
              <ImageToggleableItem 
                key={variant_key} 
                element={variant_key} 
                image={variant.image} 
                name={variant.name} 
                active={variant.completed} 
                onToggle={onToggle} 
                blocked={hookedItems.has(variant_key)}
              />
            : 
              <ButtonToggleableItem
                key={variant_key}
                element={variant_key}
                image={variant.image}
                name={variant.name}
                active={variant.completed}
                onToggle={onToggle}
                blocked={hookedItems.has(variant_key)}
              />
          ))}
          </div>
      </div>
      ))}
    </div>
  </div>
  );
}
