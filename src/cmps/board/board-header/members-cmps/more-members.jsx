import React from 'react';

export const MoreMembersModal = ({ members }) => {

    return <section className='more-members-modal'>
        <section className='more-members-header'>
            <h1>More members</h1>
        </section>
        <hr />
        <section className='members-modal-body'>
            {members.map(member => {
                return <div className="member" key={member._id} >
                    <img src={member.imgUrl} alt="" />
                    <section className='member-info'>
                        <span className='full-name'>{`${member.firstName} ${member.lastName ? member.lastName : ''}`}</span>
                        <span className='email'>{`${member.email}`}</span>
                    </section>
                </div>
            })}
        </section>
    </section>
}