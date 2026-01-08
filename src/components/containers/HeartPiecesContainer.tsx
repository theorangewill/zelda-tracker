import { HealthSchema } from "../../schemas/gameData";
import ImageToggleableItem from '../ImageToggleableItem';
import InfoLink from "../InfoLink";

interface Props {
  section: HealthSchema;
  image: string;
  onToggle?: (...args: any[]) => void;
  hookedItems: Set<string>;
}

export default function HeartPiecesContainerComponent({ section, image, onToggle, hookedItems }: Props) {
  return (
    <div 
    className="bg-gray-800 border border-gray-700 p-3 m-2 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-white mb-2">Heart pieces</h2>
        <InfoLink
          href={section.heart_pieces_list}
          label="Heart Pieces locations"
        />
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-1 p-2">
        {Object.entries(section.heart_pieces || {}).map(([key, heart_piece]) => (
          <ImageToggleableItem 
            key={key} 
            element={key} 
            image={image} 
            name={heart_piece.name} 
            active={heart_piece.completed} 
            onToggle={onToggle} 
            blocked={hookedItems.has(key)}
          />
        ))}
      </div>
    </div>
  );
}
