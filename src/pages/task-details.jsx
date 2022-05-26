import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Members } from '../cmps/task-details/members';


export const TaskDetails = () => {
    const params = useParams()
    const { boardId } = params
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    // const [modalType, setModalType] = useState('')


    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    const setModal = (type) => {
        console.log(type)
        setIsModal(true)
        // setModalType(type)

    }


    return <section onClick={onGoBack} className='task-details-shadow'>
        <section className='task-details flex space-between' onClick={(event) => event.stopPropagation()}>
            <div className='task-content'>
                CONTENT
            </div>
            <div className='task-edit flex col'>
                <button onClick={() => setModal('members')}>Members</button>
                <button onClick={() => setModal('labels')}>Labels</button>
                <button onClick={() => setModal('checklist')}>Checklist</button>
                <button onClick={() => setModal('dates')}>Dates</button>
                <button onClick={() => setModal('attachment')}>Attachment</button>
                <button onClick={() => setModal('location')}>Location</button>
            </div>
            {/* {isModal && <DynamicModal type={modalType} />} */}
        </section>
    </section>
}