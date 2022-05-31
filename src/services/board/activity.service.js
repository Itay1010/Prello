import { utilService } from "../basic/util.service";
import { userService } from "../user.service";

export const actService = {
    activity,
    activityTo,
    getTypes,
}

const LIMIT = 500

function activity(type, entityType, entity, board) {
    if (!type || !entityType || !entity || !board) throw new Error('No arguments givin')
    const id = entity.id ? entity.id : entity._id
    if (!id) throw new Error('Item is unknown')
    const user = userService.getLoggedinUser() || {
        color: "#41C559",
        email: "eytan133@gmail.com",
        firstName: "Eytan",
        imgUrl: "https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg",
        lastName: "Silberberg",
        password: "eytan",
        username: "eytan",
        _id: "u101"
    }
    const newActivity = {
        id: utilService.makeId(),
        action: type,
        receiver: entityType,
        createdAt: Date.now(),
        byMember: user,
        entity: { id: entity.id, title: entity.title }
    }
    if (board.activities.length >= LIMIT) {
        board.activities.splice(0, 1)
    }
    board.activities.push(newActivity)
    return board
}

function activityTo(type, entity, board) {
    if (!type || !entity || !board) throw new Error('No arguments givin')
    const id = entity.id ? entity.id : entity._id
    if (!id) throw new Error('Item is unknown')
    const user = userService.getLoggedinUser() || {
        color: "#41C559",
        email: "eytan133@gmail.com",
        firstName: "Eytan",
        imgUrl: "https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg",
        lastName: "Silberberg",
        password: "eytan",
        username: "eytan",
        _id: "u101"
    }
    const newActivity = {
        id: utilService.makeId(),
        txt: `${user.firstName} ${type} ${entity.title}`,
        createdAt: Date.now(),
        byMember: user,
        entity: { id: entity.id, title: entity.title }
    }
    if (board.activities.length >= LIMIT) {
        board.activities.splice(0, 1)
    }
    board.activities.push(newActivity)
    return board
}

function getTypes() {
    return ['added', 'deleted', 'changed', 'moved', 'completed']
}