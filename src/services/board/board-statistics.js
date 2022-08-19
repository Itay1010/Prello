import { boardService } from './board.service'

const WEEK_TIMESTAMP = 7 * 24 * 60 * 60 * 1000 //604800000
const DAY_TIMESTAMP = 86400000

export const boardStatistics = {
    getStatistics,
    hexToRgb

}

function getStatistics(board) {
    return {
        activity: _getActivityStats(board),
        datesToDisplay: _getDates(board),
        cardsPerMember: _getCardsByMember(board),
        unAssignedTasks: _getUnassignedTasksCount(board),
        cardsPerLabels: _getCardsByLabels(board),
        actsByMember: _getActByMember(board),
        checklists: _getChecklistCount(board),
        summary: _getCardsCount(board),
        membersCount: _getMemebersCount(board),
        groupsCount: board.groups.length
    }
}

function _getCardsCount(board) {
    if (!board) return ('waiting for board')
    const res = board.groups.reduce((acc, group) => {
        const count = {
            active: 0,
            archived: 0,
            groupCount: 0
        }

        group.tasks.forEach(task => {
            if (task.archivedAt) count.archived++
            else count.active++
        })

        if (acc.active) acc.active += count.active
        else acc.active = count.active

        if (acc.archived) acc.archived += count.archived
        else acc.archived = count.archived

        if (acc.groupCount) acc.groupCount++
        else acc.groupCount = 1


        return acc
    }, {})

    return res
}

function _getMemebersCount(board) {
    return board.members.length
}

function _getCardsByMember(board) {
    const res = board.groups.reduce((acc, group) => {
        const count = {}

        group.tasks.forEach(task => {
            for (let i = 0; i < task.members.length; i++) {
                if (!task.archivedAt) {
                    if (count[task.members[i]]) count[task.members[i]]++
                    else count[task.members[i]] = 1
                }
            }
        })

        for (const id in count) {
            if (acc[id]) acc[id] += count[id]
            else acc[id] = count[id]
        }

        return acc
    }, {})

    const resToDisplay = []
    for (const id in res) {
        if (id === 'unassigned') return
        const member = board.members.find(member => member._id === id)
        const memberStatistics = {
            firstName: member.firstName,
            lastName: member.lastName,
            color: member.color,
            id: member._id,
            tasksNum: res[id]
        }
        resToDisplay.push(memberStatistics)
    }

    resToDisplay.sort((a, b) => (a.tasksNum > b.tasksNum) ? -1 : ((b.tasksNum > a.tasksNum) ? 1 : 0))

    if (resToDisplay.length === board.members.length) return resToDisplay
    else {
        //ADD MEMBERS WITH NO TASKS
        return resToDisplay
    }

}

function _getUnassignedTasksCount(board) {
    const res = board.groups.reduce((acc, group) => {
        let count = 0

        group.tasks.forEach(task => {
            if (task.members.length === 0 && !task.archivedAt) count++
        })

        acc += count
        return acc
    }, 0)

    return res

}

function _getCardsByLabels(board) {
    const labels = boardService.getLabels()
    const res = labels.reduce((acc, label) => {
        let labelCount = 0
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.archivedAt) return
                if (task.labels?.length) {
                    if (task.labels.includes(label)) labelCount++
                }
            })
        })
        acc[label] = labelCount
        return acc
    }, {})
    return res
}

function _getActivityStats(board) {
    const currTimestamp = Date.now()
    const timeLimit = currTimestamp - WEEK_TIMESTAMP

    const lastWeekActivity = []
    board.activities.forEach(act => {
        // if (act.action !== 'moved' && act.createdAt >= timeLimit) lastWeekActivity.push(act)
        if (act.createdAt >= timeLimit) lastWeekActivity.push(act)
    })

    const res = [0, 0, 0, 0, 0, 0, 0]
    lastWeekActivity.forEach(act => {
        const dateTimestamp = new Date(act.createdAt)
        const day = dateTimestamp.getDay()
        const idx = _getIndex(day)
        res[idx]++

    })
    return res
}

function _getActByMember(board) {

    const res = board.members.reduce((acc, member) => {
        let count = 0
        board.activities.forEach(act => {
            if (act.byMember._id === member._id) count++
        })
        const actsForMember = {
            firstName: member.firstName,
            lastName: member.lastName,
            color: member.color,
            id: member._id,
            count
        }
        acc.push(actsForMember)
        return acc
    }, [])

    res.sort((a, b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0))

    return res

}

function _getChecklistCount(board) {
    let todos = 0
    let done = 0
    board.groups.forEach(group => {
        group.tasks.forEach(task => {
            if (task.checklist?.length) {
                task.checklist.forEach(cl => {
                    cl.items.forEach(item => {
                        todos++
                        if (item.isDone) done++
                    })
                })
            }
        })
    })
    const res = { todos, done }
    return res
}

function _getAttachsCount(board) {
    console.log(board);
}

function _getDates() {
    const today = new Date()
    let timestamp = today - WEEK_TIMESTAMP + DAY_TIMESTAMP

    const res = []
    for (let i = 0; i < 6; i++) {
        const date = new Date(timestamp)
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}`
        res.push(dateStr)
        timestamp += DAY_TIMESTAMP
    }
    res.push(`${today.getDate()}/${today.getMonth() + 1}`)
    return res
}

function hexToRgb(hex) {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(res[3], 16)}, 1)`

}

function _getIndex(day) {
    const now = new Date()
    const today = now.getDay()

    if (today - day > 0) return 6 - day
    else if (today - day < 0) return day - today - 1
    else return 6
}