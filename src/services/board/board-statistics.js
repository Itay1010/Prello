const WEEK_TIMESTAMP = 7 * 24 * 60 * 60 * 1000 //604800000
const DAY_TIMESTAMP = 86400000

export const boardStatistics = {
    getCardsCount,
    getCardsByMember,
    getActivityStats,
    getDates

}

function getCardsCount(board) {
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

function getCardsByMember(board) {
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
        console.log(res[id]);
        const member = board.members.find(member => member._id === id)
        const memberStatistics = {
            name: member.firstName,
            imgUrl: member.imgUrl,
            tasksNum: res[id]
        }
        resToDisplay.push(memberStatistics)
    }

    return resToDisplay
}

function getActivityStats(board) {
    const currTimestamp = Date.now()
    const timeLimit = currTimestamp - WEEK_TIMESTAMP

    const lastWeekActivity = []
    board.activities.forEach(act => {
        if (act.action !== 'moved' && act.createdAt >= timeLimit) lastWeekActivity.push(act)
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
getDates()
function getDates() {
    const today = new Date()
    let timestamp = today - WEEK_TIMESTAMP

    const res = []
    for (let i = 0; i < 7; i++) {
        const date = new Date(timestamp)
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}`
        res.push(dateStr)
        timestamp += DAY_TIMESTAMP
    }

    return res
}

function _getIndex(day) {
    const now = new Date()
    const today = now.getDay()

    if (today - day > 0) return 6 - day
    else if (today - day < 0) return day - today - 1
    else return 6
}