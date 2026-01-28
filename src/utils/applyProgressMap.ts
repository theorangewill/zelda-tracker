import GameDataSchema from "../schemas/gameData";

export default function applyProgressMap(base: GameDataSchema, progressMap: Record<string, boolean>): GameDataSchema {
  const copy: any = JSON.parse(JSON.stringify(base));

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    for (const k of Object.keys(obj)) {
      const v = obj[k];

      if (v && typeof v === 'object') {
        if (k in progressMap) {
          v.completed = Boolean(progressMap[k]);
          if ('compass' in v && v.compass != null && `${k}_compass` in progressMap) {
            v.compass = Boolean(progressMap[`${k}_compass`]);
          }
          if ('map' in v && v.map != null && `${k}_map` in progressMap) {
            v.map = Boolean(progressMap[`${k}_map`]);
          }
          if ('boss_key' in v && v.boss_key != null && `${k}_boss_key` in progressMap) {
            v.boss_key = Boolean(progressMap[`${k}_boss_key`]);
          }
          if ('item' in v && v.item != null && `${k}_item` in progressMap) {
            v.item.completed = Boolean(progressMap[`${k}_item`]);
          }
          if ('item2' in v && v.item2 != null && `${k}_item2` in progressMap) {
            v.item2.completed = Boolean(progressMap[`${k}_item2`]);
          }
          if ('boss' in v && `${k}_boss` in progressMap) {
            v.boss.completed = Boolean(progressMap[`${k}_boss`]);
            continue;
          }
        }
        walk(v);
      }
    }
  }

  walk(copy);
  return copy;
}