import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { boardStatistics } from '../services/board/dashboard.service'

import { SummaryBox } from '../cmps/dashboard/summary-box'
import { ActivityChart } from '../cmps/dashboard/activity-chart'
import { ActivityBox } from '../cmps/dashboard/activity-box'
import { ActsMembers } from '../cmps/dashboard/acts-members'
import { CardsMember } from '../cmps/dashboard/cards-members'
import { CardsChecklist } from '../cmps/dashboard/cards-checklist'
import { CardsLabels } from '../cmps/dashboard/cards-labels'

import { IClose } from '../cmps/icons/icons'


export const Dashboard = ({ board }) => {
    const [isActive, setIsActive] = useState(true)
    const history = useHistory()
    const params = useParams()
    const { boardId } = params

    const { summary, activities, members, cards } = boardStatistics.getStatistics(board)

    const onCloseDashboard = () => {
        setIsActive(false, setTimeout(() => {
            history.push(`/board/${boardId}`)
        }, 500))
    }

    return (
        <>
            <main className={isActive ? 'dashboard slide-in' : 'dashboard slide-out'}>
                <IClose onCloseDashboard={onCloseDashboard} />
                <h1>{board.title}</h1>
                <section className="summary">
                    <SummaryBox title="Members" data={summary.members} />
                    <SummaryBox title="Groups" data={summary.groups} />
                    <SummaryBox title="Active cards" data={summary.active} />
                    <SummaryBox title="Unassigned cards" data={summary.unassigned} />
                </section>
                <section className="activity">
                    <div className="activity-data">
                        <h2 className="act-title">Board's activity in the last 7 days</h2>
                        <ActivityChart dataToDisplay={activities.chart.data} datesToDisplay={activities.chart.dates} />
                    </div>
                    <div className="activity-info ">
                        <ActivityBox title="Total activities this week" data={activities.total} />
                        <ActivityBox title="Daily average activities" data={activities.avg} />
                    </div>
                </section>
                <section className="members">
                    <h2>Find out more about board's members</h2>
                    <div className="members-data ">
                        <div className="members-info">
                            <h3>Activities per member for the last 7 days</h3>
                            <ActsMembers actsByMember={members.activities} />
                        </div>
                        <div className="members-info ">
                            <h3>Cards count per member</h3>
                            <CardsMember cardsPerMember={members.cards} unAssignedTasks={members.unassigned} />
                        </div>
                    </div>
                </section>
                <section className="cards">
                    <h2>Find out more about board's cards</h2>
                    <div className="cards-data ">
                        <div className="cards-info">
                            <h3>Board's checklists status</h3>
                            <h6><span>{cards.checklist.done}</span>/{cards.checklist.todos}</h6>
                            <CardsChecklist checklists={cards.checklist} />
                        </div>
                        <div className="cards-info ">
                            <h3>Cards by labels</h3>
                            <CardsLabels cardsPerLabels={cards.labels} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}