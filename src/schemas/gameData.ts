export interface ImagesSchema {
  logo: string;
  compass: string;
  map: string;
  boss_key: string;
  heart_piece: string;
  heart_container: string;
}

export interface SectionsSchema {
  items?: string
  equipments?: Record<string, string>;
  health?: string;
  maps?: string;
  abilities?: Record<string, string>;
  collectibles?: Record<string, string>;
  countable_collectibles?: Record<string, string>;
}

// =================================================

export type ItemsSchema = Record<string, ItemSchema>;

export interface ItemSchema {
  image?: string;
  completed: boolean;
}

// =================================================

export interface HealthSchema {
  info: {
    min: number;
    max: number;
    heart_cointainers_total: number;
    heart_pieces_total: number;
    heart_pieces_list: string;
  }
  heart_containers?: Record<string, {
      completed: boolean;
    }>;
  heart_pieces?: Record<string, {
      completed: boolean;
    }>;
}

export interface MagicPowerSchema {
  info: {
    min: number;
    max: number;
    magic_containers_total: number;
  }
  magic_containers?: Record<string, {
      completed: boolean;
    }>;
}

// =================================================

export type QuestsSchema = Record<string, QuestSchema>;

export interface QuestSchema extends ItemSchema {
  image?: string;
  completed: boolean;
  hooks: string[];
}

export type DungeonKeys = 'compass' | 'map' | 'boss_key' | 'completed' | 'item' | 'boss';
export type DungeonsSchema = Record<string, DungeonSchema>;

export interface DungeonSchema {
  image: string;
  item: {
    key: string;
    completed: boolean;
    hooks: string[];
  }
  compass: boolean;
  map: boolean;
  boss_key: boolean;
  boss: {
    image: string;
    completed: boolean;
    hooks: string[];
  }
  completed: boolean;
  hooks: string[];
}

// =================================================

export type GenericContainerSchema = Record<string, Record<string, ItemSchema>>;


export interface GenericContainersSchema {
  sidebar?: GenericContainerSchema;
  main?: GenericContainerSchema;
  bottom?: GenericContainerSchema;
}

// =================================================

export interface CountableItemSchema {
  key: string;
  image: string;
  info: string;
  total: number;
}

export type CountableCollectibleSchema = Record<string, CountableItemSchema>;


export interface CountableCollectiblesSchema {
  sidebar?: CountableCollectibleSchema;
  main?: CountableCollectibleSchema;
  bottom?: CountableCollectibleSchema;
}
// =================================================

export interface GameDataSchema {
  id: string;
  title: string;
  images: ImagesSchema;
  styling: SectionsSchema;
  infos: SectionsSchema;
  health: HealthSchema;
  magic_power: MagicPowerSchema;
  items: ItemsSchema;
  equipments: GenericContainerSchema;
  dungeons: DungeonsSchema;
  quests: QuestsSchema;
  minigames: QuestsSchema;
  maps: ItemsSchema;
  abilities: GenericContainersSchema;
  collectibles: GenericContainersSchema;
  countable_collectibles: CountableCollectiblesSchema;
}

// =================================================

export default GameDataSchema;
