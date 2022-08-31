let g7DaysActivities = [];
let gTasks = [];

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;
const WEEK_TIMESTAMP = DAY_TIMESTAMP * 7;
const currTimestamp = Date.now();
const timeLimit = currTimestamp - WEEK_TIMESTAMP;


export const boardStatistics = {
    getStatistics
}

function getStatistics(board) {
    g7DaysActivities = board.activities.filter(act => act.createdAt >= timeLimit);
    board.groups.forEach(group => {
        group.tasks.forEach(task => gTasks.push(task))
    });

    return {
        summary: getSummary(board),
        activities: getActivities(),
        members: getMembersStat(board),
        cards: getCardsStat()
    };
}

function getSummary(board) {
    return {
        members: board.members.length,
        groups: board.groups.length,
        active: _getCardsCount().active,
        unassigned: _getCardsCount().unassigned
    };
}

function getActivities() {
    return {
        chart: {
            data: _getActivityData().data,
            dates: _getDates()
        },
        total: _getActivityData().total,
        avg: _getActivityData().avg
    };
}

function getMembersStat(board) {
    return {
        activities: _getActsByMember(board),
        cards: _getCardsByMember(board),
        unassigned: _getUnassignedTasksCount()
    };
}

function getCardsStat() {
    return {
        checklist: _getChecklistCount(),
        labels: _getCardsByLabels()
    };
}

function _getCardsCount() {
    return gTasks.reduce((acc, task) => {
        if (!task.archivedAt) acc.active++;
        if (!task.archivedAt && !task.members.length) acc.unassigned++;
        return acc;
    }, { active: 0, unassigned: 0 });
}

function _getActivityData() {
    const res = {};

    for (let act of g7DaysActivities) {
        const actDate = new Date(act.createdAt);
        const idxOrder = _getIndex(actDate.getDay());
        res[idxOrder] = (res[idxOrder] || 0) + 1;
    };

    for (let i = 0; i < 7; i++) {
        if (!res[i]) res[i] = 0;
    };

    return {
        data: Object.values(res),
        total: g7DaysActivities.length,
        avg: (g7DaysActivities.length / 7).toFixed()
    };
}

function _getActsByMember(board) {

    const actsMap = g7DaysActivities.reduce((acc, act) => {
        acc[act.byMember._id] = (acc[act.byMember._id] || 0) + 1;
        return acc
    }, {});

    const res = board.members.map(member => {
        return {
            member: member.firstName + ' ' + member.lastName,
            color: member.color,
            count: actsMap[member._id] || 0
        }
    }).sort((a, b) => a.count - b.count);
    return res
}

function _getCardsByMember(board) {
    const cardsMap = {};
    const activeTasks = gTasks.filter(task => !task.archivedAt);
    for (let task of activeTasks) {
        task.members.forEach(member => (cardsMap[member] = (cardsMap[member] || 0) + 1));
    };

    const res = board.members.map(member => {
        return {
            member: member.firstName + ' ' + member.lastName,
            color: member.color,
            tasksCount: cardsMap[member._id] || 0
        }
    }).sort((a, b) => b.tasksCount - a.tasksCount);
    return res
}

function _getUnassignedTasksCount() {
    return gTasks.reduce((acc, task) => {
        if (!task.archivedAt && !task.members.length) acc++;
        return acc;
    }, 0)

}

function _getChecklistCount() {
    const tasksWithCL = gTasks.filter(task => task.checklist?.length && !task.archivedAt);
    let checklists = [];
    for (let task of tasksWithCL) checklists.push(...task['checklist']);

    let items = [];
    for (let list of checklists) items.push(...list['items']);

    return items.reduce((acc, todo) => {
        acc.todos++;
        if (todo.isDone) acc.done++;
        return acc;
    }, { todos: 0, done: 0 });

    // more readable with time complexity of O(n^3)
    // return gTasks.reduce((acc, task) => {
    //     if (task.checklist?.length && !task.archivedAt) {
    //         task.checklist.forEach(list => {
    //             list.items.forEach(item => {
    //                 acc.todos++;
    //                 if (item.isDone) acc.done++;
    //             });
    //         });
    //     }
    //     return acc;
    // }, { todos: 0, done: 0 });
}

function _getCardsByLabels() {
    const activeTasks = gTasks.filter(task => task.labels?.length && !task.archivedAt);
    return activeTasks.reduce((acc, task) => {
        task.labels.forEach(label => {
            acc[label] = (acc[label] || 0) + 1;
        })
        return acc;
    }, {});
}

function _getIndex(day) {
    const now = new Date();
    const today = now.getDay();

    if (today - day > 0) return 6 - day;
    else if (today - day < 0) return day - today - 1;
    else return 6;
}

function _getDates() {
    const today = new Date();
    let timestamp = today - WEEK_TIMESTAMP + DAY_TIMESTAMP;

    const res = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(timestamp);
        res.push(`${date.getDate()}/${date.getMonth() + 1}`);
        timestamp += DAY_TIMESTAMP;
    }
    return res;
}