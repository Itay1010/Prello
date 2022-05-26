import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Members } from '../cmps/task-details/dynamic-cmps/members.jsx';
import { Labels } from '../cmps/task-details/dynamic-cmps/labels.jsx'
import { Checklist } from '../cmps/task-details/dynamic-cmps/checklist.jsx'
import { Dates } from '../cmps/task-details/dynamic-cmps/dates.jsx'
import { Attachment } from '../cmps/task-details/dynamic-cmps/attachment.jsx'
import { Location } from '../cmps/task-details/dynamic-cmps/location.jsx'
import { taskService } from '../services/board/task.service.js';



export const TaskDetails = () => {
    const params = useParams()
    const { boardId } = params
    const history = useHistory()
    // const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(null)


    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    const setModal = (type) => {
        console.log(type)
        setModalType(type)
        // setModalType(type)

    }

    const saveTask = (newTask) => {

    }
    const DynamicModal = () => {
        switch (modalType) {
            case 'members':
                return <Members />
            case 'labels':
                return <Labels />
            case 'checklist':
                return <Checklist />
            case 'dates':
                return <Dates />
            case 'attachment':
                return <Attachment />
            case 'location':
                return <Location />
            default:
                break;
        }
    }

    // const onArchiveTask = async (task) => {
    //     taskService.archiveTask(task, board)
    // }


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
                <button>Archive card</button>
                {/* <button onClick={ev => onArchiveTask({ taskId: task.id, groupId })}>Archive card</button> */}

            </div>
            {modalType && <DynamicModal type={modalType} boardId={boardId} onSaveTask={saveTask} />}
        </section>
    </section>
}