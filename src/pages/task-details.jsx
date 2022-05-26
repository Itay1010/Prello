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
    // const onOpenChecklistModal=()=>{

    // }

    return <section onClick={onGoBack} className='task-details-shadow'>
        <section onClick={(event) => disableGoBack(event)} className='task-details'>
            <div className='task-content'></div>
            <div className='task-buttons-wrapper'>
                {/* <button onClick={onOpenChecklistModal}>CheckList</button> */}
            </div>
            <Members />
        </section>
    </section>
}