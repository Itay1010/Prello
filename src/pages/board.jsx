//basic
import React from "react"
import { connect } from 'react-redux'

//libs
import { DragDropContext } from 'react-beautiful-dnd'

//services
import { boardService } from "../services/board/board.service"

//private
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardHeader } from "../cmps/board/board-header/board-header"

import { clearBoard, loadBoard, updateBoard } from "../store/board/board.action"
import { utilService } from "../services/basic/util.service"
import { Switch, Route } from 'react-router-dom'

// Routes
import { TaskDetails } from './task-details.jsx'
import { GroupList } from "../cmps/board/group-list"
import { actService } from "../services/board/activity.service"
import { Dashboard } from "./dashboard"
import { socketService, SOCKET_EMIT_TOPIC, SOCKET_EVENT_BOARD_UPDATE, SOCKET_EMIT_PULL } from "../services/basic/socket.service"
import { loadGuest, setUser } from "../store/user/user.actions"
import { userService } from "../services/user.service"
import { boardStatistics } from "../services/board/board-statistics"
import { SideMenu } from "../cmps/board/board-header/side-menu"

const tinycolor = require("tinycolor2")

class _Board extends React.Component {

    state = {
        isSideMenuOpen: false,
        isBackgroundModalOpen: false
    }

    componentDidMount() {
        this._loadUser()
        this._setBoard()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
            this._setBoard()
        }
        this.setTheme()
    }

    componentWillUnmount(nextProps, nextState) {
        document.querySelector('#root').style.background = 'initial'
        socketService.off(SOCKET_EVENT_BOARD_UPDATE)
    }

    deepCloneBoard = () => {
        const { board } = this.props
        return JSON.parse(JSON.stringify(board))
    }

    _loadUser = () => {
        const { loggedinUser, loadGuest, setUser } = this.props
        const userFromStorage = userService.getLoggedinUser() || null
        if (!loggedinUser && !userFromStorage) loadGuest()
        else setUser(userFromStorage)
    }

    _setupSockets = () => {
        const { board } = this.props
        socketService.emit(SOCKET_EMIT_TOPIC, board._id)
        socketService.on(SOCKET_EVENT_BOARD_UPDATE, this._updateBoard)
    }

    _setBoard = async () => {
        const { boardId } = this.props.match.params
        try {
            await this.props.loadBoard(boardId)
            this._setupSockets()
        } catch (err) {
            console.error('error in setting board', err)
        }
    }

    _updateBoard = async () => {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    setTheme = async () => {
        const boardStyle = this.props.board.style || null
        if (boardStyle?.backgroundColor) {
            document.querySelector('.board').style.backgroundColor = boardStyle.backgroundColor
        }
        if (boardStyle?.background) {
            const avgColor = await boardService.calcAvgColor(boardStyle.background)
            const isDark = tinycolor(avgColor).isDark()
            utilService.setDynamicColors(isDark, avgColor)
            document.querySelector('#root').style.background = `url(${boardStyle.background})`
        }
    }
    
    setBackgroundImgFromUnsplash = async (url) => {
        const newBoard = this.deepCloneBoard()
        newBoard.style.background = url
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onAddTask = async (newTask) => {
        if (!newTask.title) return
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === newTask.groupId)

        newTask = {
            id: utilService.makeId(),
            title: newTask.title,
            style: { backgroundImg: '', bgColor: '', size: '', },
            members: [],
            attachments: [],
            labels: [],
            checklist: []
        }
        newBoard.groups[groupIdx].tasks.push(newTask)
        actService.activity('added', 'card,', newTask, newBoard)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onArchiveTask = async ({ taskId, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        var archivedTask
        newBoard.groups[groupIdx].tasks.map(task => {
            if (task.id === taskId) {
                task.archivedAt = Date.now()
                archivedTask = task
            }
        })
        actService.activity('archived', 'card', archivedTask, newBoard)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onArchiveGroup = async (groupId) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        var archivedGroup
        newBoard.groups.map(group => {
            if (group.id === groupId) {
                group.archivedAt = Date.now()
                archivedGroup = group
            }
        })
        actService.activity('archived', 'group', archivedGroup, newBoard)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onGroupChange = async ({ txt, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        if (newBoard.groups[groupIdx].title === txt) return

        newBoard.groups[groupIdx].title = txt
        actService.activity('changed title', 'group', newBoard.groups[groupIdx], newBoard)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onGroupColorChange = async (groupId, color) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        newBoard.groups[groupIdx].color = color
        actService.activity('changed color', 'group', newBoard.groups[groupIdx], newBoard)

        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onAddGroup = async (title) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const newGroup = { id: utilService.makeId(), title, tasks: [] }
        newBoard.groups.push(newGroup)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    handleOnDragEnd = async (result) => {
        if (!result.destination) return
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))

        if (result.type === 'groups') {
            const items = newBoard.groups
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            await this.props.updateBoard(newBoard)
            socketService.emit(SOCKET_EMIT_PULL, newBoard._id)

        } else {
            const items = newBoard.groups.find(group => group.id === result.source.droppableId).tasks
            const { droppableId: desDroppableId, index: desIdx } = result.destination
            const { droppableId: SrcDroppableId, index: SrcIdx } = result.source
            const [reorderedItem] = items.splice(SrcIdx, 1)
            newBoard.groups.find(group => group.id === desDroppableId).tasks.splice(desIdx, 0, reorderedItem)
            if (!(desDroppableId === SrcDroppableId) || !(desIdx === SrcIdx)) {
                actService.activity('moved', 'card', reorderedItem, newBoard)
            }
            await this.props.updateBoard(newBoard)
            socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
        }
    }

    onSaveBoardHeader = async (newBoardHeader) => {
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))
        newBoard.title = newBoardHeader
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onChangeMembers = async (newUser) => {
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))
        if (newBoard.members.some(member => member._id === newUser._id)) {
            newBoard.members = newBoard.members.filter(member => member._id !== newUser._id)
            this.clearMember(newUser._id, newBoard)
        }
        else newBoard.members.push(newUser)
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    clearMember = (userId, board) => {

        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                task.members.some((memberId, idx) => {
                    if (memberId === userId) task.members.splice(idx, 1)
                })
            })
        })
    }

    onStarBoard = async () => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        newBoard.isStarred = !newBoard.isStarred
        await this.props.updateBoard(newBoard)
        socketService.emit(SOCKET_EMIT_PULL, newBoard._id)
    }

    onToggleSideMenu = (state) => {
        this.setState({ isSideMenuOpen: state })
    }

    toggleBackgroundPickerModal = (state) => {
        this.setState({ isBackgroundModalOpen: state })
    }

    render() {
        const { board } = this.props
        if (!board) return <div>loading...</div>
        // if (board) boardStatistics.getActivityStats(board)
        const { groups } = board
        const eventHandlers = {
            onAddTask: this.onAddTask,
            onArchiveTask: this.onArchiveTask,
            onGroupChange: this.onGroupChange,
            onAddGroup: this.onAddGroup,
            onArchiveGroup: this.onArchiveGroup,
            onGroupColorChange: this.onGroupColorChange
        }

        return <React.Fragment>
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                <MainHeader boardMembers={board.members} isBoardStarred={board.isStarred} />
                <section className="board flex col main-layout">
                    <BoardHeader
                        board={board}
                        saveBoardHeader={this.onSaveBoardHeader}
                        setBackgroundImg={this.setBackgroundImgFromUnsplash}
                        onChangeMembers={this.onChangeMembers}
                        starBoard={this.onStarBoard}
                        openSideMenu={this.onToggleSideMenu}
                    />
                    <GroupList groups={groups} eventHandlers={eventHandlers} />
                    <SideMenu
                        isSideMenuOpen={this.state.isSideMenuOpen}
                        closeSideMenu={this.onToggleSideMenu}
                        openBackgroundPickerModal={this.toggleBackgroundPickerModal}
                        setBackgroundImg={this.setBackgroundImgFromUnsplash}
                    />
                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'}>
                            <TaskDetails onArchiveTask={this.onArchiveTask} />
                        </Route>
                        <Route path={'/board/:boardId/dashboard'}>
                            <Dashboard board={this.props.board} />
                        </Route>
                    </Switch>
                </section>
            </DragDropContext>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        loggedinUser: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    clearBoard,
    loadGuest,
    setUser
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)
