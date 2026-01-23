import GameDataSchema from "../schemas/gameData";


export default function applyStatusTotals(base: GameDataSchema): GameDataSchema {
    const newSection1: Record<string, {completed: boolean;}> = {};
    for (let i = 0; i < base.health.info.heart_cointainers_total; i++) {
        newSection1[`heart_container_${i + 1}`] = {completed: false};
    }
    base.health.heart_containers = newSection1;
    
    const newSection2: Record<string, {completed: boolean;}> = {};
    for (let i = 0; i < base.health.info.heart_pieces_total; i++) {
        newSection2[`heart_piece_${i + 1}`] = {completed: false};
    }
    base.health.heart_pieces = newSection2;

    const newSection3: Record<string, {completed: boolean;}> = {};
    for (let i = 0; i < base.magic_power.info.magic_containers_total; i++) {
        newSection3[`magic_container_${i + 1}`] = {completed: false};
    }
    base.magic_power.magic_containers = newSection3;
    return base;

}