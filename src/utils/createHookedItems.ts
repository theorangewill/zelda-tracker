import GameDataSchema from "../schemas/gameData";

export default function createHookedItems(gameData: GameDataSchema): Set<string> {
  const hooked = new Set<string>();

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object') {
        if (Array.isArray(v.hooks)) {
          for (const h of v.hooks) hooked.add(h);
        }
        else{
          walk(v);
        }
      }
    }
  }
  walk(gameData);
  return hooked;
}
