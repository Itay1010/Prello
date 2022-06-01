import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { loadGuest } from "../../../../store/user/user.actions";
import { userService } from "../../../../services/user.service"
import { UserModal } from './user-modal'

export const MemberProfile = () => {
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    // const [loggedinUser, setLoggedinUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!loggedinUser) {
            dispatch(loadGuest())
        }

    }, [loggedinUser])

    const goLogin = () => {
        history.push(`/auth/login`)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    if (!loggedinUser) return <div className='go-login' onClick={goLogin}>Login</div>

    if (loggedinUser.imgUrl) {
        return <React.Fragment>
            <div className='profile flex align-center justify-center' onClick={() => setIsModal(true)}>
                <img src={loggedinUser.imgUrl} alt={`${loggedinUser.email.charAt(0)}`} />
            </div>
            {isModal && <UserModal closeModal={closeModal} user={loggedinUser} goLogin={goLogin} />}
        </React.Fragment>

    } else if (loggedinUser.color) {
        return <React.Fragment>
            {isModal && <UserModal closeModal={closeModal} user={loggedinUser} goLogin={goLogin} />}
            <div className='profile flex align-center justify-center' style={{ backgroundColor: loggedinUser.color }} onClick={() => {
                setIsModal(true)
            }}>
                <h2>{`${loggedinUser.email.charAt(0).toUpperCase()}`}</h2>
            </div>
        </React.Fragment>
    }
}

