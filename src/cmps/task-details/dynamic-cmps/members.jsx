import React from 'react'
import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { boardService } from '../../../services/board/board.service'

export const Members = ({ boardId }) => {
    const params = useParams()
    const { taskId } = params


    const [task, setTask] = useState(null)
    const [members, setMembers] = useState(null)
    // const [filter, setFilter] = useState({ txt: '' })

    useEffect(() => {
        loadMembers(boardId)
        loadTask(taskId)


    }, [])

    const loadMembers = async (boardId) => {
        const board = await boardService.getById(boardId)
        console.log(board);
        setMembers(board.members)
    }

    const loadTask = async () => {
        const task = await boardService.getTask(boardId, 'g102', taskId)
        setTask(task)
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
            {task.members.map(member => {
                return <div className='member flex space-between'>
                    <div className='img-container'>
                        IMG {/* <img src={member.imgUrl} alt="" /> */}
                    </div>
                    <p>{`${member.firstName} ${member.lastName}`}</p>
                    {/* <input type="checkbox" value={} /> */}
                    <input type="checkbox" checked={false} />
                </div>
            })}
        </section>
    )


}