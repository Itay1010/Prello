export const Statistics = {
    cardsCount

}


function cardsCount(board) {
    const count = board.groups.reduce((acc, group) => {
        let active = 0
        let archived = 0
        group.forEach(task => {
            if (task.archivedAt) archived++
            else active++
        })
        acc.active = active
        acc.archived = archived
        return acc
    }, {})

    console.log(count);

}