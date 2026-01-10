export interface ImagesSchema {
  logo: string;
  compass: string;
  map: string;
  boss_key: string;
  heart_piece: string;
  heart_container: string;
}

export interface StylingSchema {
  items?: number
  equipments?: Record<string, number>;
  health?: number;
  maps?: number;
  abilities?: Record<string, number>;
  collectibles?: Record<string, number>;
}

// =================================================

export type ItemsSchema = Record<string, ItemSchema>;

export interface ItemSchema {
  name: string;
  image?: string;
  completed: boolean;
}

// =================================================

export interface HealthSchema {
  info: {
    min: number;
    max: number;
  }
  heart_containers: Record<string, {
      name: string;
      completed: boolean;
    }>;
  heart_pieces: Record<string, {
      name: string;
      completed: boolean;
    }>;
  heart_pieces_list: string;
}

export interface MagicPowerSchema {
  info: {
    min: number;
    max: number;
  }
  magic_containers: Record<string, ItemSchema>;
}

// =================================================

export type QuestsSchema = Record<string, QuestSchema>;

export interface QuestSchema extends ItemSchema {
  name: string;
  image?: string;
  completed: boolean;
  hooks: string[];
}

export type DungeonKeys = 'compass' | 'map' | 'boss_key' | 'completed' | 'item' | 'boss';
export type DungeonsSchema = Record<string, DungeonSchema>;

export interface DungeonSchema {
  name: string;
  image: string;
  item: {
    name: string;
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

export interface GameDataSchema {
  id: string;
  title: string;
  images: ImagesSchema;
  styling: StylingSchema;
  health: HealthSchema;
  magic_power: MagicPowerSchema;
  items: ItemsSchema;
  equipments: GenericContainerSchema;
  dungeons: DungeonsSchema;
  side_quests: QuestsSchema;
  minigames: QuestsSchema;
  maps: ItemsSchema;
  abilities: GenericContainersSchema;
  collectibles: GenericContainersSchema;
}

// =================================================

export default GameDataSchema;
