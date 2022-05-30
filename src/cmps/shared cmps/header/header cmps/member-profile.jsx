import { userService } from "../../../../services/user.service";

export const MemberProfile = ({ boardMembers }) => {
    if (!boardMembers || boardMembers.length === 0) return
    // console.log(boardMembers);

    const user = userService.getLoggedinUser()
    // console.log(user);

    if (user.imgUrl) {
        return <div className='profile'>
            <img src={user.imgUrl} alt={`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`} />
        </div>
    } else if (user.color) {
        return <div className='profile' style={{ backgroundColor: user.color }}>
            <h2>`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`</h2>
        </div>
    }
}

