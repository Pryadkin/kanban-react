export interface ITask {
    id: string,
    title: string,
}

export interface IBoard {
    id: string,
    title: string,
    lock: boolean,
    tasks: ITask[]
}
