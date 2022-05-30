import React from "react"
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardList } from '../cmps/workspace/board-list'
import { boardService } from "../services/board/board.service"
import { userService } from "../services/user.service"

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



export const Workspace = () => {

    const toggleStar = (board) => {
        board.isStarred = !board.isStarred
        console.log(board.isStarred)
    }

    const user = userService.getLoggedinUser()
    const userId = user._id
    // const { userId } = user.userId
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList boards={boardFromService} userId={userId} toggleStar={toggleStar} />
    </section>
}