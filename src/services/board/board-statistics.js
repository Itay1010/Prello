const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;
const WEEK_TIMESTAMP = DAY_TIMESTAMP * 7;

export const boardStatistics = {
    getStatistics
}

function getStatistics(board) {
    return {
        summary: _getSummary(board),
        activity: _getActyivity(board),
        members: _getMembersStat(board),
        cards: _getCardsStat(board)
    }
}

function _getSummary(board) {
    return {
        members: board.members.length,
        groups: board.groups.length,
        active: _getCardsCount(board).active,
        unassigned: _getCardsCount(board).unassigned
    }
}

function _getActyivity(board) {
    return {
        chart: {
            data: _getActivityData(board).data,
            dates: _getDates()
        },
        total: _getActivityData(board).total,
        avg: _getActivityData(board).avg
    }
}

function _getMembersStat(board) {
    return {
        activities: _getActsByMember(board),
        cards: _getCardsByMember(board),
        unassigned: _getUnassignedTasksCount(board)
    }
}

function _getCardsStat(board) {
    return {
        checklist: _getChecklistCount(board),
        labels: _getCardsByLabels(board)
    }
}

function _getCardsCount(board) {
    return board.groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            if (!task.archivedAt) acc.active++
            if (!task.archivedAt && !task.members.length) acc.unassigned++
        })
        return acc
    }, { active: 0, unassigned: 0 })
}

function _getActivityData(board) {
    const currTimestamp = Date.now();
    const timeLimit = currTimestamp - WEEK_TIMESTAMP;

    const lastWeekActivities = board.activities.filter(act => act.createdAt >= timeLimit);

    const res = {};
    let total = 0;
    for (let act of lastWeekActivities) {
        const actDate = new Date(act.createdAt);
        const idxOrder = _getIndex(actDate.getDay());
        res[idxOrder] = (res[idxOrder] || 0) + 1;
        total++;
    }

    for (let i = 0; i < 7; i++) {
        if (!res[i]) res[i] = 0;
    }

    return {
        data: Object.values(res),
        total,
        avg: (total / 7).toFixed()
    }
}

function _getActsByMember(board) {

    const actsMap = board.activities.reduce((acc, act) => {
        if (acc[act.byMember._id]) acc[act.byMember._id]++
        else acc[act.byMember._id] = 1
        return acc
    }, {});


    return board.members.map(member => {
        return {
            member: member.firstName + ' ' + member.lastName,
            color: member.color,
            count: actsMap[member._id] || 0
        }
    }).sort((a, b) => a.count - b.count);
}

function _getCardsByMember(board) {
    const cardsMap = {}
    board.groups.forEach(group => {
        group.tasks.forEach(task => {
            task.members.forEach(member => {
                cardsMap[member] = (cardsMap[member] || 0) + 1;
            })
        })
    })

    return board.members.map(member => {
        return {
            member: member.firstName + ' ' + member.lastName,
            color: member.color,
            tasksCount: cardsMap[member._id] || 0
        }
    })
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

function _getChecklistCount(board) {
    return board.groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            if (task.checklist?.length) {
                task.checklist.forEach(list => {
                    list.items.forEach(item => {
                        acc.todos++
                        if (item.isDone) acc.done++
                    })
                })
            }
        })

        return acc
    }, { todos: 0, done: 0 })
}

function _getCardsByLabels(board) {
    return board.groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            if (task.labels?.length) {
                task.labels.forEach(label => {
                    acc[label] = (acc[label] || 0) + 1
                })
            }
        })
        return acc
    }, {})
}

function _getIndex(day) {
    const now = new Date();
    const today = now.getDay();

    if (today - day > 0) return 6 - day;
    else if (today - day < 0) return day - today - 1;
    else return 6;
}

function _getDates() {
    const today = new Date()
    let timestamp = today - WEEK_TIMESTAMP + DAY_TIMESTAMP

    const res = []
    for (let i = 0; i < 7; i++) {
        const date = new Date(timestamp)
        res.push(`${date.getDate()}/${date.getMonth() + 1}`)
        timestamp += DAY_TIMESTAMP
    }

    return res
}