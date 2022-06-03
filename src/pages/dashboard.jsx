import React from 'react'
import { Activity } from '../cmps/dashboard/activity';

import { boardStatistics } from '../services/board/board-statistics'

export const Dashboard = ({ board }) => {
    const summary = boardStatistics.getCardsCount(board)
    const activity = boardStatistics.getActivityStats(board)
    const datesToDisplay = boardStatistics.getDates()


    return <div className='dashboard-main flex col align-center'>

        <div className='dash-header flex col align-center'>
            <h1>{board.title}</h1>
            <h2> <span>{summary.groupCount}</span> groups | <span>{summary.active}</span> active cards</h2>
        </div>
        <Activity dataToDisplay={activity} datesToDisplay={datesToDisplay} />
        {/* chart + pie */}


    </div>
}