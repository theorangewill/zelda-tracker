import { HealthSchema } from "../schemas/gameData";

export default function calculateHeartContainers(gameDataHearts: HealthSchema): number {
  const pieces = Object.values(gameDataHearts.heart_pieces || {});
  const containers = Object.values(gameDataHearts.heart_containers || {});
  const amtPieces = pieces.reduce((s, p) => s + (p.completed ? 1 : 0), 0);
  const amtContainers = containers.reduce((s, c) => s + (c.completed ? 1 : 0), 0);
  return gameDataHearts.info.min + amtContainers + Math.floor(amtPieces / gameDataHearts.info.proportion_of_heart_pieces_per_heart_container);
}