import React, { useEffect, useState } from 'react';
import { boardService } from "../../../../services/board/board.service";
export const BoardMembersSocial = ({ setSocial, users, currentMembers, onChangeMembers }) => {
    const [membersToDisplay, setMembersToDisplay] = useState(users)
    const [filter, setFilter] = useState('')


    useEffect(() => {
        if (!filter) return setMembersToDisplay(users)
        const members = membersToDisplay.filter(member =>
            member.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            member.lastName.toLowerCase().includes(filter.toLowerCase())
        )
        setMembersToDisplay(members)
    }, [filter])

    const handleChange = ({ target }) => {
        setFilter(target.value)
    }

    if (!users) return <React.Fragment />
    return <section className='board-social-modal' onClick={ev => ev.stopPropagation()}>
        <section className='modal-header'>
            <h3>Share board</h3>
            <button className='close-modal reset' onClick={ev => setSocial(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg>
            </button>
        </section>
        <section className='modal-body'>
            <input type="text" className='search-member' value={filter} onChange={ev => setFilter(ev.target.value)} />
            <section className='user-list'>
                {membersToDisplay.map(user => {
                    return <div className="member" key={user._id} >
                        <img src={user.imgUrl} alt="" />
                        <section className='user-info' onClick={ev => onChangeMembers(user)}>
                            <span className='full-name'>{`${user.firstName} ${user.lastName ? user.lastName : ''}`}</span>
                            <span className='email'>{`${user.email}`}</span>
                        </section>
                        {
                            currentMembers.find(member => member._id === user._id) ?
                                <svg viewBox="0 0 24 24" width="18px">
                                    <path d="M19,5.2L8.5,15.8c-0.3,0.3-0.8,0.3-1.1,0L5,13.3c-0.5-0.5-1.2-0.5-1.6,0l0,0c-0.5,0.5-0.5,1.2,0,1.6l3.8,3.8 c0.5,0.5,1.2,0.5,1.6,0L20.7,6.9c0.5-0.5,0.5-1.2,0-1.6l0,0C20.2,4.8,19.5,4.8,19,5.2z"></path>
                                </svg>
                                :
                                ''
                        }
                    </div>
                })}

            </section>
        </section>
    </section>
}