import React from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../../../../services/user.service'
import { onLogout } from '../../../../store/user/user.actions'
import { IClose } from '../../../icons/i-close'

export const UserModal = ({ closeModal, user, goLogin }) => {
    const dispatch = useDispatch()

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
                <p className='email'>{user.email}</p>
            </div>
        </div>
        <hr />
        {user._id[0] === 'g' && <p className='opt' onClick={() => {
            goLogin()
            closeModal()
        }}>Login</p>}
        {user._id[0] !== 'g' && <p className='opt' onClick={() => {
            
            dispatch(onLogout())
            closeModal()
        }
        }>Log out</p>}
    </div>
}


