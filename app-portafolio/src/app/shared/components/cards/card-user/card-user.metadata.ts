export interface ICardUser {
    map(arg0: (i: any) => void): unknown;
    id: number,
    avatar: string;
    name: string;
    gender: string;
    age: number;
    description: string;
    work?: string; //opcional
    info: string
}