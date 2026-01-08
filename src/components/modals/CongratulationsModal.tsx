interface Props {
  show: (value: boolean) => void;
}

export default function CongratulationsModal({ show }: Props) {

  return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center
                bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={() => show(false)}
    >
        <div
        className="bg-gray-800 border border-gray-700
                    rounded-xl shadow-2xl
                    p-8 max-w-md w-[90%]
                    text-center"
        onClick={(e) => e.stopPropagation()}
        >
        <h2 className="text-3xl font-bold text-primary mb-4">🎉 Congrats!</h2>
        <p className="text-gray-300 mb-6">You've completed <span className="font-bold text-white">100%</span> of the game!</p>

        <button
            onClick={() => show(false)}
            className="
            px-6 py-3
            bg-primary hover:bg-primary-light
            text-white font-semibold
            rounded-lg
            transition-colors
            "
        >
            Close
        </button>
        </div>
    </div>
  );
}
