import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { boardStatistics } from '../services/board/board-statistics';

import { SummaryBox } from '../cmps/dashboard/summary-box';
import { ActivityChart } from '../cmps/dashboard/activity-chart';
import { ActsMembers } from '../cmps/dashboard/acts-members';
import { CardsChecklist } from '../cmps/dashboard/cards-checklist';
import { CardsLabels } from '../cmps/dashboard/cards-labels';
import { CardsMember } from '../cmps/dashboard/cards-members';

import { IClose } from '../cmps/icons/icons';
import { ActivityBox } from '../cmps/dashboard/activity-box';


export const Dashboard = ({ board }) => {
    const params = useParams()
    const { boardId } = params

    const { activity, datesToDisplay, cardsPerMember, unAssignedCards, cardsPerLabels, actsByMember, checklists, summary, membersCount, groupsCount }
        = boardStatistics.getStatistics(board)

    const totalActs = activity.reduce((acc, num) => acc + num, 0)
    const dailyAvg = (totalActs / 7).toFixed()


    return (
        <main className="dashboard slide-top">
            <Link to={`/board/${boardId}`}><IClose /></Link>
            <h1>{board.title}</h1>
            <section className="summary">
                <SummaryBox title="Members" data={membersCount} />
                <SummaryBox title="Groups" data={groupsCount} />
                <SummaryBox title="Active cards" data={summary.active} />
                <SummaryBox title="Unassigned cards" data={unAssignedCards} />
            </section>
            <section className="activity">
                <div className="activity-data">
                    <h2 className="act-title">Board's activity in the last 7 days</h2>
                    <ActivityChart dataToDisplay={activity} datesToDisplay={datesToDisplay} />
                </div>
                <div className="activity-info ">
                    <ActivityBox title="Total activities this week" data={totalActs} />
                    <ActivityBox title="Daily average activities" data={dailyAvg} />
                </div>
            </section>
            <section className="members">
                <h2>Find out more about board's members</h2>
                <div className="members-data ">
                    <div className="members-info">
                        <h3>Activities per member</h3>
                        <ActsMembers actsByMember={actsByMember} />
                    </div>
                    <div className="members-info ">
                        <h3>Cards count per member</h3>
                        <CardsMember cardsPerMember={cardsPerMember} unAssignedTasks={unAssignedCards} />
                    </div>
                </div>
            </section>
            <section className="cards">
                <h2>Find out more about board's cards</h2>
                <div className="cards-data ">
                    <div className="cards-info ">
                        <h3>Board's checklists status</h3>
                        <h6><span>{checklists.done}</span>/{checklists.todos}</h6>
                        <CardsChecklist checklists={checklists} />
                    </div>
                    <div className="cards-info ">
                        <h3>Cards by labels</h3>
                        <CardsLabels cardsPerLabels={cardsPerLabels} />
                    </div>
                </div>
            </section>
        </main>
    )
}