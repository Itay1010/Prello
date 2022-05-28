import React from "react"

export function TaskMembers({ members }) {
    return members.map(member => <div className="member" key={member._id}>
        <img src={member.imgUrl} alt="" />
    </div>)
}