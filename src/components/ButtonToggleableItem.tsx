import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

interface Props {
  element: string;
  image?: string;
  name: string;
  active: boolean;
  onToggle?: (...args: any[]) => void;
  blocked: boolean;
}

export default function ButtonToggleableItem({ element, image, name, active, onToggle, blocked }: Props) {
  const [sparkle, setSparkle] = useState(false);
  const prevActive = useRef(active);

  useEffect(() => {
    if (!prevActive.current && active) {
      setSparkle(true);
      const t = setTimeout(() => setSparkle(false), 700);
      return () => clearTimeout(t);
    }

    prevActive.current = active;
  }, [active]);
  
  return (
    <div className="relative group w-full">
      <button
        type="button"
        disabled={blocked}
        onClick={() => !blocked && onToggle?.(element)}
        className={`
          w-full aspect-square h-14
          px-3
          rounded-xl
          flex items-center justify-center
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-green-400

          ${active ? "bg-green-700" : "bg-gray-700"}
          ${blocked
            ? active? "brightness-100"
            : "brightness-[30%]" : ""}
        `}
      >
        {blocked && (
          <div className="absolute bottom-0 right-0 p-1">
            <Lock size={12} strokeWidth={3} className="text-yellow-400" />
          </div>
        )}

      {/* ✨ Sparkles */}
      {sparkle && (
        <div className="absolute -inset-2 pointer-events-none">
          {[...Array(16)].map((_, i) => {
            const side = i % 4; // 0=top,1=right,2=bottom,3=left

            const styleBySide = [
              { top: 0, left: `${Math.random() * 100}%` },      // top
              { right: 0, top: `${Math.random() * 100}%` },     // right
              { bottom: 0, left: `${Math.random() * 100}%` },   // bottom
              { left: 0, top: `${Math.random() * 100}%` },      // left
            ][side];

            const directions = [
              { "--dx": "0px", "--dy": "-16px" },  // top → sobe
              { "--dx": "16px", "--dy": "0px" },   // right → direita
              { "--dx": "0px", "--dy": "16px" },   // bottom → desce
              { "--dx": "-16px", "--dy": "0px" },  // left → esquerda
            ][side] as React.CSSProperties;

            return (
              <span
                key={i}
                className="magic-triangle-around"
                style={{
                  ...styleBySide,
                  ...directions,
                  animationDelay: `${Math.random() * 0.25}s`,
                }}
              />
            );
          })}
        </div>
      )}

      
      {image? 
        <div className="w-10 h-10">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-contain transition-all duration-150 ${blocked ? "opacity-50 cursor-not-allowed" : ""}`}
          /> 
        </div>
        : null
      }
     
      
      <span
        className="
          text-white font-semibold
          text-sm
          w-full
          text-center
          leading-tight

          line-clamp-2
          break-words
          pointer-events-none
        "
        title={name}
      >
        {name}
      </span>
    </button>

    </div>
  );
}
