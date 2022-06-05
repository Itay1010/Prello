import React from 'react'

import { boardStatistics } from '../../services/board/board-statistics'


export const DashHeader = ({ board }) => {

    const summary = boardStatistics.getCardsCount(board)
    const membersCount = boardStatistics.getMemebersCount(board)
    // const activity = boardStatistics.getActivityStats(board)
    const unAssignedTasks = boardStatistics.getUnassignedTasksCount(board)


    return <div className='dash-header flex col align-center justify-center'>
        <h1>{board.title}</h1>
        <div className="summary-box flex align-center justify-center">
            <div className="box flex col justify-center">
                <h2>{membersCount}</h2>
                <p>members</p>
            </div>
            <div className="box flex col justify-center">
                <h2>{summary.active}</h2>
                <p>active cards</p>
            </div>
            <div className="box flex col justify-center">
                <h2>{unAssignedTasks}</h2>
                <p>unassigned cards</p>
            </div>
        </div>
    </div>
}