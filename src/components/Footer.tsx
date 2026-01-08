import { COPYRIGHT_TEXT, FOOTER_MESSAGE, DISCLAIMER, AUTHOR } from '../constants/copyright';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">
            {FOOTER_MESSAGE}
          </p>
          <p className="text-gray-500 text-xs">
            {DISCLAIMER}
          </p>
          <p className="text-gray-600 text-xs">
            {COPYRIGHT_TEXT}
          </p>
          <p className="text-gray-600 text-xs">
            {AUTHOR}
          </p>
        </div>
      </div>
    </footer>
  );
}
