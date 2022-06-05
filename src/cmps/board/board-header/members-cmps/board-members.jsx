import React, { useState, useEffect } from 'react'
import { userService } from '../../../../services/user.service'
import { BoardMembersModal } from './board-members-modal'
import { BoardMembersSocial } from './board-members-social'
import { MoreMembersModal } from './more-members'

export const BoardMembers = ({ board, onChangeMembers }) => {

    const [selectedUser, setUser] = useState(null)
    const [isSocialOpen, setSocial] = useState(false)
    const [isMoreOpen, setMoreOpem] = useState(true)
    const [users, setUsers] = useState(null)
    const limit = 4

    useEffect(() => {
        loadUsers()
    }, [])


    const loadUsers = async () => {
        const users = await userService.getUsers()
        setUsers(users)
    }

    const memberToDisplay = board.members.slice(0, limit)
    const leftOvers = board.members.slice(limit)
    console.log('BoardMembers - memberToDisplay', memberToDisplay)

    return <section className='board-members-header'>
        <section className='members-preview'>
            {memberToDisplay.map(member => {
                return <React.Fragment key={member._id}>
                    <div className="member" onClick={ev => setUser(member)}>
                        {
                            member.imgUrl ? <img src={member.imgUrl} alt="" /> :
                                <div style={({ backgroundColor: `${member.color}` })} className='profile-color'></div>
                        }
                    </div>
                </React.Fragment>
            })
            }
            {selectedUser && <BoardMembersModal
                member={selectedUser}
                setUser={setUser}
                onRemoveMember={onChangeMembers}
            />}
            {/* <MoreMembersModal members={memberToDisplay} /> */}
        </section>
        {leftOvers.length && <button className='extra-btn reset'>{`+${leftOvers.length}`}</button>}
        {isSocialOpen && <div className='members-screen' onClick={ev => setSocial(false)}></div>}
        <button className='share-board reset' onClick={ev => setSocial(prevState => !prevState)}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M88 176v112m56-56H32"></path>
            </svg>
            Share
        </button>
        {isSocialOpen && <div className='members-screen' onClick={ev => setSocial(false)}>
            <BoardMembersSocial setSocial={setSocial} users={users} currentMembers={board.members} onChangeMembers={onChangeMembers} />
        </div>}
    </section>
}