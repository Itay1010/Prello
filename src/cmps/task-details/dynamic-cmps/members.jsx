import React from 'react'
import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { boardService } from '../../../services/board/board.service'

export const Members = () => {
    const params = useParams()
    const { boardId, groupId, taskId } = params


    const [task, setTask] = useState(null)
    const [members, setMembers] = useState(null)
    // const [filter, setFilter] = useState({ txt: '' })

    useEffect(() => {
        loadMembers(boardId)
        loadTask(taskId)
    }, [])

    const loadMembers = async (boardId) => {
        const board = await boardService.getById(boardId)
        console.log('board.members', board.members);
        setMembers(board.members)
    }

    const loadTask = async () => {
        const task = await boardService.getTask(boardId, groupId, taskId)
        console.log('task', task);
        setTask(task)
    }

    const toggleMember = (memberId) => {
        console.log(memberId);
        if (task.members.includes(memberId)) {
            console.log(task.members);
            const idx = task.members.findIndex(member => member === memberId)
            console.log(idx);
        } else {
            console.log('not included');
        }
        // const members = task.members.filter(member => member.id !== memberId)
        // console.log(members);
        // const taskToSave = { ...task, members }
        // setTask(taskToSave)
    }

    // const boardMembers = async () => {
    //     return await boardService.getMembers()
    // }

    // if (boardMembers.length === 0) return <div>loading...</div>
    if (!members || members.length === 0) return <div>loading...</div>
    // if (!task.members) return <div>loading...</div>
    return (
        <section className='members'>
            <button>x</button>
            <h2>Members</h2>
            <hr />
            {/* <input type="text" value={filter.txt} onChange={filter} placeholder="Search members" /> */}
            <h3>Board members</h3>
            {members.map(member => {
                return <div className='member flex space-between' onClick={() => toggleMember(member._id)}>
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