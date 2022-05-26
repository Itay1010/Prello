import React from 'react'

export const ClTask = ({ item }) => {
    return <div className='cl-task'><div className='space'><input type="checkbox" /></div><span>{item.txt}</span></div>
}