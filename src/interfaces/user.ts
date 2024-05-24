export interface IPlayer {
  name: string;
  id: string;
}

export interface IRoom {
  name: string;
  id: number;
  players: IPlayer[];
}
