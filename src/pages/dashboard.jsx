import React from 'react'
import { Activity } from '../cmps/dashboard/activity';
import { CardsLabels } from '../cmps/dashboard/cards-labels';
import { CardsMember } from '../cmps/dashboard/cards-members';

import { boardStatistics } from '../services/board/board-statistics'
import { boardService } from '../services/board/board.service';

export const Dashboard = ({ board }) => {
    const summary = boardStatistics.getCardsCount(board)
    const activity = boardStatistics.getActivityStats(board)
    const datesToDisplay = boardStatistics.getDates()
    const cardsPerMember = boardStatistics.getCardsByMember(board)
    const cardsPerLabels = boardStatistics.getCardsByLabels(board)



    return <div className='dashboard-main flex col align-center'>
        <div className='dash-header flex col align-center'>
            <h1>{board.title}</h1>
            <h2> <span>{summary.groupCount}</span> groups | <span>{summary.active}</span> active cards</h2>
        </div>
        <div className='activity'>
            {/* <h1>Board's activity for last 7 days</h1> */}
            <Activity dataToDisplay={activity} datesToDisplay={datesToDisplay} />
        </div>
        <div className="more-stat flex space-between">
            <div className="cards-member flex justify-center align-center">
                <CardsMember cardsPerMember={cardsPerMember} />
            </div>
            <div className="cards-labels flex justify-center align-center">
                <CardsLabels cardsPerLabels={cardsPerLabels} />
            </div>
        </div>

    </div>
}