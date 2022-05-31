import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardList } from '../cmps/workspace/board-list'
import { boardService } from "../services/board/board.service"
import { userService } from "../services/user.service"
import { loadBoardMinis } from '../store/board/board.action'

const boardFromService = [
    {
        _id: 'b101',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: true,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u103']
    }, {
        _id: 'b102',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: true,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u103']
    }, {
        _id: 'b103',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: true,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u103']
    }, {
        _id: 'b104',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: false,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u103']
    }, {
        _id: 'b105',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: false,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u103']
    }, {
        _id: 'b106',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: false,
        lastVisit: Date.now(),
        usersRelated: ['u100', 'u103']
    }, {
        _id: 'b107',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: false,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u104']
    }, {
        _id: 'b108',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&usqp=CAU',
        title: 'poop',
        isStarred: false,
        lastVisit: Date.now(),
        usersRelated: ['u102', 'u101']
    },
]
// console.log(boardAc)



export const Workspace = () => {
    const [boards, setBoards] = useState(null)
    const dispatch = useDispatch()
    // const { miniBoards } = useSelector(storeState => storeState.boardModule)
    const toggleStar = (board) => {
        board.isStarred = !board.isStarred
    }

    useEffect(() => {
        loadMiniBoards()
    }, [])
    const loadMiniBoards = async () => {
        const miniBoards = await dispatch(loadBoardMinis())
        console.log(miniBoards)
        setBoards([...miniBoards])
    }

    const user = userService.getLoggedinUser()
    const userId = user._id
    // const { userId } = user.userId
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList boards={boardFromService} userId={userId} toggleStar={toggleStar} />
    </section>
}