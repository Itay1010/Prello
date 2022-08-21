import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { boardStatistics } from '../services/board/board-statistics';

import { InfoBox } from '../cmps/dashboard/info-box'
import { Activity } from '../cmps/dashboard/activity';
import { ActsMembers } from '../cmps/dashboard/acts-members';
import { CardsChecklist } from '../cmps/dashboard/cards-checklist';
import { CardsLabels } from '../cmps/dashboard/cards-labels';
import { CardsMember } from '../cmps/dashboard/cards-members';

import { IClose } from '../cmps/icons/icons'


export const Dashboard = ({ board }) => {
    const params = useParams()
    const { boardId } = params

    const { activity, datesToDisplay, cardsPerMember, unAssignedCards, cardsPerLabels, actsByMember, checklists, summary, membersCount, groupsCount }
        = boardStatistics.getStatistics(board)

    const totalActs = activity.reduce((acc, num) => acc + num, 0)
    const dailyAvg = (totalActs / 7).toFixed()


    return (
        <main className="dashboard-main slide-top">
            <Link to={`/board/${boardId}`}><IClose /></Link>
            <h1>{board.title}</h1>
            <div className="summary-box">
                <InfoBox title="Members" data={membersCount} />
                <InfoBox title="Groups" data={groupsCount} />
                <InfoBox title="Active cards" data={summary.active} />
                <InfoBox title="Unassigned cards" data={unAssignedCards} />
            </div>
            <div className="activity ">

                <div className="activity-data">
                    <div className="act-title">
                        <h2 >Board's activity in the last 7 days</h2>
                    </div>
                    <div className="activity-chart">
                        <Activity dataToDisplay={activity} datesToDisplay={datesToDisplay} />
                    </div>
                </div>
                <div className="activity-info ">
                    <div className="act-box">
                        <h3>Total activities this week</h3>
                        <h2>{totalActs}</h2>
                    </div>
                    <div className="act-box">
                        <h3>Daily average activities</h3>
                        <h2>{dailyAvg}</h2>
                    </div>
                </div>
            </div>
            <div className="members-stat">
                <h2>Find out more about board's members</h2>
                <div className="members-data ">
                    <div className="members-info">
                        <h3>Activities per member</h3>
                        <div className="members-chart ">
                            <ActsMembers actsByMember={actsByMember} />
                        </div>
                    </div>
                    <div className="members-info ">
                        <h3>Cards count per member</h3>
                        <div className="members-chart ">
                            <CardsMember cardsPerMember={cardsPerMember} unAssignedTasks={unAssignedCards} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cards-stat">
                <h2>Find out more about board"s cards</h2>
                <div className="cards-data ">
                    <div className="cards-info ">
                        <h3>Board's checklists status</h3>
                        <h6><span>{checklists.done}</span>/{checklists.todos}</h6>
                        <div className="cards-chart ">
                            <CardsChecklist checklists={checklists} />
                        </div>
                    </div>
                    <div className="cards-info ">
                        <h3>Cards by labels</h3>
                        <div className="cards-chart ">
                            <CardsLabels cardsPerLabels={cardsPerLabels} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}