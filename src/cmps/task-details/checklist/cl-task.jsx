import React, { useState } from 'react'
import { Members } from '../dynamic-cmps/members'

export const ClTask = ({ deleteClTask, item, setIsDone, checklistId, boardMembers, generalTask, saveMemberToClTask }) => {
    const [isModalOpen, setModal] = useState(false)

    const receivedItem = item
    const toggleIsDone = () => {
        receivedItem.isDone = !receivedItem.isDone
        setIsDone(checklistId, receivedItem)
    }

    const toggleModal = () => {
        setModal(!isModalOpen)
    }

    const onDeleteClTask = (clTaskId) => {
        // deleteClTask(item.id)
        deleteClTask(clTaskId)
    }

    const onSaveClMembers = (member) => {
        saveMemberToClTask(member, item.id)
        setModal(false)
    }




    return <div className='cl-task-wrapper'>
        <div className='checkbox-wrapper'>
            <input type="checkbox" onChange={toggleIsDone} checked={receivedItem.isDone ? 'checked' : ''} />
        </div>

        <div className='cl-task'>
            <p>{receivedItem.txt}</p>
            <div className='cl-task-buttons'>
                {!item.member && <a onClick={toggleModal} className='user-btn'><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z" fill="currentColor" /></svg></a>}
                {item.member && <a onClick={toggleModal} className='user-btn'><img src={item.member.imgUrl} alt="" /></a>}
                <a onClick={() => onDeleteClTask(item.id)} className='delete-btn'><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg>
                </a>
            </div>
            {isModalOpen && <div className='modal'><Members saveMemberToCl={onSaveClMembers} boardMembers={boardMembers} task={generalTask} closeModal={toggleModal} type={'checklist'} /> </div>}
        </div>
    </div>
}