export type Licencias = 'USER' | 'ADMIN'

export interface ICardUser {
    map(arg0: (i: any) => void): unknown;
    id: number,
    avatar: string;
    name: string;
    gender: string;
    age: number;
    description: string;
    work?: number; //opcional
    license: Licencias;
    info: string
}