import React from 'react';
import { userService } from '../../../../services/user.service'
import { IClose } from '../../../icons/i-close'

export const UserModal = ({ closeModal, user, goLogin }) => {

    return <div className="user-modal flex col">
        <div className='modal-header flex'>
            <h2>Account</h2>
            <div className='btn-close-modal' onClick={closeModal}> <IClose /> </div>
        </div>
        <hr />
        <div className='user-info flex'>
            {user.imgUrl && <div className='img-container'> <img src={user.imgUrl} alt="" /></div>}
            {!user.imgUrl && <div className='img-container flex align-center justify-center' style={{ backgroundColor: user.color }}>
                <h2>{user.firstName.charAt(0)} {user.lastName.charAt(0)}</h2></div>
            }

            <div className='user-details flex col space-between'>
                <h3>{user.firstName}</h3>
                <p className='email'>offircarmi@gmail.com</p>
            </div>
        </div>
        <hr />
        {user._id === 'g100' && <p className='opt' onClick={() => { goLogin(); closeModal() }}>Login</p>}
        {user._id !== 'g100' && <p className='opt' onClick={() => { userService.logout(); closeModal() }}>Log out</p>}
    </div>
}


