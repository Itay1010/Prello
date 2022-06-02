import React from "react";

export const ActivitiesList = ({ activities }) => {
    let reverseActivities = [...activities]
    reverseActivities = reverseActivities.reverse()
    const dateToDisplay = (createdAt) => {
        let diff = (Date.now() - createdAt) / 1000
        if (diff < 10) return 'Added a few seconds ago'
        if (diff <= 60) return `Added ${Math.floor(diff)} seconds ago `
        diff = diff / 60
        if (diff <= 60) return `Added ${Math.floor(diff)} ${diff < 1 ? 'minute ago' : 'minutes ago'} `
        diff = diff / 60
        if (diff <= 24) return `Added ${Math.floor(diff)} ${diff < 1 ? 'hour ago' : 'hours ago'}`
        const date = new Date(createdAt)
        return `Added at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `
    }


    return <div className="activities-list" >
        {reverseActivities.map((activity, idx) => {
            if (idx > 20) return
            const { action, byMember, receiver, createdAt } = activity
            return <div className="activity-wrapper">
                <img src={byMember.imgUrl} alt="" />
                <p>{byMember.firstName} {action} {receiver}</p>
                <span>{dateToDisplay(createdAt)}</span>
            </div>
        })}
    </div>
}

