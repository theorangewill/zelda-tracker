import { GenericContainerSchema } from "../../schemas/gameData";
import ImageToggleableItem from '../ImageToggleableItem';
import formatLabel from "../../utils/formatLabel";
import ButtonToggleableItem from "../ButtonToggleableItem";
import InfoLink from "../InfoLink";

interface Props {
    section: GenericContainerSchema;
    onToggle?: (...args: any[]) => void;
    hookedItems: Set<string>;
    cols?: Record<string, string>;
    infos?: Record<string, string>;
}

export default function GenericContainerComponent({ section, onToggle, hookedItems, cols, infos }: Props) {

  return (
    <div>
    {Object.entries(section).map(([key, elements]) => (
    <div key={key} className="bg-gray-800 border border-gray-700 p-3 m-2 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-white mb-2">{formatLabel(key)}</h2>
          {infos && infos[key] &&
            <InfoLink
              href={infos[key]}
              label={`${formatLabel(key)} locations`}
            />
          }
        </div>
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
                  name={element.name ?? formatLabel(element_key)} 
                  active={element.completed} 
                  onToggle={onToggle} 
                  blocked={hookedItems.has(element_key)} 
              />
              : 
                <ButtonToggleableItem
                  key={element_key}
                  element={element_key}
                  image={element.image}
                  name={element.name ?? formatLabel(element_key)}
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
