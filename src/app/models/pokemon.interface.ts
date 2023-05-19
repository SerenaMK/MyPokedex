export interface Pokemon {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    abilities: string[],
    forms: string[],
    game_indices: string[],
    held_items: string[]

    // UNFINISHED
}
