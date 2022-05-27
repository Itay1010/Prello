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

// ACTIONS
import { updateBoard } from '../store/board/board.action'

// SERVICES
import { utilService } from '../services/basic/util.service.js';



export const TaskDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { boardId, groupId, taskId } = params
    const history = useHistory()
    const { board } = useSelector(storeState => storeState.boardModule)
    const [group, setGroup] = useState(null)
    const [task, setTask] = useState(null)
    // const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(null)


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

    // const saveMembers = (updatedTask, groupId) => {
    //     // console.log('board before change', board);
    //     const group = board.groups.find(group => group.id === groupId)
    //     const idx = group.tasks.findIndex(task => task.id === updatedTask.id)
    //     const currtask = group.tasks[idx]
    //     currtask.members = updatedTask.members
    //     setTask(currtask)
    //     // console.log('currtask', currtask);
    //     // console.log('task', task);
    //     saveBoard()
    // }

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
            checklistTaskId: utilService.makeId()
        }

        const checklistTask = task.checklist.find(clTask => clTask.id === clTaskId)
        checklistTask.items.push(newItem)
        console.log(checklistTask)
        console.log(taskId)

        saveBoard()
    }

    const onSaveAttachment = (url) => {
        if (task.Attachments) {
            task.Attachments.push(url)
        } else {
            task.Attachments = [url]
        }
        setGroup(group)
        saveBoard()
    }
    const saveBoard = () => {

        dispatch(updateBoard(board))
    }


    const DynamicModal = () => {
        switch (modalType) {
            case 'members':
                return <Members saveMembers={saveMembers} boardMembers={board.members} task={task} />
            case 'labels':
                return <Labels saveLabels={saveLabels} task={task} />
            case 'checklist':
                return <Checklist saveChecklist={saveChecklist} group={group} />
            case 'dates':
                return <Dates />
            case 'attachment':
                return <Attachment saveAttachment={onSaveAttachment} />
            case 'location':
                return <Location />
            default:
                break;
        }
    }

    // const onArchiveTask = async (task) => {
    //     taskService.archiveTask(task, board)
    // }
    // 
    // console.log(task)

    if (!group || !task) return <React.Fragment></React.Fragment>
    const { checklist } = task
    return <section onClick={onGoBack} className='task-details-shadow flex justify-center'>
        <section className='task-details flex col' onClick={(event) => event.stopPropagation()}>

            <div className='task-header flex'>
                <div className='close-modal flex justify-center align-center'><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
                <div className='icon'></div>
                <div className="data">
                    <h2 className='task-title'>{task.title}</h2>
                    <p>in list <a href="">{group.title}</a></p>
                </div>
            </div>

            <div className='task-container flex space-between'>
                <div className="task-content">
                    {checklist?.length > 0 && <div className='task-content'>
                        {checklist.length > 0 && <ChecklistList checklist={checklist} saveChecklistTask={onSaveChecklistTask} />}
                    </div>}
                </div>

                <div className='task-edit flex col'>
                    <h3>Add to card</h3>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('members')}>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor" /></svg>
                        <p>Members</p>
                    </div>
                    <div className='btn-edit-task-key label flex align-center' onClick={() => setModal('labels')}>

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
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('dates')}>

                        <p>Attachment</p>
                    </div>
                    <div className='btn-edit-task-key flex align-center' onClick={() => setModal('location')}>
                        <svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M12,1.4c-4.1,0-7.4,3.3-7.4,7.4c0,3.9,6.7,13,7,13.4l0.3,0.4c0,0,0.1,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1l0.3-0.4 c0.3-0.4,7-9.5,7-13.4C19.4,4.7,16.1,1.4,12,1.4z M12,4.7c2.3,0,4.1,1.8,4.1,4.1c0,2.3-1.8,4.1-4.1,4.1c-2.3,0-4.1-1.8-4.1-4.1 C7.9,6.5,9.7,4.7,12,4.7z" /></svg>
                        <p>Location</p>
                    </div>



                    <button>Archive card</button>
                    {/* <button onClick={ev => onArchiveTask({ taskId: task.id, groupId })}>Archive card</button> */}

                </div>
            </div>

            {modalType && <div className='action-type-modal'>
                <div className='modal'>
                    <h3>{modalType}</h3>
                    <DynamicModal type={modalType} />
                </div>
            </div>}
        </section>
    </section>
}