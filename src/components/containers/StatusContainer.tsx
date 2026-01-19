import { HealthSchema, MagicPowerSchema, ImagesSchema } from "../../schemas/gameData";

interface Props {
  images: ImagesSchema;
  health: HealthSchema;
  amtHeartContainers: number;
  magic_power: MagicPowerSchema;
  amtMagicPower: number;
  cols: string;
}

export default function StatusContainerComponent({ images, health, amtHeartContainers, magic_power, amtMagicPower, cols }: Props) {

  return (
  <div className="bg-gray-800 border border-gray-700 p-3 m-2 rounded-xl shadow-xl">
    <div className={`grid gap-1 p-2 place-items-center`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {health && Array.from({ length: health.info.max }).map((_, index) => (
      <div key={`health-${index}`} className="flex flex-col items-center overflow-hidden">
        <img 
          src={images.heart_container}
          alt={`Heart ${index + 1}`} 
          className={`w-5 h-full object-cover ${index + 1 <= amtHeartContainers ? "brightness-100" : "brightness-0"}`} />
      </div>
      ))}
      
    </div>
    <div className="w-full flex justify-center">
      <div className="h-3 w-80  bg-gray-700 overflow-hidden border border-white border-2">
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300  flex items-center justify-center text-[10px] font-bold text-white" 
        style={{ width: `${100 * amtMagicPower / magic_power.info.max}%` }} 
      />
      </div>
    </div>
  </div>
  );
}
