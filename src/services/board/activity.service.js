import { utilService } from "../basic/util.service";
import { userService } from "../user.service";

export const actService = {
    activity,
    activityTo,
    getTypes,
}


function activity(type, entityType, entity, board) {
    if (!type || !entityType || !entity || !board) throw new Error('No arguments givin')
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
    const id = entity.id ? entity.id : entity._id
    if (!id) throw new Error('Item is unknown')
    const newActivity = {
        id: utilService.makeId(),
        txt: `${user.firstName} ${type} ${entityType} ${entity.title}`,
        createdAt: Date.now(),
        byMember: user,
        entity: { id: entity.id, title: entity.title }
    }
    board.activities.push(newActivity)
    return board
}

function activityTo(type, entity, board) {
    if (!type || !entity || !board) throw new Error('No arguments givin')
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
    const id = entity.id ? entity.id : entity._id
    const newActivity = {
        id: utilService.makeId(),
        txt: `${user.firstName} ${type} ${entity.title}`,
        createdAt: Date.now(),
        byMember: user,
        entity: { id: entity.id, title: entity.title }
    }
    board.activities.push(newActivity)
    return board
}

function getTypes() {
    return ['added', 'deleted', 'changed', 'moved', 'completed']
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