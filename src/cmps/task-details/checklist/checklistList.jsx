import React from 'react'
import { ChecklistItemPreview } from './checklist-item-preview.jsx'


export const ChecklistList = ({ checklist }) => {
    return <div className='checklist-list'>
        {checklist.map(item => {
            return <ChecklistItemPreview key={item.id} item={item} />
        })}
    </div>
}