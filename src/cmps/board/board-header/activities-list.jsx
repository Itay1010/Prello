import React from 'react';

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


    return <div className='activities-list' >
        {reverseActivities.map((activity, idx) => {
            if (idx > 20) return
            const { action, byMember, receiver, createdAt, entity, destination } = activity
            return <div key={activity.id} className='activity-wrapper'>
                {byMember.firstName === 'Guest' && <div className='guest-icon' style={{ backgroundColor: `${byMember.color}` }}>G</div>}
                {byMember.firstName !== 'Guest' && <img src={byMember.imgUrl} alt='' />}
                {action === 'added' && <p><span className='created-by-name'> {byMember.firstName}</span> {action} {receiver} "{entity.title}" to group "{destination.title}"</p>}
                {action === 'archived' && <p><span className='created-by-name'> {byMember.firstName}</span> {action} {receiver} '{entity.title}' of group '{destination.title}'</p>}
                {action === 'changed title' && <p><span className='created-by-name'> {byMember.firstName}</span> {action} of {receiver} to "{entity.title}"</p>}
                {action === 'changed color' && <p><span className='created-by-name'> {byMember.firstName}</span> {action} of {receiver} "{entity.title}" </p>}
                {action === 'moved' && <p><span className='created-by-name'> {byMember.firstName}</span> {action} {receiver} "{entity.title}" to group "{destination.title}"</p>}
                <span>{dateToDisplay(createdAt)}</span>
            </div>
        })}
    </div>
}

