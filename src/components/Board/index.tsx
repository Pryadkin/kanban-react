import {IBoard, ITask} from '../../types'

import styles from './Board.module.scss'

interface Props {
    board: IBoard,
    boards: IBoard[],
    currentBoard: IBoard,
    currentTask: ITask,
    onSetCurrentBoard: (value: any) => void
    onSetCurrentTask: (value: any) => void
    onSetBoards: (value: any) => void,
}

export const Board = ({
    board,
    boards,
    currentBoard,
    currentTask,
    onSetCurrentBoard,
    onSetCurrentTask,
    onSetBoards,
}: Props) => {
    const handleDragOver = (e: any) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const handleDragLeave = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const handleDragStart = (brd: IBoard, task: ITask) => {
        onSetCurrentBoard(brd)
        onSetCurrentTask(task)
    }

    const handleDragEnd = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, brd: IBoard, task: ITask) => {
        e.preventDefault()
        e.stopPropagation()

        const elem: HTMLDivElement = e.target as HTMLDivElement

        if (!brd.lock) {
            const currentIndex = currentBoard?.tasks.indexOf(currentTask)
            currentBoard.tasks.splice(currentIndex, 1)
            const dropIndex = brd?.tasks.indexOf(task)
            brd.tasks.splice(dropIndex + 1, 0, currentTask)
        }

        onSetBoards(boards.map(b => {
            if (b.id === brd.id) {
                return brd
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

        elem.style.boxShadow = 'none'
    }

    const handleCardDrop = (e: React.DragEvent<HTMLDivElement>, brd: IBoard) => {
        e.stopPropagation()

        const elem: HTMLDivElement = e.target as HTMLDivElement

        if (!brd.lock) {
            const currentIndex = currentBoard?.tasks.indexOf(currentTask)
            currentBoard.tasks.splice(currentIndex, 1)

            brd.tasks.push(currentTask)
        }

        onSetBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        elem.style.boxShadow = 'none'
    }

    return (
        <div
            key={board.id}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleCardDrop(e, board)}
            className={styles.board}
        >
            <div className={styles.borderTitle}>{board.title}</div>
            {board.tasks.map(task => (
                <div
                    key={task.id}
                    onDragOver={e => handleDragOver(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragStart={() => handleDragStart(board, task)}
                    onDragEnd={e => handleDragEnd(e)}
                    onDrop={e => handleDrop(e, board, task)}
                    draggable
                    className={styles.task}
                >
                    {task.title}
                </div>
            ))}
        </div>
    )
}
