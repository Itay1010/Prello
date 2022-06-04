import React, { useState, useEffect } from 'react'
import { userService } from '../../../../services/user.service'
import { MembersPreview } from '../../../task-details/body/members-preview'
import { Members } from '../../../task-details/dynamic-cmps/members'
import { TaskMembers } from '../../../task-preview/task-members'
import { BoardMembersModal } from './board-members-modal'
import { BoardMembersSocial } from './board-members-social'

export const BoardMembers = ({ board, onChangeMembers }) => {

    const [selectedUser, setUser] = useState(null)
    const [isSocialOpen, setSocial] = useState(false)
    const [moreMembers, setMoreMembers] = useState({ members: null, isOpen: false })
    const [users, setUsers] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])


    const loadUsers = async () => {
        const users = await userService.getUsers()
        setUsers(users)
    }

    const memberToDisplay = board.members.length > 4 ? board.members.slice(0, 4) : board.members
    return <section className='board-members-header'>
        <section className='members-preview'>
            {memberToDisplay.map(member => {
                return <React.Fragment key={member._id}>
                    <div className="member" onClick={ev => setUser(member)}>
                        <img src={member.imgUrl} alt="" />
                    </div>
                </React.Fragment>
            })
            }
            {selectedUser && <BoardMembersModal
                member={selectedUser}
                setUser={setUser}
                onRemoveMember={onChangeMembers}
            />}
        </section>
        {board.members.length > 4 && <button>{`+${board.members.length - memberToDisplay.length}`}</button>}
        {/* {moreMembers.isOpen && } */}
        {isSocialOpen && <div className='members-screen' onClick={ev => setSocial(false)}></div>}
        <button className='share-board reset' onClick={ev => setSocial(prevState => !prevState)}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" stroke-miterlimit="10" stroke-width="32" d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M88 176v112m56-56H32"></path>
            </svg>
            Share
        </button>
        {isSocialOpen && <div className='members-screen' onClick={ev => setSocial(false)}>
            <BoardMembersSocial setSocial={setSocial} users={users} currentMembers={board.members} onChangeMembers={onChangeMembers} />
        </div>}
    </section>
}