import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardList } from '../cmps/workspace/board-list'
import { boardService } from "../services/board/board.service"
import { userService } from "../services/user.service"
import { addBoard, loadBoardMinis, updateMini } from '../store/board/board.action'
import { saveMiniBoard } from '../services/board/minis.service.js'

export const Workspace = () => {
    const [boards, setBoards] = useState(null)
    const dispatch = useDispatch()
    const { miniBoards } = useSelector(storeState => storeState.boardModule)
    const user = userService.getLoggedinUser()
    console.log(user)
    const userId = user._id
    const toggleStar = (board) => {
        board.isStarred = !board.isStarred
        dispatch(updateMini(board))
    }

    const onCreateNewBoard = async (newBoardInfo) => {
        newBoardInfo.lastVisit = Date.now()
        newBoardInfo.creator = user
        const newBoard = await dispatch(addBoard(newBoardInfo))
        console.log(newBoard)
    }

    useEffect(() => {
        loadMiniBoards()
    }, [])

    const loadMiniBoards = async () => {
        const miniBoards = await dispatch(loadBoardMinis())
        console.log(miniBoards)
        setBoards([...miniBoards])
    }

    if (!boards) return <React.Fragment></React.Fragment>
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList boards={boards} userId={userId} toggleStar={toggleStar} createNewBoard={onCreateNewBoard} />
    </section>
}

