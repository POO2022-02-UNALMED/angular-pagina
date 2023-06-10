export type Gender = "F" | "M";

export interface IResponse {
    id: number;
    name: string;
    email: string;
    age: number;
    description: string;
    avatar: string;
    work?:string
    gender?: Gender;
    info: String
}
