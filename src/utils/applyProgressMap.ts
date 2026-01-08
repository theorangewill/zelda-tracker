import GameDataSchema from "../schemas/gameData";

export default function applyProgressMap(base: GameDataSchema, progressMap: Record<string, boolean>): GameDataSchema {
  const copy: any = JSON.parse(JSON.stringify(base));

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    for (const k of Object.keys(obj)) {
      const v = obj[k];

      if (v && typeof v === 'object') {
        if ('completed' in v && k in progressMap) {
          v.completed = Boolean(progressMap[k]);
        }
        walk(v);
      }
    }
  }

  walk(copy);
  return copy;
}