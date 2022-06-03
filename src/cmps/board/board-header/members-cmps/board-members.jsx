import React, { useState } from 'react'
import { userService } from '../../../../services/user.service'
import { MembersPreview } from '../../../task-details/body/members-preview'
import { Members } from '../../../task-details/dynamic-cmps/members'
import { TaskMembers } from '../../../task-preview/task-members'
import { BoardMembersModal } from './board-members-modal'
import { BoardMembersSocial } from './board-members-social'

export const BoardMembers = ({ board }) => {

    const [selectedUser, setUser] = useState(null)

    // const getUsers = async () => {
    //     const users = await userService.getUsers()
    //     return users
    // }


    const memberToDisplay = board.members.length > 5 ? board.members.slice(0, 6) : board.members
    return <section className='board-members-header'>
        <section className='members-preview'>
            {memberToDisplay.map(member => {
                return <React.Fragment>
                    <div className="member" key={member._id} onClick={ev => setUser(member)}>
                        <img src={member.imgUrl} alt="" />
                    </div>
                </React.Fragment>
            })
            }
            {selectedUser && <BoardMembersModal member={selectedUser} setUser={setUser}/>}
        </section>
        {board.members.length > 5 && <button>{`+${board.members.length - memberToDisplay.length}`}</button>}

        <button className='share-board'>Share</button>
        {/* <section className='modal-header-members'>
            <BoardMembersSocial />
        </section> */}

    </section>
}