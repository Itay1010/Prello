import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from "react"
import { userService } from "../../../../services/user.service";
import { UserModal } from './user-modal';

export const MemberProfile = () => {
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    const [loggedinUser, setLoggedinUser] = useState(null)
    // const [mem, setMem] = useState(null)

    useEffect(() => {
        const user = userService.getLoggedinUser() || userService.loginGuest()
        setLoggedinUser(user)
        
    }, [])


    const goLogin = () => {
        history.push(`/auth/login`)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    // console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrr', user);

    if (!loggedinUser) return <div className='go-login' onClick={goLogin}>Login</div>

    if (loggedinUser.imgUrl) {
        return <React.Fragment>
            <div className='profile' onClick={() => setIsModal(true)}>
                <img src={loggedinUser.imgUrl} alt={`${loggedinUser.firstName.charAt(0)}${loggedinUser.lastName.charAt(0)}`} />
            </div>
            {isModal && <UserModal closeModal={closeModal} user={loggedinUser} goLogin={goLogin} />}
        </React.Fragment>

    } else if (loggedinUser.color) {
        return <React.Fragment>
            {isModal && <UserModal closeModal={closeModal} user={loggedinUser} goLogin={goLogin} />}
            <div className='profile' style={{ backgroundColor: loggedinUser.color }} onClick={() => {
                setIsModal(true)
            }}>
                <h2>{`${loggedinUser.firstName.charAt(0)}${loggedinUser.lastName.charAt(0)}`}</h2>
            </div>
        </React.Fragment>
    }
}

