// import React, { useEffect, useState } from 'react'

// import { boardService } from '../../../services/board/board.service'

// export const Members = ({ saveMembers, boardMembers, task }) => {

//     // console.log(boardMembers);
//     // console.log(task);

//     const [taskToUpdate, setTaskToUpdate] = useState(task)
//     const [membersToDisplay, setMembersToDisplay] = useState(boardMembers)
//     const [filter, setFilter] = useState('')

//     // }, [filter, members])
//     useEffect(() => {
//         if (!filter) setMembersToDisplay(boardMembers)
//         const members = membersToDisplay.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()) || member.lastName.toLowerCase().includes(filter.toLowerCase()))
//         console.log('members', members);
//         setMembersToDisplay(members)
//     }, [filter])
//     // }, [filter, members])



//     const handleChange = ({ target }) => {
//         setFilter(target.value)


//         // let membersToDisaplay = []
//         // if (filter) membersToDisaplay = boardMembers.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()) || member.lastName.toLowerCase().includes(filter.toLowerCase()))
//         // setMembers(membersToDisaplay)
//     }


//     // const toggleMember = (memberId) => {
//     //     if (task.members.includes(memberId)) {
//     //         const idx = task.members.findIndex(member => member === memberId)
//     //         task.members.splice(idx, 1)
//     //         saveMembers(task, groupId)
//     //     } else {
//     //         task.members.push(memberId)
//     //         saveMembers(task, groupId)
//     //     }
//     // }

//     return (
//         <section className='members'>
//             <button>x</button>
//             <h2>Members</h2>
//             <hr />
//             <input onChange={(event) => handleChange(event)} type="text" value={filter} placeholder="Search members" />
//             <h3>Board members</h3>
//             {membersToDisplay.map(currMember => {
//                 // return <div className='member flex space-between' onClick={() => toggleMember(member._id)} key={member._id}>
//                 return <div className='member flex space-between' key={currMember._id}>
//                     <div className='img-container'>
//                         IMG <img src={currMember.imgUrl} alt="" />
//                     </div>
//                     <p>{`${currMember.firstName} ${currMember.lastName}`}</p>
//                     {taskToUpdate.members.includes(currMember._id) && <div className='checked'>V</div>}
//                 </div>
//             })}
//         </section >
//     )
// }



import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { boardService } from '../../../services/board/board.service'

export const Members = ({ saveMembers }) => {
    const params = useParams()
    const { boardId, groupId, taskId } = params

    const [task, setTask] = useState(null)
    const [members, setMembers] = useState(null)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        loadMembers(boardId, filter)
        loadTask(taskId)

    }, [])

    useEffect(() => {
        loadMembers(boardId, filter)
    }, [filter, members])

    const loadMembers = async (boardId, filter) => {
        const board = await boardService.getById(boardId)
        if (filter) {
            const filteredMembers = board.members.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()) || member.lastName.toLowerCase().includes(filter.toLowerCase()))
            setMembers(filteredMembers)
        } else setMembers(board.members)

    }

    const loadTask = async () => {
        const task = await boardService.getTask(boardId, groupId, taskId)
        setTask(task)
    }

    const handleChange = ({ target }) => {
        setFilter(target.value)
    }

    const toggleMember = (memberId) => {
        if (task.members.includes(memberId)) {
            const idx = task.members.findIndex(member => member === memberId)
            task.members.splice(idx, 1)
            saveMembers(task)
        } else {
            task.members.push(memberId)
            saveMembers(task)
        }
    }

    if (!members || members.length === 0) return <div>loading...</div>
    return (
        <section className='members'>
            <button>x</button>
            <h2>Members</h2>
            <hr />
            <input onChange={(event) => handleChange(event)} type="text" value={filter} placeholder="Search members" />
            <h3>Board members</h3>
            {members.map(member => {
                return <div className='member flex space-between' onClick={() => toggleMember(member._id)} key={member._id}>
                    <div className='img-container'>
                        IMG <img src={member.imgUrl} alt="" />
                    </div>
                    <p>{`${member.firstName} ${member.lastName}`}</p>
                    {task.members.includes(member._id) && <div className='checked'>V</div>}
                </div>
            })}
        </section >
    )
}