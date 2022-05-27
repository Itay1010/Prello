import React from 'react'

export const ClTask = ({ item }) => {
    return <div className='cl-task'><div className='space'><input type="checkbox" onChange={() => console.log('yalla balagan')} /></div><span>{item.txt}</span></div>
}