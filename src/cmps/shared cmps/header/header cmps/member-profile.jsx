import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from "react"
import { userService } from "../../../../services/user.service";
import { UserModal } from './user-modal';

export const MemberProfile = ({ boardMembers }) => {
    const history = useHistory()
    const [isModal, setIsModal] = useState(false)
    // const [mem, setMem] = useState(null)

    // useEffect(() => {
    //     setMem(boardMembers)
    // }, [isModal])

    if (!boardMembers || boardMembers.length === 0) return

    const goLogin = () => {
        history.push(`/auth/login`)
    }

    const closeModal = () => {
        console.log('yayyyyy');
        setIsModal(false)
    }

    const user = userService.getLoggedinUser()

    if (!user) return <div className='go-login' onClick={goLogin}>Login</div>

    if (user.imgUrl) {
        return <React.Fragment>
            <div className='profile' onClick={() => setIsModal(true)}>
                <img src={user.imgUrl} alt={`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`} />
            </div>
            {isModal && <UserModal closeModal={closeModal} />}
        </React.Fragment>

    } else if (user.color) {
        return <div className='profile' style={{ backgroundColor: user.color }} onClick={() => setIsModal(true)}>
            <h2>`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`</h2>
        </div>
    }
}

