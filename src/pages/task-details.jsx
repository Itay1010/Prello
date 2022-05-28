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

// CMPS
import { ChecklistList } from '../cmps/task-details/checklist/checklistList.jsx';
import { AttachmentList } from '../cmps/task-details/attachments/attachment-list.jsx'

// ACTIONS
import { updateBoard } from '../store/board/board.action'

// SERVICES
import { utilService } from '../services/basic/util.service.js';
import { userService } from '../services/user.service.js';
import { boardService } from '../services/board/board.service.js';



export const TaskDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { boardId, groupId, taskId } = params
    const history = useHistory()
    const { board } = useSelector(storeState => storeState.boardModule)
    const [group, setGroup] = useState(null)
    const [task, setTask] = useState(null)
    const [boardMembers, setBoardMembers] = useState(board.members)
    // const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(null)

    // useEffect(() => {


    // }, [])

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
    }, [task, group])


    const setModal = (type) => {
        setModalType(type)
        // setModalType(type)
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
        // console.log(checklistId)
        // const requestedChecklist = task.checklist.find(checklist => checklistId === checklist.id)
        // let requestedItemInChecklistIdx = requestedChecklist.items.findIndex(item => item.id === clTaskItem.id)
        // requestedChecklist.items.splice(requestedItemInChecklistIdx, 1, clTaskItem)
        saveBoard()
    }

    const onDeleteClTask = (clTaskId, item) => {
        // console.log(task)
        // console.log(clTaskId, item)
        // item.items.filter(clTask => clTask.id !== clTaskId)

        const clTaskIdx = item.items.findIndex(clTask => clTask.id === clTaskId)
        // console.log(clTaskIdx)
        item.items.splice(clTaskIdx, 1)

        saveBoard()
    }

    const onDeleteChecklist = (checklistId) => {
        const { checklist } = task
        const requestedChecklistIdx = checklist.findIndex(checklist => checklist.id === checklistId)
        checklist.splice(requestedChecklistIdx, 1)
        saveBoard()

    }


    const DynamicModal = () => {
        switch (modalType) {
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

    // const onArchiveTask = async (task) => {
    //     taskService.archiveTask(task, board)
    // }
    // 
    // console.log(task)

    const getMemberById = (memberId) => {
        const member = boardMembers.filter(member => member._id === memberId)
        return member[0]
    }

    const closeModal = () => {
        setModalType('')
    }

    const onRemoveAttachment = (attachmentId) => {
        const requiredAttachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
        task.attachments.splice(requiredAttachmentIdx, 1)
        saveBoard()
    }


    if (!group || !task) return <React.Fragment></React.Fragment>
    const { checklist, attachments } = task
    // console.log(attachments)

    return <section onClick={onGoBack} className='task-details-shadow flex justify-center'>
        <section className='task-details flex col' onClick={(event) => event.stopPropagation()}>

            <div className='task-header flex'>
                <div className='close-modal flex justify-center align-center'><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
                <div className='section-icon'>
                    <svg viewBox="0 0 24 24"><path className="st0" d="M-15.3,6.4c1.9,0,3.8,0,5.7,0c1,0,1.7,0.6,1.7,1.6c0,2.8,0,5.5,0,8.3c0,1-0.7,1.7-1.7,1.7c-3.8,0-7.7,0-11.5,0 c-1.1,0-1.7-0.6-1.7-1.7c0-2.7,0-5.5,0-8.2c0-1.1,0.7-1.7,1.7-1.7C-19.1,6.4-17.2,6.4-15.3,6.4z M-21.2,8c0,1.6,0,3.2,0,4.7 c0,0.1,0.3,0.4,0.5,0.4c3.6,0,7.2,0,10.8,0c0.4,0,0.5-0.2,0.5-0.6c0-0.9,0-1.8,0-2.7c0-0.6,0-1.2,0-1.9H-21.2z M-18.7,14.6 c-0.5,0-1.1,0-1.6,0c-0.5,0-0.9,0.3-0.9,0.8c0,0.6,0.3,0.9,0.8,0.9c1.1,0,2.3,0,3.4,0c0.5,0,0.9-0.4,0.8-0.9c0-0.5-0.4-0.8-0.9-0.8 C-17.6,14.6-18.1,14.6-18.7,14.6z M-9.4,15.5c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.5,0.9,0.9,0.9 C-9.8,16.4-9.4,15.9-9.4,15.5z" /><path d="M19.4,5.4H4.6C4,5.4,3.5,5.9,3.5,6.5v11c0,0.6,0.5,1.1,1.1,1.1h14.8c0.6,0,1.1-0.5,1.1-1.1v-11C20.5,5.9,20,5.4,19.4,5.4z  M10.1,16.8H6.2c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h3.8c0.6,0,1,0.4,1,1C11.1,16.4,10.6,16.8,10.1,16.8z M17.8,16.8c-0.6,0-1-0.4-1-1 c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1C18.8,16.4,18.3,16.8,17.8,16.8z M18.8,11.9c0,0.6-0.5,1.1-1.1,1.1H6.4c-0.6,0-1.1-0.5-1.1-1.1V8.3 c0-0.6,0.5-1.1,1.1-1.1h11.2c0.6,0,1.1,0.5,1.1,1.1V11.9z" /></svg>
                </div>
                <div className="section-data flex col">
                    <h2 className='task-title'>{task.title}</h2>
                    <p>in list {group.title}</p>
                    {/* <p>in list <a href={`/board/${boardId}`}>{group.title}</a></p> */}
                </div>
            </div>

            <div className='task-container flex space-between'>

                <div className="task-content">
                    <div className="task-status flex">
                        <div className='section-icon'></div>
                        {task.members?.length > 0 && <div className="members flex col">
                            <h3>Members</h3>
                            {/* {console.log('task.members', task.members)} */}
                            <section className='task-members flex'>
                                {task.members.map(memberId => {
                                    const member = getMemberById(memberId)
                                    return <div className='member flex justify-center align-center' key={member._id}> <img src={member.imgUrl} alt="" /> </div>
                                })}
                                <div className='add-member flex justify-center align-center' onClick={() => setModalType('members')}>+</div>
                            </section>
                        </div>}
                        {task.labels?.length > 0 && <div className="labels flex col">
                            <h3>Labels</h3>
                            <section className='task-labels flex'>
                                {task.labels.map(label => {
                                    return <div className='label' style={{ backgroundColor: label }} key={label}></div>
                                })}
                                <div className='add-label flex justify-center align-center'>+</div>
                            </section>
                        </div>}
                    </div>
                    <div className="description flex">
                        <div className='section-icon'>
                            <svg viewBox="0 0 24 24" ><path d="M-45,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-45z M-29.4,4l-9.1,9.1 c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3c0.4,0.4,1,0.4,1.4,0L-28,5.4 c0.4-0.4,0.4-1,0-1.4v0C-28.4,3.6-29,3.6-29.4,4z" /><path d="M20.1,10.9H3.9C3.4,10.9,3,10.5,3,10v0C3,9.4,3.4,9,3.9,9h16.2C20.6,9,21,9.4,21,10v0C21,10.5,20.6,10.9,20.1,10.9z" /><path d="M21,5.9L21,5.9c0-0.5-0.4-0.9-0.9-0.9H3.9C3.4,4.9,3,5.4,3,5.9v0c0,0.5,0.4,0.9,0.9,0.9h16.2C20.6,6.8,21,6.4,21,5.9z" /><path d="M15.1,18.1L15.1,18.1c0-0.5-0.4-0.9-0.9-0.9H3.9c-0.5,0-0.9,0.4-0.9,0.9v0c0,0.5,0.4,0.9,0.9,0.9h10.2 C14.7,19.1,15.1,18.6,15.1,18.1z" /><path d="M21,14L21,14c0-0.5-0.4-0.9-0.9-0.9H3.9C3.4,13.1,3,13.5,3,14v0C3,14.6,3.4,15,3.9,15h16.2C20.6,15,21,14.6,21,14z" /></svg>
                        </div>
                        <div className="description-data flex col">
                            <h2>Description</h2>
                            <textarea cols="65" rows="40" placeholder='Add a more detailed description...'></textarea>
                        </div>
                    </div>
                    {checklist?.length > 0 && <div className='checklist'>
                        {checklist.length > 0 && <ChecklistList checklist={checklist} saveChecklistTask={onSaveChecklistTask} setIsDone={onSetIsDone} deleteClTask={onDeleteClTask} deleteChecklist={onDeleteChecklist} />}
                    </div>}
                    {attachments?.length > 0 && <AttachmentList attachments={attachments} removeAttachment={onRemoveAttachment} />}
                </div>

                <div className='task-edit flex col'>
                    <h3>Add to card</h3>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('members')}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor" /></svg>
                        <p>Members</p>
                    </div>
                    <div className='btn-edit-task-key label flex align-center' onClick={() => setModal('labels')}>
                        <svg viewBox="0 0 24 24" ><path d="M-37.2,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-37.2z" /><path d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path d="M4.9,19.1c-2.6-2.6-2.6-6.8,0-9.3l6.1-6.1c0.8-0.8,2-0.8,2.8,0l6.5,6.5c0.8,0.8,0.8,2,0,2.8l-6.1,6.1 C11.7,21.6,7.5,21.6,4.9,19.1z M12.6,4.9L6.3,11c-1.9,1.9-1.9,4.9,0,6.7s4.9,1.8,6.7,0l6.1-6.1L12.6,4.9z M7.9,16.1 c-1.1-1.1-1.1-3,0-4.1s3-1.1,4.1,0c1.1,1.1,1.1,3,0,4.1S9,17.3,7.9,16.1z M10.7,13.3c-0.4-0.4-1.1-0.4-1.5,0s-0.4,1.1,0,1.5 c0.4,0.4,1.1,0.4,1.5,0C11.1,14.4,11.1,13.7,10.7,13.3z" /></svg>
                        <p>Labels</p>
                    </div>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('checklist')}>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M5,3C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1H6c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H5z M20.6,4l-9.1,9.1 c-0.3,0.3-0.7,0.3-0.9,0L8.4,11c-0.4-0.4-1-0.4-1.4,0l0,0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3c0.4,0.4,1,0.4,1.4,0L22,5.4 c0.4-0.4,0.4-1,0-1.4v0C21.6,3.6,21,3.6,20.6,4z" /></svg>
                        <p>Checklist</p>
                    </div>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('dates')}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" /></svg>
                        <p>Dates</p>
                    </div>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('attachment')}>
                        <svg viewBox="0 0 24 24"><path d="M-38.3,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1l0,5.8 c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-38.3z" /><path d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path class="st0" d="M-130.8-5.5c0,11.2,0,22.4,0,33.6c-1.6,7.7-8.5,13.3-16.3,13.3c-7.9,0-14.7-5.6-16.3-13.3c0-11.2,0-22.4,0-33.6 c-1.2-8,4.9-14.4,10.9-14.4s12.1,6.5,10.9,14.4c0,9.7,0,19.3,0,29c-0.5,2.6-2.8,4.6-5.4,4.6s-5-1.9-5.4-4.6c0-9.7,0-19.3,0-29" /><g><path d="M9.6,21.1c-1.5,0-3.1-0.6-4.2-1.7c-2-2-2.3-5.1-0.8-7.5l0.1-0.2l7-7c0.8-1.1,2.1-1.8,3.5-1.9c1.3-0.1,2.5,0.3,3.3,1.1 c0.8,0.8,1.2,2,1.1,3.3c-0.1,1.4-0.8,2.7-1.9,3.5l-6.2,6.1c-1.1,0.7-2.5,0.6-3.4-0.3c-0.9-0.9-1-2.3-0.3-3.4L8,13.1L14.1,7 c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-6,6c-0.1,0.2-0.1,0.6,0.1,0.8c0.2,0.2,0.5,0.2,0.8,0.1l6.1-6.1c0.7-0.5,1.1-1.3,1.2-2.1 c0.1-0.7-0.1-1.3-0.5-1.7c-0.4-0.4-1-0.6-1.7-0.5c-0.8,0.1-1.6,0.5-2.1,1.2l-0.1,0.1l-7,7c-1,1.5-0.7,3.6,0.6,4.9 c1.3,1.3,3.3,1.5,4.9,0.6l7-7c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-7.2,7.2C11.9,20.8,10.7,21.1,9.6,21.1z" /></g></svg>
                        <p>Attachment</p>
                    </div>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('location')}>
                        <svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M12,1.4c-4.1,0-7.4,3.3-7.4,7.4c0,3.9,6.7,13,7,13.4l0.3,0.4c0,0,0.1,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1l0.3-0.4 c0.3-0.4,7-9.5,7-13.4C19.4,4.7,16.1,1.4,12,1.4z M12,4.7c2.3,0,4.1,1.8,4.1,4.1c0,2.3-1.8,4.1-4.1,4.1c-2.3,0-4.1-1.8-4.1-4.1 C7.9,6.5,9.7,4.7,12,4.7z" /></svg>
                        <p>Location</p>
                    </div>



                    <div className='btn-edit-task-key flex align-center'>
                        <svg viewBox="0 0 24 24" ><g class="st0"><path class="st1" d="M-38.3,3c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.8c0-0.6-0.4-1-1-1h0c-0.6,0-1,0.4-1,1 l0,5.8c0,0.6-0.4,1-1,1h-12c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h9.8c0.6,0,1-0.4,1-1v0c0-0.6-0.4-1-1-1H-38.3z" /><path class="st1" d="M-21.6,4l-9.1,9.1c-0.3,0.3-0.7,0.3-0.9,0l-2.1-2.1c-0.4-0.4-1-0.4-1.4,0v0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3 c0.4,0.4,1,0.4,1.4,0l10.3-10.3c0.4-0.4,0.4-1,0-1.4l0,0C-20.6,3.6-21.2,3.6-21.6,4z" /><path class="st2" d="M-79,24.7h-34.4c-2.1,0-3.7-1.7-3.7-3.7V-4.6h41.9V21C-75.3,23-76.9,24.7-79,24.7z" /><line class="st2" x1="-101.2" y1="5.6" x2="-91" y2="5.6" /><line class="st2" x1="-117.1" y1="-14.1" x2="-75.3" y2="-17.3" /></g><g><g><path d="M15.6,21H8.4C5.4,21,3,18.6,3,15.7V7.8H21v7.9C21,18.6,18.6,21,15.6,21z M5.3,10v5.7c0,1.7,1.4,3.1,3.1,3.1h7.3 c1.7,0,3.1-1.4,3.1-3.1V10H5.3z" /></g><g><path d="M13.9,13.8h-3.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h3.8c0.6,0,1.1,0.5,1.1,1.1S14.5,13.8,13.9,13.8z" /></g><g><path d="M4.2,6.5C3.6,6.5,3.1,6,3,5.4c0-0.6,0.4-1.2,1-1.2L19.8,3C20.4,3,20.9,3.4,21,4c0,0.6-0.4,1.2-1,1.2L4.2,6.5 C4.2,6.5,4.2,6.5,4.2,6.5z" /></g></g></svg>                        <p>Archive card</p>
                    </div>
                    {/* <button onClick={ev => onArchiveTask({ taskId: task.id, groupId })}>Archive card</button> */}

                </div>
            </div>

            {modalType && <div className='action-type-modal'>
                <div className='modal'>
                    {/* <h3>{modalType}</h3> */}
                    <DynamicModal type={modalType} />
                </div>
            </div>}
        </section>
    </section>
}