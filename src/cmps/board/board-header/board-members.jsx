import React from 'react';
import { TaskMembers } from '../../task-preview/task-members'

export const BoardMembers = ({ board }) => {

    return <TaskMembers members={board.members} />
}