import React from 'react'
import { ClTask } from './cl-task.jsx'

export const ClItemsList = ({ items }) => {
    console.log('poooooooooop')
    return < div className='cl-items-list' >
        {
            items.map(item => {
                return <ClTask key={item.id} item={item} />
            })
        }
    </div >
}