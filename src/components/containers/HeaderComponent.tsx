
interface Props {
    title: string;
    image: string;
    progress: number;
}

export default function HeaderComponent({ title, image, progress }: Props) {

  return (
    <div className="bg-gray-800 border border-gray-700 p-1 m-2 rounded-xl shadow-xl">
      <div className="flex flex-col items-center">
        <img src={image} alt={title} className="p-5 object-contain" />
        <div className="w-full relative">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
