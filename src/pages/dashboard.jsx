import React from 'react'
import { Link, useParams } from "react-router-dom"

import { Activity } from '../cmps/dashboard/activity';
import { CardsLabels } from '../cmps/dashboard/cards-labels';
import { CardsMember } from '../cmps/dashboard/cards-members';

import { boardStatistics } from '../services/board/board-statistics'

export const Dashboard = ({ board }) => {
    const params = useParams()
    const { boardId } = params

    const summary = boardStatistics.getCardsCount(board)
    const activity = boardStatistics.getActivityStats(board)
    const datesToDisplay = boardStatistics.getDates()
    const cardsPerMember = boardStatistics.getCardsByMember(board)
    const cardsPerLabels = boardStatistics.getCardsByLabels(board)



    return <div className='dashboard-main flex col align-center'>
        <Link to={`/board/${boardId}`}>
            <div className='close-modal flex justify-center align-center'><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
        </Link>
        <div className='dash-header flex col align-center justify-center'>
            <h1>{board.title}</h1>
            <h2> <span>{summary.groupCount}</span> groups | <span>{summary.active}</span> active cards</h2>
        </div>
        <div className="main-dash flex col align-center">
            <div className="activity flex col align-center">
                <h2 className='act-title'>Board's activity in the last 7 days</h2>
                <div className='act-data flex justify-center align-center'>
                    <div className='activity-chart'>
                        <Activity dataToDisplay={activity} datesToDisplay={datesToDisplay} />
                    </div>
                    <div className="activity-info">
                        <h2>Total  of <span>{activity.reduce((acc, num) => acc + num, 0)}</span></h2>
                        <h3>activities this week</h3>
                        <h4>Daily average : {activity.reduce((acc, num) => acc + num, 0) / 7}</h4>
                    </div>
                </div>
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

    </div>
}