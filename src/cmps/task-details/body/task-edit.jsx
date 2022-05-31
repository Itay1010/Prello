import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAttachment } from '../../icons/i-attachment';
import { IChecklist } from '../../icons/i-checklist';

// DYNAMIC CMS
import { Members } from '../dynamic-cmps/members.jsx';
import { Labels } from '../dynamic-cmps/labels.jsx'
import { Checklist } from '../dynamic-cmps/checklist.jsx'
import { Dates } from '../dynamic-cmps/dates.jsx'
import { Attachment } from '../dynamic-cmps/attachment.jsx'
import { Location } from '../dynamic-cmps/location.jsx'

// export const TaskEdit = ({
//     onArchiveTask,
//     task,
//     group,
//     boardId,
//     boardMembers,
//     saveMembers,
//     saveLabels,
//     saveChecklist,
//     onSaveAttachment

// }) => {
export const TaskEdit = (props) => {

    // const [modalType, setModalType] = useState(null)
    const history = useHistory()

    const { modalType, setModalType } = props

    // const handlers = {
    //     boardMembers,
    //     saveMembers,
    //     saveLabels,
    //     saveChecklist,
    //     onSaveAttachment
    // }

    return <div className='task-edit flex col'>
        <h3>Add to card</h3>
        <div className='modal-btn btn-edit-task-key flex align-center' >
            <div className='flex btn-wrapper flex align-center flex align-center' onClick={() => setModalType('members')}>

                <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor" /></svg>
                <p>Members</p>
            </div>
            {modalType === 'members' && <div className='action-type-modal'>
                <div className='modal'>
                    {/* <h3>{modalType}</h3> */}
                    <_DynamicModal type={modalType} {...props} />
                </div>
            </div>}
        </div>
        <div className='modal-btn btn-edit-task-key label flex align-center'>
            <div className='flex btn-wrapper flex align-center' onClick={() => setModalType('labels')}>
                <svg viewBox="0 0 24 24" ><path d="M-37.2,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-37.2z" /><path d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path d="M4.9,19.1c-2.6-2.6-2.6-6.8,0-9.3l6.1-6.1c0.8-0.8,2-0.8,2.8,0l6.5,6.5c0.8,0.8,0.8,2,0,2.8l-6.1,6.1 C11.7,21.6,7.5,21.6,4.9,19.1z M12.6,4.9L6.3,11c-1.9,1.9-1.9,4.9,0,6.7s4.9,1.8,6.7,0l6.1-6.1L12.6,4.9z M7.9,16.1 c-1.1-1.1-1.1-3,0-4.1s3-1.1,4.1,0c1.1,1.1,1.1,3,0,4.1S9,17.3,7.9,16.1z M10.7,13.3c-0.4-0.4-1.1-0.4-1.5,0s-0.4,1.1,0,1.5 c0.4,0.4,1.1,0.4,1.5,0C11.1,14.4,11.1,13.7,10.7,13.3z" /></svg>
                <p>Labels</p>
            </div>
            {modalType === 'labels' && <div className='action-type-modal'>
                <div className='modal'>
                    {/* <h3>{modalType}</h3> */}
                    <_DynamicModal type={modalType} {...props} />
                </div>
            </div>}
        </div>
        <div className='modal-btn btn-edit-task-key flex align-center'>
            <div className='flex btn-wrapper flex align-center' onClick={() => setModalType('checklist')}>
                <IChecklist />
                <p>Checklist</p>
            </div>
            {modalType === 'checklist' && <div className='action-type-modal'>
                <div className='modal'>
                    {/* <h3>{modalType}</h3> */}
                    <_DynamicModal type={modalType} {...props} />
                </div>
            </div>}
        </div>
        <div className='modal-btn btn-edit-task-key flex align-center'>
            <div className='flex btn-wrapper flex align-center' onClick={() => setModalType('attachment')}>
                <IAttachment /><p>Attachment</p>
            </div>
            {modalType === 'attachment' && <div className='action-type-modal'>
                <div className='modal'>
                    {/* <h3>{modalType}</h3> */}
                    <_DynamicModal type={modalType} {...props} />
                </div>
            </div>}
        </div>
        <div className='modal-btn btn-edit-task-key flex align-center'>
            <div className='flex btn-wrapper flex align-center align-center' onClick={ev => {
                props.onArchiveTask({ taskId: props.task.id, groupId: props.group.id })
                history.push(`/board/${[props.boardId]}`)
            }}>
                <svg viewBox="0 0 24 24" ><g className="st0"><path className="st1" d="M-38.3,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1 l0,5.8c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-38.3z" /><path className="st1" d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path className="st2" d="M-79,24.7h-34.4c-2.1,0-3.7-1.7-3.7-3.7V-4.6h41.9V21C-75.3,23-76.9,24.7-79,24.7z" /><line className="st2" x1="-101.2" y1="5.6" x2="-91" y2="5.6" /><line className="st2" x1="-117.1" y1="-14.1" x2="-75.3" y2="-17.3" /></g><g><g><path d="M15.6,21H8.4C5.4,21,3,18.6,3,15.7V7.8H21v7.9C21,18.6,18.6,21,15.6,21z M5.3,10v5.7c0,1.7,1.4,3.1,3.1,3.1h7.3 c1.7,0,3.1-1.4,3.1-3.1V10H5.3z" /></g><g><path d="M13.9,13.8h-3.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h3.8c0.6,0,1.1,0.5,1.1,1.1S14.5,13.8,13.9,13.8z" /></g><g><path d="M4.2,6.5C3.6,6.5,3.1,6,3,5.4c0-0.6,0.4-1.2,1-1.2L19.8,3C20.4,3,20.9,3.4,21,4c0,0.6-0.4,1.2-1,1.2L4.2,6.5 C4.2,6.5,4.2,6.5,4.2,6.5z" /></g></g></svg>
                <p>Archive card</p>
            </div>
        </div>
        {!modalType && <_DynamicModal type={modalType} {...props} />}
    </div>
}



const _DynamicModal = (props) => {
    const {
        type,
        saveMembers,
        boardMembers,
        task,
        closeModal,
        saveLabels,
        saveChecklist,
        group,
        onSaveAttachment,
    } = props

    switch (type) {
        case 'members':
            return <Members saveMembers={saveMembers} boardMembers={boardMembers} task={task} closeModal={closeModal} />
        case 'labels':
            return <Labels saveLabels={saveLabels} task={task} closeModal={closeModal} />
        case 'checklist':
            return <Checklist saveChecklist={saveChecklist} group={group} closeModal={closeModal} />
        case 'dates':
            return <Dates closeModal={closeModal} />
        case 'attachment':
            return <Attachment saveAttachment={onSaveAttachment} closeModal={closeModal} />
        case 'location':
            return <Location closeModal={closeModal} />
        default:
            break;
    }
}