import React from 'react';
import { ColorSelect } from './group-color';


export const GroupModal = ({ groupInfo, setModal, archiveGroup, setColorSelect, isColorSelect, titleRef, onGroupColorChange }) => {

    return <div className='group-modal' >
        {/* <div className='screen'>screen</div> */}
        <section className='group-modal-header'>
            <h3>List actions</h3>
            <button className='close-modal' onClick={ev => setModal(false)}>
                <svg width='16' height='16' viewBox='0 0 24 24' ><path fillRule='evenodd' clipRule='evenodd' d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z' /></svg>
            </button>
        </section>
        {isColorSelect && <ColorSelect
            changColor={onGroupColorChange}
            groupInfo={groupInfo}
            closeModal={setColorSelect}

        />}

        {isColorSelect || <section className='modal-body'>
            <button className='btn' onClick={ev => {
                setModal(false)
                titleRef.current.focus()
            }}>Change title</button>
            <button className='btn' onClick={ev => {
                setColorSelect(true)
            }}>Change color</button>
            <button className='archive' onClick={ev => {
                archiveGroup(groupInfo.groupId)
                setModal(false)
            }}>Archive this list</button>
        </section>}
    </div >
}