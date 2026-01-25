export interface GameData {
    name: string;
    description: string;
    playing: any;
}

export interface GameResponse {
    data: GameData[];
}