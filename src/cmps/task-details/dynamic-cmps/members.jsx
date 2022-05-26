import React from 'react'
import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { taskService } from '../../../services/board/task.service'

export const Members = ({ boardId }) => {
    const [members, setMembers] = useState(null)
    const [filter, setFilter] = useState({ txt: '' })

    useEffect(() => {
        loadMembers(boardId)
    }, [])

    const loadMembers = async () => {
        // const members = await boardService.getMembers()
        // console.log('test', members);
        // setMembers(members)
        // console.log(members);
    }

    return (
        <section className='members'>
            <button>x</button>
            <h2>Members</h2>
            <hr />

            <input type="text" value={filter.txt} onChange={filter} placeholder="Search members" />
            <h3>Board members</h3>
            {/* {members.map(member => {
                return <div className='member flex space-between'>
                    <div className='img-container'>
                        <img src={member.imgUrl} alt="" />
                    </div>
                </div>
            })} */}

        </section>
    )


}