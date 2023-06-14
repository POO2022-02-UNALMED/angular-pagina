export interface IProyect {
    map(arg0: (i: any) => void): unknown;
    id: number;
    name: string;
    coworker: Array<ICoworker>;
    task: Array<ITask>;
}

export interface ICoworker{
    id:number;
    name: string;
    license: string,
    charge: string;
}

export interface ITask{
    id:number;
    fecha:string
    name: string;
    admin:number;
    user:Array<ICoworker>;
    description: string
}
