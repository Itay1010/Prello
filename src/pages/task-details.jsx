import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Members } from '../cmps/task-details/dynamic-cmps/members.jsx';
import { Labels } from '../cmps/task-details/dynamic-cmps/labels.jsx'
import { Checklist } from '../cmps/task-details/dynamic-cmps/checklist.jsx'
import { Dates } from '../cmps/task-details/dynamic-cmps/dates.jsx'
import { Attachment } from '../cmps/task-details/dynamic-cmps/attachment.jsx'
import { Location } from '../cmps/task-details/dynamic-cmps/location.jsx'


import { taskService } from '../services/board/task.service'
import { groupService } from '../services/board/group.service.js';



export const TaskDetails = () => {
    const params = useParams()
    const { boardId, groupId, taskId } = params
    const history = useHistory()
    const [group, setGroup] = useState(null)
    const [task, setTask] = useState(null)
    // const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(null)


    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    async function onLoad() {
        const groupToAdd = await groupService.getGroupById(groupId, boardId)
        setGroup(groupToAdd)
        const task = groupToAdd.tasks.find(task => task.id === taskId)
        setTask(task)

    }
    useEffect(() => {
        onLoad()
    }, [])


    const setModal = (type) => {
        setModalType(type)
        // setModalType(type)
    }

    const saveChecklist = (checklistTitle) => {
        const newChecklist = {
            title: checklistTitle,
            items: []
        }
        const task = group.tasks.find(task => task.id === taskId)
        if (task.checklist) {
            task.checklist.push(newChecklist)
        } else {
            task.checklist = [newChecklist]
        }
        setGroup(group)
        groupService.editChecklist(group, groupId)

    }

    const onSaveAttachment = (url) => {
        console.log(url)
        if (task.Attachments) {
            task.Attachments.push(url)
        } else {
            task.Attachments = [url]
        }
        setGroup(group)
        groupService.editChecklist(group, groupId)


    }
    const DynamicModal = () => {
        switch (modalType) {
            case 'members':
                return <Members />
            case 'labels':
                return <Labels />
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
            {modalType && <div className='action-type-modal'>
                <h3>{modalType}</h3>
                <DynamicModal type={modalType} />
            </div>}
        </section>
    </section>
}