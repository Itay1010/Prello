import React, { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardList } from '../cmps/workspace/board-list'
import { userService } from "../services/user.service"
import { addBoard, loadBoardMinis, updateMini } from '../store/board/board.action'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const Workspace = () => {

    const history = useHistory()
    const [boards, setBoards] = useState(null)
    const dispatch = useDispatch()
    const user = userService.getLoggedinUser()
    const userId = user._id
    const toggleStar = async (board) => {
        board.isStarred = !board.isStarred
        await dispatch(updateMini(board))
        loadMiniBoards()
    }

    const onCreateNewBoard = async (newBoardInfo) => {
        // newBoardInfo.createdAt = Date.now()
        newBoardInfo.creator = user
        const newBoard = await dispatch(addBoard(newBoardInfo))
        history.push(`/board/${newBoard[0]._id}`)
    }

    useEffect(() => {
        loadMiniBoards()
    }, [])

    const loadMiniBoards = async () => {
        const miniBoards = await dispatch(loadBoardMinis())
        setBoards([...miniBoards])
    }

    if (!boards || !user) return <React.Fragment></React.Fragment>
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList boards={boards} userId={userId} toggleStar={toggleStar} createNewBoard={onCreateNewBoard} />
    </section>
}

