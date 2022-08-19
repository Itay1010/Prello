import React from 'react';
import { Link, useParams } from 'react-router-dom';

//SERVICES
import { boardStatistics } from '../services/board/board-statistics';

//CMPS
import { Activity } from '../cmps/dashboard/activity';
import { ActsMembers } from '../cmps/dashboard/acts-members';
import { CardsChecklist } from '../cmps/dashboard/cards-checklist';
import { CardsLabels } from '../cmps/dashboard/cards-labels';
import { CardsMember } from '../cmps/dashboard/cards-members';

//ICONS
import { IGroup } from '../cmps/icons/i-group';
import { IMembers } from '../cmps/icons/i-members';
import { ITask } from '../cmps/icons/i-task';
import { IUnassigned } from '../cmps/icons/i-unassigned';


export const Dashboard = ({ board }) => {
    const params = useParams()
    const { boardId } = params

    const { activity, datesToDisplay, cardsPerMember, unAssignedTasks, cardsPerLabels, actsByMember, checklists, summary, membersCount, groupsCount }
        = boardStatistics.getStatistics(board)

    const totalActs = activity.reduce((acc, num) => acc + num, 0)
    const dailyAvg = (totalActs / 7).toFixed()


    return (
        <div className="dashboard-main slide-top">
            <Link to={`/board/${boardId}`}>
                <div className="close-modal-dash">
                    <svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
            </Link>
            <h1>{board.title}</h1>
            <div className="summary-box">
                <div className="box">
                    <IMembers />
                    <p>Members</p>
                    <h2>{membersCount}</h2>
                </div>
                <div className="box">
                    <IGroup />
                    <p>Groups</p>
                    <h2>{groupsCount}</h2>
                </div>
                <div className="box">
                    <ITask />
                    <p>Active cards</p>
                    <h2>{summary.active}</h2>
                </div>
                <div className="box">
                    <IUnassigned />
                    <p>Unassigned cards</p>
                    <h2>{unAssignedTasks}</h2>
                </div>
            </div>
            <div className="activity ">
                <div className="activity-data">
                    <div className="act-title">
                        <h2 >Board"s activity in the last 7 days</h2>
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
                            <CardsMember cardsPerMember={cardsPerMember} unAssignedTasks={unAssignedTasks} />
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
        </div>
    )
}