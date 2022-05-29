import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

// DYNAMIC CMS
import { Members } from '../cmps/task-details/dynamic-cmps/members.jsx';
import { Labels } from '../cmps/task-details/dynamic-cmps/labels.jsx'
import { Checklist } from '../cmps/task-details/dynamic-cmps/checklist.jsx'
import { Dates } from '../cmps/task-details/dynamic-cmps/dates.jsx'
import { Attachment } from '../cmps/task-details/dynamic-cmps/attachment.jsx'
import { Location } from '../cmps/task-details/dynamic-cmps/location.jsx'
// import { ClosedModal } from '../cmps/task-details/dynamic-cmps/location.jsx'

// CMPS
import { ChecklistList } from '../cmps/task-details/checklist/checklistList.jsx';
import { AttachmentList } from '../cmps/task-details/attachments/attachment-list.jsx'
import { TxtInputCmp } from '../cmps/shared cmps/txt-input-cmp.jsx';

// ACTIONS
import { loadBoard, updateBoard } from '../store/board/board.action'

// SERVICES
import { utilService } from '../services/basic/util.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board/board.service.js'
import { IAttachment } from '../cmps/icons/i-attachment.jsx'
import { IChecklist } from '../cmps/icons/i-checklist.jsx'
import { IAdd } from '../cmps/icons/i-add.jsx'
import { ITask } from '../cmps/icons/i-task.jsx'
import { IDescription } from '../cmps/icons/i-description.jsx';

// LIBS

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { TaskLabels } from '../cmps/task-preview/task-labels.jsx';
import { ModalImg } from '../cmps/task-details/modal-img.jsx';

export default function EmptyTextarea() {
    return (
        <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ width: 200 }}
        />
    );
}

let height



export const TaskDetails = ({ onArchiveTask }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const { boardId, groupId, taskId } = params
    const history = useHistory()
    const { board } = useSelector(storeState => storeState.boardModule)
    const [group, setGroup] = useState(null)
    const [task, setTask] = useState(null)
    const [boardMembers, setBoardMembers] = useState(board.members)
    const [isModal, setIsModal] = useState('')
    const [modalType, setModalType] = useState(null)
    const [isTitleEditable, setTitle] = useState(null)
    const [title, setTitleValue] = useState('')
    const [isDescriptionEditable, setDescriptionEditable] = useState(null)
    const [description, setDescriptionValue] = useState('')

    const titleRef = React.useRef()
    const descriptionRef = React.useRef()

    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    async function onLoad() {
        const groupToAdd = await board.groups.find(group => group.id === groupId)
        setGroup(groupToAdd)
        const task = await groupToAdd.tasks.find(task => task.id === taskId)
        setTask(task)
    }

    useEffect(() => {
        onLoad()
        // console.log(modalType)
    }, [task, group, height])

    const handleTitleChange = ({ target }) => {
        height = 'auto'
        let titleHeight = target.scrollHeight
        height = `${titleHeight}`
        setTitleValue(target.value)

    }
    const handleDescriptionChange = ({ target }) => {
        setDescriptionValue(target.value)
    }

    const setModal = (type) => {
        setModalType(type)
    }

    const saveMembers = (updatedTask) => {
        const group = board.groups.find(group => group.id === groupId)
        const idx = group.tasks.findIndex(task => task.id === updatedTask.id)
        group.tasks[idx].members = updatedTask.members
        setGroup(group)
        saveBoard()
    }

    const saveLabels = (updatedTask) => {
        const group = board.groups.find(group => group.id === groupId)
        const idx = group.tasks.findIndex(task => task.id === updatedTask.id)
        group.tasks[idx].members = updatedTask.members
        setGroup(group)
        saveBoard()
    }

    const saveChecklist = (checklistTitle) => {
        const newChecklist = {
            title: checklistTitle,
            items: [],
            id: 'Cl' + utilService.makeId()
        }

        if (task.checklist) {
            task.checklist.push(newChecklist)
        } else {
            task.checklist = [newChecklist]
        }
        setGroup(group)
        saveBoard()
    }

    const onSaveChecklistTask = (txt, clTaskId) => {
        const newItem = {
            txt,
            id: utilService.makeId(),
            isDone: false
        }

        const checklistTask = task.checklist.find(clTask => clTask.id === clTaskId)
        checklistTask.items.push(newItem)

        saveBoard()
    }

    const saveTaskTitle = () => {
        console.log('saved');
        task.title = title
        setTitle(false)
        saveBoard()
    }

    const saveTaskDescription = () => {
        task.description = description
        setDescriptionEditable(false)
        saveBoard()

    }

    const onSaveAttachment = (attachment) => {
        attachment.createdAt = Date.now()
        attachment.id = utilService.makeId()
        if (task.attachments) {
            task.attachments.push(attachment)
        } else {
            task.attachments = [attachment]
        }
        // setGroup(group)
        saveBoard()
    }

    const saveBoard = () => {
        dispatch(updateBoard(board))
    }

    const deepCloneBoard = () => {
        return JSON.parse(JSON.stringify(board))
    }

    const onSetIsDone = (checklistId, clTaskItem) => {

        saveBoard()
    }

    const onDeleteClTask = (clTaskId, item) => {
        const clTaskIdx = item.items.findIndex(clTask => clTask.id === clTaskId)
        item.items.splice(clTaskIdx, 1)
        saveBoard()
    }

    const onDeleteChecklist = (checklistId) => {
        const { checklist } = task
        const requestedChecklistIdx = checklist.findIndex(checklist => checklist.id === checklistId)
        checklist.splice(requestedChecklistIdx, 1)
        saveBoard()

    }

    const toggleEditDescription = async () => {
        if (isDescriptionEditable) {
            setDescriptionEditable(false)
        } else {
            await setDescriptionEditable(true)
            setDescriptionValue(task.description)
            descriptionRef.current.focus()
        }
    }

    const DynamicModal = ({ type }) => {
        // console.log(type)
        switch (type) {
            case 'members':
                return <Members saveMembers={saveMembers} boardMembers={board.members} task={task} closeModal={closeModal} />
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

    const getMemberById = (memberId) => {
        const member = boardMembers.filter(member => member._id === memberId)
        return member[0]
    }

    const closeModal = () => {
        setModalType(null)
        console.log(modalType)
        // loadBoard()
    }



    const onRemoveAttachment = (attachmentId) => {
        const requiredAttachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
        task.attachments.splice(requiredAttachmentIdx, 1)
        saveBoard()
    }

    const openImgModal = (id) => {
        setIsModal(id)
    }


    if (!group || !task) return <React.Fragment></React.Fragment>
    const { checklist, attachments } = task

    return <section onClick={onGoBack} className='task-details-shadow flex justify-center'>
        <section className='task-details flex col' onClick={(event) => event.stopPropagation()}>

            <div className='task-header flex'>
                <div className='close-modal flex justify-center align-center' onClick={onGoBack}><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
                <div className='section-icon'>
                    <ITask />
                </div>
                <div className="section-data flex col">
                    <TextareaAutosize
                        className='task-title'
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault()
                                ev.target.blur()
                            }
                        }}
                        onChange={handleTitleChange}
                        ref={titleRef}
                        onBlur={saveTaskTitle}
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder='Add a more detailed description...'
                        defaultValue={task.title ? task.title : ''}
                    />
                    <p>in list {group.title}</p>
                </div>
            </div>

            <div className='task-container flex space-between'>

                <div className="task-content">
                    <div className="task-status flex">
                        <div className='section-icon'></div>
                        {task.members?.length > 0 && <div className="members flex col">
                            <h3>Members</h3>
                            <section className='task-members flex'>
                                {task.members.map(memberId => {
                                    const member = getMemberById(memberId)
                                    return <div className='member flex justify-center align-center' key={member._id}> <img src={member.imgUrl} alt="" /> </div>
                                })}
                                <div className='add-member flex justify-center align-center' onClick={() => setModalType('members')}> <IAdd /> </div>
                            </section>
                        </div>}
                        {task.labels?.length > 0 && <div className="labels flex col">
                            <h3>Labels</h3>
                            <section className='task-labels flex'>
                                {task.labels.map(label => {
                                    return <div className='label' style={{ backgroundColor: label }} key={label}></div>
                                })}
                                <div className='add-label flex justify-center align-center' onClick={() => setModalType('labels')} ><IAdd /></div>
                            </section>
                        </div>}
                    </div>
                    <div className="description flex">
                        <div className='section-icon'>
                            <IDescription />
                        </div>
                        <div className="description-data flex col">
                            <h2>Description</h2>
                            {!isDescriptionEditable && <p placeholder={task.description} onClick={toggleEditDescription}>{!task.description ? 'Add a more detailed description...' : `${task.description}`}</p>}
                            {/* {isDescriptionEditable && <textarea value={description} ref={descriptionRef} onChange={handleDescriptionChange} onKeyDown={(event) => saveTaskDescription(event)} cols="65" rows="40" placeholder='Add a more detailed description...'></textarea>} */}
                            {isDescriptionEditable && <div className='edit-description'>
                                <TextareaAutosize
                                    // onKeyDown={(event) => {
                                    //     if (event.key === 'Enter') {
                                    //         saveTaskDescription(event)
                                    //     }
                                    // }}
                                    onChange={handleDescriptionChange}
                                    ref={descriptionRef}
                                    onBlur={() => {
                                        toggleEditDescription()
                                        saveTaskDescription()
                                    }}
                                    maxRows={4}
                                    aria-label="maximum height"
                                    placeholder='Add a more detailed description...'
                                    defaultValue={task.description ? task.description : ''}
                                    style={{ width: '100%', minHeight: '108px' }}
                                />
                                <button className='btn-save'>Save</button>
                                <button className='btn-cancel' onMouseDown={(event) => { event.preventDefault(); toggleEditDescription() }}>Cancel</button>
                                {/* <button className='btn-cancel' onClick={toggleEditDescription}>Cancel</button> */}
                            </div>}
                        </div>
                    </div>
                    {/* {checklist?.length > 0 && <div className='checklist'>
                        {checklist.length > 0 && <ChecklistList checklists={checklist} saveChecklistTask={onSaveChecklistTask} setIsDone={onSetIsDone} deleteClTask={onDeleteClTask} deleteChecklist={onDeleteChecklist} />}
                    </div>} */}

                    {checklist?.length > 0 && <ChecklistList checklist={checklist} saveChecklistTask={onSaveChecklistTask} setIsDone={onSetIsDone} deleteClTask={onDeleteClTask} deleteChecklist={onDeleteChecklist} />}

                    {attachments?.length > 0 && <AttachmentList attachments={attachments} removeAttachment={onRemoveAttachment} openImgModal={openImgModal} />}
                </div>

                <div className='task-edit flex col'>
                    <h3>Add to card</h3>
                    <div className='modal-btn btn-edit-task-key flex align-center' >
                        <div className='flex btn-wrapper' onClick={() => setModalType('members')}>

                            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor" /></svg>
                            <p>Members</p>
                        </div>
                        {modalType === 'members' && <div className='action-type-modal'>
                            <div className='modal'>
                                {/* <h3>{modalType}</h3> */}
                                <DynamicModal type={modalType} />
                            </div>
                        </div>}
                    </div>
                    <div className='modal-btn btn-edit-task-key label flex align-center'>
                        <div className='flex btn-wrapper' onClick={() => setModalType('labels')}>
                            <svg viewBox="0 0 24 24" ><path d="M-37.2,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-37.2z" /><path d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path d="M4.9,19.1c-2.6-2.6-2.6-6.8,0-9.3l6.1-6.1c0.8-0.8,2-0.8,2.8,0l6.5,6.5c0.8,0.8,0.8,2,0,2.8l-6.1,6.1 C11.7,21.6,7.5,21.6,4.9,19.1z M12.6,4.9L6.3,11c-1.9,1.9-1.9,4.9,0,6.7s4.9,1.8,6.7,0l6.1-6.1L12.6,4.9z M7.9,16.1 c-1.1-1.1-1.1-3,0-4.1s3-1.1,4.1,0c1.1,1.1,1.1,3,0,4.1S9,17.3,7.9,16.1z M10.7,13.3c-0.4-0.4-1.1-0.4-1.5,0s-0.4,1.1,0,1.5 c0.4,0.4,1.1,0.4,1.5,0C11.1,14.4,11.1,13.7,10.7,13.3z" /></svg>
                            <p>Labels</p>
                        </div>
                        {modalType === 'labels' && <div className='action-type-modal'>
                            <div className='modal'>
                                {/* <h3>{modalType}</h3> */}
                                <DynamicModal type={modalType} />
                            </div>
                        </div>}
                    </div>
                    <div className='modal-btn btn-edit-task-key flex align-center'>
                        <div className='flex btn-wrapper' onClick={() => setModal('checklist')}>
                            <IChecklist />
                            <p>Checklist</p>
                        </div>
                        {modalType === 'checklist' && <div className='action-type-modal'>
                            <div className='modal'>
                                {/* <h3>{modalType}</h3> */}
                                <DynamicModal type={modalType} />
                            </div>
                        </div>}
                    </div>
                    <div className='modal-btn btn-edit-task-key flex align-center'>
                        <div className='flex btn-wrapper' onClick={() => setModal('attachment')}>
                            <IAttachment /><p>Attachment</p>
                        </div>
                        {modalType === 'attachment' && <div className='action-type-modal'>
                            <div className='modal'>
                                {/* <h3>{modalType}</h3> */}
                                <DynamicModal type={modalType} />
                            </div>
                        </div>}
                    </div>
                    <div className='modal-btn btn-edit-task-key flex align-center'>
                        <div className='flex btn-wrapper' onClick={ev => {
                            onArchiveTask({ taskId, groupId })
                            onGoBack()
                        }}>
                            <svg viewBox="0 0 24 24" ><g class="st0"><path class="st1" d="M-38.3,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1 l0,5.8c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-38.3z" /><path class="st1" d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path class="st2" d="M-79,24.7h-34.4c-2.1,0-3.7-1.7-3.7-3.7V-4.6h41.9V21C-75.3,23-76.9,24.7-79,24.7z" /><line class="st2" x1="-101.2" y1="5.6" x2="-91" y2="5.6" /><line class="st2" x1="-117.1" y1="-14.1" x2="-75.3" y2="-17.3" /></g><g><g><path d="M15.6,21H8.4C5.4,21,3,18.6,3,15.7V7.8H21v7.9C21,18.6,18.6,21,15.6,21z M5.3,10v5.7c0,1.7,1.4,3.1,3.1,3.1h7.3 c1.7,0,3.1-1.4,3.1-3.1V10H5.3z" /></g><g><path d="M13.9,13.8h-3.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h3.8c0.6,0,1.1,0.5,1.1,1.1S14.5,13.8,13.9,13.8z" /></g><g><path d="M4.2,6.5C3.6,6.5,3.1,6,3,5.4c0-0.6,0.4-1.2,1-1.2L19.8,3C20.4,3,20.9,3.4,21,4c0,0.6-0.4,1.2-1,1.2L4.2,6.5 C4.2,6.5,4.2,6.5,4.2,6.5z" /></g></g></svg>
                            <p>Archive card</p>
                        </div>
                    </div>
                    {!modalType && <DynamicModal type={modalType} />}
                </div>
            </div>

            {/* {modalType && <div className='action-type-modal'> */}
            {/* <div className='modal'> */}
            {/* <h3>{modalType}</h3> */}
            {/* <DynamicModal type={modalType} /> */}
            {/* </div> */}
            {/* </div>} */}
        </section>
        {/* {isModal && <ModalImg url={isModal} />} */}
    </section>
}