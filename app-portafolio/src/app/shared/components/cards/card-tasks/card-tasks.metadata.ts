export interface IProyect {
    map(arg0: (i: any) => void): unknown;
    id: number;
    name: string;
    description:string;
    coworker: Array<ICoworker>;
    task: Array<ITask>;
}

export interface ICoworker{
    id:number;
    name: string;
    is_Admin: boolean,
    description: string;
    avatar: string;
    id_Proyect:number;
    age:number;
    gender:string
}

export interface ITask{
    id:number;
    date:string;
    chek: boolean,
    name: string;
    id_Proyect:number;
    users:Array<any>;
    description: string
}
