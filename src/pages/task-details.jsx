import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Members } from '../cmps/task-details/members';


export const TaskDetails = () => {
    const params = useParams()
    const { boardId } = params
    const history = useHistory()


    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    const disableGoBack = (ev) => {
        ev.stopPropagation()
    }
    return <section onClick={onGoBack} className='task-details-shadow'>
        <section onClick={(event) => disableGoBack(event)} className='task-details'>
            <Members />
        </section>
    </section>
}