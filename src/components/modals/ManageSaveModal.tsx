interface Props {
  show: (value: boolean) => void;
  handleExport: () => void;
  handleImport: () => void;
  handleReset: () => void;
}

export default function ManageSaveModal({ show, handleExport, handleImport, handleReset }: Props) {

  return (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fadeIn" onClick={() => show(false)}>
    <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl max-w-md w-[90%]" onClick={(e) => e.stopPropagation()}>
    <h3 className="text-2xl font-bold text-white mb-6 text-center">Manage Save</h3>
    <div className="space-y-4">
      <button className="w-full px-6 py-4 bg-primary hover:bg-primary-light text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-3" onClick={handleExport}>
      Export Save
      </button>
      <button className="w-full px-6 py-4 bg-accent hover:bg-yellow-600 text-gray-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3" onClick={handleImport}>
      Import Save
      </button>
      <button className="w-full px-6 py-4 bg-rose-500 hover:bg-red-800 text-gray-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3" onClick={handleReset}>
      Reset Save
      </button>
      <button className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors" onClick={() => show(false)}>
      Cancel
      </button>
    </div>
    </div>
  </div>
  );
}
