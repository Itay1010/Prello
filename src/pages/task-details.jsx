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
        // console.log(board)
        const groupToAdd = await board.groups.find(group => group.id === groupId)
        setGroup(groupToAdd)
        const task = await groupToAdd.tasks.find(task => task.id === taskId)
        // console.log('task', task)
        setTask(task)
    }
    useEffect(() => {
        onLoad()
    }, [])


    const setModal = (type) => {
        setModalType(type)
        // setModalType(type)
    }

    const saveMembers = (updatedTask, groupId) => {
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
        console.log(updatedTask)
    }

    const saveChecklist = (checklistTitle) => {
        console.log('checklistTitle', checklistTitle)
        console.log(task)
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

    const saveBoard = () => {
        dispatch(updateBoard(board))
    }

    const onSaveAttachment = (url) => {
        console.log(url)
        if (task.Attachments) {
            task.Attachments.push(url)
        } else {
            task.Attachments = [url]
        }
        setGroup(...group)
    }

    const DynamicModal = () => {
        switch (modalType) {
            case 'members':
                return <Members saveMembers={saveMembers} members={board.members} />
            case 'labels':
                return <Labels saveLabels={saveLabels} />
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
            {modalType && <div className='action-type-modal'>
                <h3>{modalType}</h3>
                <DynamicModal type={modalType} />
            </div>}
        </section>
    </section>
}