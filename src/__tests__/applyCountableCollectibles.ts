// applyCountableCollectibles.test.ts

import { GameDataSchema } from "../schemas/gameData";
import applyCountableCollectibles from "../utils/applyCountableCollectibles";

describe("applyCountableCollectibles", () => {
  it("creates countable collectibles for a section", () => {
    const base = {
      countable_collectibles: {
        sidebar: {
          coins: {
            name: "Coin",
            image: "coin.png",
            total: 3,
          },
        },
      },
      collectibles: {},
    } as unknown as GameDataSchema;

    const result = applyCountableCollectibles(base);

    expect(result.collectibles.sidebar?.coins).toEqual({
      coins_1: {
        name: "Coin 1",
        image: "coin.png",
        completed: false,
      },
      coins_2: {
        name: "Coin 2",
        image: "coin.png",
        completed: false,
      },
      coins_3: {
        name: "Coin 3",
        image: "coin.png",
        completed: false,
      },
    });
  });

  it("handles multiple positions independently", () => {
    const base = {
      countable_collectibles: {
        sidebar: {
          gems: {
            name: "Gem",
            image: "gem.png",
            total: 2,
          },
        },
        main: {
          stars: {
            name: "Star",
            image: "star.png",
            total: 1,
          },
        },
      },
      collectibles: {},
    } as unknown as GameDataSchema;

    applyCountableCollectibles(base);

    expect(base.collectibles.sidebar?.gems).toHaveProperty("gems_1");
    expect(base.collectibles.sidebar?.gems).toHaveProperty("gems_2");

    expect(base.collectibles.main?.stars).toHaveProperty("stars_1");
  });

  it("does nothing when countable_collectibles position is missing", () => {
    const base = {
      countable_collectibles: {},
      collectibles: {},
    } as unknown as GameDataSchema;

    applyCountableCollectibles(base);

    expect(base.collectibles).toEqual({});
  });

  it("does not overwrite existing collectibles in other positions", () => {
    const base = {
      countable_collectibles: {
        bottom: {
          relics: {
            name: "Relic",
            image: "relic.png",
            total: 1,
          },
        },
      },
      collectibles: {
        sidebar: {
          existing: {
            item_1: {
              name: "Existing",
              image: "x.png",
              completed: true,
            },
          },
        },
      },
    } as unknown as GameDataSchema;

    applyCountableCollectibles(base);

    expect(base.collectibles.sidebar?.existing).toBeDefined();
    expect(base.collectibles.bottom?.relics).toBeDefined();
  });

  it("returns the same base object (mutates in place)", () => {
    const base = {
      countable_collectibles: {
        main: {
          tokens: {
            name: "Token",
            image: "token.png",
            total: 2,
          },
        },
      },
      collectibles: {},
    } as unknown as GameDataSchema;

    const result = applyCountableCollectibles(base);

    expect(result).toBe(base);
  });

  it("creates empty sections when total is zero", () => {
    const base = {
      countable_collectibles: {
        sidebar: {
          empty: {
            name: "Empty",
            image: "empty.png",
            total: 0,
          },
        },
      },
      collectibles: {},
    } as unknown as GameDataSchema;

    applyCountableCollectibles(base);

    expect(base.collectibles.sidebar?.empty).toEqual({});
  });
});
