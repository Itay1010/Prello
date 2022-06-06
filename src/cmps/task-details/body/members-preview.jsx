import React from 'react'

import { IAdd } from '../../icons/i-add'

export const MembersPreview = ({ task, setModalType, boardMembers }) => {
    return <div className='members flex col'>
        <h3>Members</h3>
        <section className='task-members flex'>
            {task.members.map(memberId => {
                const member = getMemberById(memberId, boardMembers)
                return <div className='member flex justify-center align-center' key={member._id}> <img src={member.imgUrl} alt='' /> </div>
            })}
            {setModalType && <div className='add-member flex justify-center align-center' onClick={() => setModalType('members')}> <IAdd /> </div>}
        </section>
    </div>
}
const getMemberById = (memberId, boardMembers) => {
    const member = boardMembers.filter(member => member._id === memberId)
    return member[0]
}