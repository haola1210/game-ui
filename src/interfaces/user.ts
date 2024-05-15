export interface IUser {
  name: string;
  id: string;
}

export interface IRoom {
  name: string;
  id: string;
  users: IUser[];
}
