import { Info } from "lucide-react";

interface InfoLinkProps {
  href: string;
  label: string;
}

export default function InfoLink({
  href,
}: InfoLinkProps) {
  if (!href) return null;

  return (
    <button
      type="button"
      aria-label="More information"
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      className="
        w-6 h-6 flex items-center justify-center
        rounded-full
        text-gray-400 hover:text-white
        hover:bg-gray-700
        transition-colors
      "
    >
      <Info size={16} strokeWidth={2.5} />
    </button>
  );
}
