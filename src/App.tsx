/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
import {useEffect, useState} from 'react'

import './App.css'

const App = () => {
    const [boards, setBoards] = useState([
        {
            id: '1sdfsf',
            title: 'Сделать',
            lock: false,
            items: [
                {
                    id: 118902,
                    title: 'пойти в магазин',
                },
                {
                    id: 289012,
                    title: 'выкинуть мусор',
                },
                {
                    id: 3123123,
                    title: 'покушать',
                },
            ],
        },
        {
            id: 'sdvsv2',
            title: 'Проверить',
            lock: true,
            items: [
                {
                    id: 1123,
                    title: 'пойти в магазин2',
                },
                {
                    id: 1231232,
                    title: 'выкинуть мусор2',
                },
                {
                    id: 78998,
                    title: 'покушать2',
                },
            ],
        },
        {
            id: 'vsdvsdvsve',
            title: 'Сделано',
            lock: false,
            items: [],
        },
    ])

    const [currentBoard, setCurrentBoard] = useState<any>()
    const [currentItem, setCurrentItem] = useState<any>()

    const handleDragOver = (e: any) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const handleDragLeave = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const handleDragStart = (e: any, board: any, item: any) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const handleDragEnd = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const handleDrop = (e: any, board: any, item: any) => {
        e.preventDefault()
        e.stopPropagation()

        console.log('!board.lock', !board.lock)

        if (!board.lock) {
            const currentIndex = currentBoard?.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            const dropIndex = board?.items.indexOf(item)
            board.items.splice(dropIndex + 1, 0, currentItem)
        }

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    const handleCardDrop = (e: any, board: any) => {
        e.stopPropagation()

        if (!board.lock) {
            const currentIndex = currentBoard?.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)

            board.items.push(currentItem)
        }

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    return (
        <div className="app">
            {boards.map((board: any) => (
                <div
                    key={board.id}
                    onDragOver={e => handleDragOver(e)}
                    onDrop={e => handleCardDrop(e, board)}
                    className="board"
                >
                    <div className="border_title">{board.title}</div>
                    {board.items.map((item: any) => (
                        <div
                            key={item.id}
                            onDragOver={e => handleDragOver(e)}
                            onDragLeave={e => handleDragLeave(e)}
                            onDragStart={e => handleDragStart(e, board, item)}
                            onDragEnd={e => handleDragEnd(e)}
                            onDrop={e => handleDrop(e, board, item)}
                            draggable
                            className="item"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default App
