import React, { useEffect, useState } from 'react'

export const Members = ({ saveMembers, boardMembers, task }) => {
    const [membersToDisplay, setMembersToDisplay] = useState(boardMembers)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (!filter) return setMembersToDisplay(boardMembers)
        const members = membersToDisplay.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()) || member.lastName.toLowerCase().includes(filter.toLowerCase()))
        // console.log('members', members);
        setMembersToDisplay(members)
    }, [filter])

    const handleChange = ({ target }) => {
        // console.log(target.value);
        setFilter(target.value)
    }

    const toggleMember = (memberId) => {
        if (task.members.includes(memberId)) {
            const idx = task.members.findIndex(member => member === memberId)
            task.members.splice(idx, 1)
        } else task.members.push(memberId)
        saveMembers(task)
    }

    return (
        <section className='members'>
            <button>x</button>
            <h2>Members</h2>
            <hr />
            <input onChange={(event) => handleChange(event)} type="text" value={filter} placeholder="Search members" />
            <h3>Board members</h3>
            {membersToDisplay.map(currMember => {
                return <div className='member flex space-between' onClick={() => toggleMember(currMember._id)} key={currMember._id}>
                    <div className='img-container'>
                        <img src={currMember.imgUrl} alt="member-img" />
                    </div>
                    <p>{`${currMember.firstName} ${currMember.lastName}`}</p>
                    {task.members.includes(currMember._id) && <div className='checked'>V</div>}
                </div>
            })}
        </section >
    )
}