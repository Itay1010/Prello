import React from 'react';
import { userService } from '../../../../services/user.service'
import { IClose } from '../../../icons/i-close'

export const UserModal = ({ closeModal }) => {
    const user = userService.getLoggedinUser()

    return <div className="user-modal flex col">
        <div className='modal-header flex'>
            <h2>Account</h2>
            <div className='btn-close-modal' onClick={closeModal}> <IClose /> </div>
        </div>
        <hr />
        <div className='user-info flex'>
            {user.imgUrl && <div className='img-container'> <img src={user.imgUrl} alt="" /></div>}
            {!user.imgUrl && <div className='img-container flex align-center justify-center' style={{ backgroundColor: user.color }}>
                <h2>{user.email.charAt(0)}</h2></div>
            }

            <div className='user-details flex col space-between'>
                <h3>{user.firstName}</h3>
                <p className='email'>offircarmi@gmail.com</p>
            </div>
        </div>
        <hr />
        <p className='opt' onClick={() => { userService.logout(); closeModal() }}>Log out</p>
    </div>
}


