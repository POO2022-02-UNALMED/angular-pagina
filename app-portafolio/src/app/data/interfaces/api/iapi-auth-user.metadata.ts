export interface IApiUserAutentificated {
    fullname: string;
    token: string;
    avatar: string;
}

export interface ICompleteUser {
    id: number;
    name: string;
    email: string;
    age: number;
    description: string;
    avatar: string;
    work: number;
    gender: string;
    info: string;
    password: string;
    license: string;
    isActive: boolean;

}
