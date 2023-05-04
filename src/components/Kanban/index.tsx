import {useState} from 'react'

import {IBoard, ITask} from '../../types'
import {Board} from '../Board'

import styles from './Kanban.module.scss'

export const Kanban = () => {
    const [boards, setBoards] = useState<IBoard[]>([
        {
            id: '1sdfsf',
            title: 'Сделать',
            lock: false,
            tasks: [
                {
                    id: '118902',
                    title: 'пойти в магазин',
                },
                {
                    id: '289012',
                    title: 'выкинуть мусор',
                },
                {
                    id: '3123123',
                    title: 'покушать',
                },
            ],
        },
        {
            id: 'sdvsv2',
            title: 'Проверить',
            lock: false,
            tasks: [
                {
                    id: '1123',
                    title: 'пойти в магазин2',
                },
                {
                    id: '1231232',
                    title: 'выкинуть мусор2',
                },
                {
                    id: '78998',
                    title: 'покушать2',
                },
            ],
        },
        {
            id: 'vsdvsdvsve',
            title: 'Сделано',
            lock: false,
            tasks: [],
        },
    ])

    const [currentBoard, setCurrentBoard] = useState<IBoard>(boards[0])
    const [currentTask, setCurrentTask] = useState<ITask>(boards[0].tasks[0])

    return (
        <div className={styles.wrapper}>
            {boards.map((board: any) => (
                <Board
                    board={board}
                    boards={boards}
                    currentBoard={currentBoard}
                    currentTask={currentTask}
                    onSetCurrentBoard={setCurrentBoard}
                    onSetCurrentTask={setCurrentTask}
                    onSetBoards={setBoards}
                />
            ))}
        </div>
    )
}
