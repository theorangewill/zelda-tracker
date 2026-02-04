import GameDataSchema, { ItemSchema } from "../schemas/gameData";

type SectionPosition = "sidebar" | "main" | "bottom";

export default function applyCountableCollectibles(base: GameDataSchema): GameDataSchema {
    
    const positions: SectionPosition[] = ["sidebar", "main", "bottom"];

    for (const position of positions) {
        const source = base.countable_collectibles[position];
        if (!source) continue;

        for (const sectionKey of Object.keys(source)) {
            const section = source[sectionKey];

            const newSection: Record<string, ItemSchema> = {};

            for (let i = 0; i < section.total; i++) {
                newSection[`${section.key}_${i + 1}`] = {
                image: section.image,
                completed: false,
                };
            }

            // garante que o destino exista
            if (!base.collectibles[position]) {
                base.collectibles[position] = {};
            }

            if (!base.infos.collectibles) {
                base.infos.collectibles = {};
            }

            base.collectibles[position][sectionKey] = newSection;
            console.log(newSection)
            base.infos.collectibles[sectionKey] = section.info;
        }
    }

    return base;

}