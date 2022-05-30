import { utilService } from "../basic/util.service";
import { userService } from "../user.service";

export const actService = {
    activity,
    activityIn,
    getTypes,
}


function activity(type, entityType, entity, board) {
    if (!type || !entityType || !entity || !board) throw new Error('No arguments givin')
    const user = userService.getLoggedinUser()
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

function activityIn(type, entityType, entity, board) {
    if (!type || !entityType || !entity || !board) throw new Error('No arguments givin')
    const user = userService.getLoggedinUser()
    const newActivity = {
        id: utilService.makeId(),
        txt: `${user.firstName} ${type} in ${entityType} ${entity.title}`,
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