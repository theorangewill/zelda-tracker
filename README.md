# 🗡️ Zelda Quest Tracker

A progress tracker for classic The Legend of Zelda games, built with React + Vite.

## ✨ Features

- � Interactive checklist system to track quests and items
- 💾 Automatic progress saving to localStorage
- 🎮 Support for multiple games (e.g., Ocarina of Time, Majora's Mask)
- 📊 Progress overview with percentages and stats
- 🎨 Responsive, modern UI
- 🔄 Per-game reset of progress
- 🚀 Multi-page navigation with React Router

## 🛠️ Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- LocalStorage API

## 📁 Project structure

```
src/
 ├── data/               # JSON files containing game data
 │   ├── ocarina.json
 │   └── majora.json
 ├── pages/              # Top-level pages
 │   ├── Home.tsx
 │   └── Game.tsx
 ├── components/         # Reusable UI components
 │   ├── ImageToggleableItem.tsx
 │   └── ButtonToggleableItem.tsx
 ├── hooks/
 │   └── useGameProgress.ts  # Hook that manages progress state
 ├── App.tsx
 ├── main.tsx
 └── styles.css
```

## 🚀 Running the project

### Prerequisites

- Node.js 16+ installed
- npm

### Install & run

```bash
# Install dependencies (if needed):
npm install

# Execute tests
npx jest

# Run in development mode:
npm run dev

# Build for production:
npm run build

# Preview the production build:
npm run preview

# Deploy on github pages
npm run deploy
```

The app will be available at `http://localhost:5173/`.

## 🎮 How to use

1. On the home page you'll see cards for available games
2. Click a game to view its quests and items
3. Check items as you collect/complete them
4. Progress is saved automatically in your browser
5. Use the "Reset Progress" button to start over for a game

## 📊 Game data

Game data is stored in `src/data/` as JSON files. To add a new game:

1. Create a JSON file in `src/data/` (e.g. `windwaker.json`)
2. Follow the structure of existing files
3. The app will pick up files from `src/data/` automatically

### GameData files validation

To validate all game data files (GameData) in `src/data`, use the Python script `validator.py`:

```bash
python src/services/validator.py
```

The script will check all `.json` files in the `src/data` folder and report any structure errors or duplicate keys. If all files are valid, you will see:

```
All GameData are valid!
```

If any file has errors, the details will be listed in the terminal.

## 📝 License

This code is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

The visual assets displayed in this project are copyrighted works belonging to Nintendo and/or their respective owners. 

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-game`)
3. Commit your changes (`git commit -m 'Add new game'`)
4. Push to your branch (`git push origin feature/new-game`)
5. Open a Pull Request

---

Built with ⚔️ by a Zelda fan

````

