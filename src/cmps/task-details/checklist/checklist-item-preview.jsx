import React from 'react'


export const ChecklistItemPreview = ({ item }) => {
    const { title } = item
    console.log(item)
    return <div className='checklist-item-preview'>
        <div className='checklist-item-header'>
            <div className='checklist-side-icons'>
                <div>icon</div>
                <span>%</span>
            </div>
            <div className='item-content'>
                <div className='checklist-item-header'>
                    <h2>{title}</h2>
                    <button>delete</button>
                </div>
                <div>% Bar</div>
                <div className='checklist-item-footer'>
                    <button>Add an item</button>
                </div>
            </div>
        </div>
    </div>
}