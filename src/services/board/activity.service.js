import { utilService } from "../basic/util.service";
import { userService } from "../user.service";

export const actService = {
    activity,
    addToBoard: memberToBoard,
    getTypes
}

function activity(newActivity, board, dispatch) {
    if (!newActivity || !board || !dispatch) throw new Error('No arguments givin')
    const user = userService.getLoggedinUser()
    const { type, task } = newActivity
    newActivity = {
        id: utilService.makeId(),
        type,
        createdAt: Date.now(),
        byMember: user,
        task: { id: task.id, title: task.title }
    }
    board.activities.push(newActivity)
    dispatch(board)
}

function memberToBoard(task, board, dispatch) {
    if (!task || !board || !dispatch) throw new Error('No arguments givin')
    const user = userService.getLoggedinUser()
    const { id, title } = task
    const newActivity = {
        id: utilService.makeId(),
        type: 'MEMBER_TO_BOARD',
        createdAt: Date.now(),
        byMember: user,
        task: { id: task.id, title: task.title }
    }
    board.activities.push(newActivity)
    dispatch(board)
}

function memberToTask(task, board, dispatch) {
    if (!task || !board || !dispatch) throw new Error('No arguments givin')
    const user = userService.getLoggedinUser()
    const { id, title } = task
    const newActivity = {
        id: utilService.makeId(),
        type: 'MAMBER_TO_TASK',
        createdAt: Date.now(),
        byMember: user,
        task: { id: task.id, title: task.title }
    }
    board.activities.push(newActivity)
    dispatch(board)
}

function getTypes() {
    return ['ADD_TO_BOARD']
}


// {
//     "id": "a101",
//     "type": "Added Task",
//     "createdAt": 154514,
//     "byMember": {
//         "_id": "u104",
//         "firstName": "Idan",
//         "lastName": "Gez",
//         "imgUrl": "https://media-exp1.licdn.com/dms/image/C4E03AQHS2IrCTjh7kQ/profile-displayphoto-shrink_800_800/0/1645011912408?e=1658966400&v=beta&t=ztcm1v1QLUsANcPVcXF8c-2icQB51oLyQ5hgK5sn-VQ"
//     },
//     "task": {
//         "id": "c101",
//         "title": "Replace Logo"
//     }
// }