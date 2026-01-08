import { MagicPowerSchema } from "../schemas/gameData";

export default function calculateMagicPower(gameDataMagicPower: MagicPowerSchema): number {
  const powers = Object.values(gameDataMagicPower.magic_containers || {});
  const amt = powers.reduce((s, p) => s + (p.completed ? 1 : 0), 0);
  return gameDataMagicPower.info.min + amt;
}