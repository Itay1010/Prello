export const boardStatistics = {
    getCardsCount,
    getCardsByMember,
    getActivityStats

}

function getCardsCount(board) {
    if (!board) return ('waiting for board')
    const res = board.groups.reduce((acc, group) => {
        const count = {
            active: 0,
            archived: 0
        }

        group.tasks.forEach(task => {
            if (task.archivedAt) count.archived++
            else count.active++
        })

        if (acc.active) acc.active += count.active
        else acc.active = count.active

        if (acc.archived) acc.archived += count.archived
        else acc.archived = count.archived

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
                // } else console.log('no member assinged to: ', task.title)
            }
        })

        for (const id in count) {
            if (acc[id]) acc[id] += count[id]
            else acc[id] = count[id]
        }

        return acc
    }, {})

    console.log('res', res);

    const resToDisplay = []

    for (const id in res) {
        const member = board.members.find(member => member._id === id)
        const memberStatistics = {
            name: member.firstName,
            imgUrl: member.imgUrl,
            tasksNum: res.id
        }
        resToDisplay.push(memberStatistics)
    }

    console.log('resToDisplay', resToDisplay);
}

function getActivityStats(board) {
    // console.log(board);
    const currTimestamp = Date.now()
    const WEEK_TIMESTAMP = 7 * 24 * 60 * 60 * 1000  //604800000

    const timeLimit = currTimestamp - WEEK_TIMESTAMP

    const lastWeekActivity = []
    board.activities.forEach(act => {
        if (act.action !== 'moved' && act.createdAt >= timeLimit) lastWeekActivity.push(act)
    })
    // console.log('lastWeekActivity', lastWeekActivity);

    const res = {}
    lastWeekActivity.forEach(act => {
        // console.log(act.createdAt)
        const date = new Date()
        const day = date.getDay()
        // console.log(day);
    })

    // console.log(res);


}
