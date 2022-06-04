import React, { useRef, useState } from "react"

import { useForm } from "../../hooks/useForm"
import { IStar } from "../icons/i-star"
import { BoardPreview } from './board-preview'

export const BoardList = ({ boards, userId, toggleStar, createNewBoard }) => {
    const [isModalOpen, setModal] = useState(false)
    const imgs = ['https://images.unsplash.com/photo-1549849171-09f62448709e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzM2NTF8MHwxfHNlYXJjaHw1fHxzdW58ZW58MHx8fHwxNjU0MTU4OTYx&ixlib=rb-1.2.1&q=80&w=400',
        'https://images.unsplash.com/photo-1638913659197-46040471de1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzM2NTF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NDE3NzMxMA&ixlib=rb-1.2.1&q=80&w=400',
        'https://images.unsplash.com/photo-1653826531670-3a0ce374c725?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60',
        'https://images.unsplash.com/photo-1653592328269-09c14b3628f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60',
        'https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzM2NTF8MHwxfHNlYXJjaHw1fHxkYXJrfGVufDB8fHx8MTY1NDE4MjM2NQ&ixlib=rb-1.2.1&q=80&w=400',
        'https://images.unsplash.com/photo-1548391350-968f58dedaed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzM2NTF8MHwxfHNlYXJjaHw2fHxtb29ufGVufDB8fHx8MTY1NDE3MjU2MQ&ixlib=rb-1.2.1&q=80&w=400']
    // const img1 = 'https://images.unsplash.com/photo-1638913659197-46040471de1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzM2NTF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NDE3NzMxMA&ixlib=rb-1.2.1&q=80&w=400'
    // const img2 = 'https://images.unsplash.com/photo-1653826531670-3a0ce374c725?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60'
    // const img3 = 'https://images.unsplash.com/photo-1653592328269-09c14b3628f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60'
    const [backgroundOption, setBackgroundOption] = useState(imgs[0])
    const starredBoards = boards.filter(board => board.isStarred === true)

    const toggleModal = () => {
        setModal(!isModalOpen)
    }

    const [newBoard, handleTitleChange] = useForm({
        title: '',
        isStarred: false,
        backgroundOption: imgs[0]
    })

    const titleRef = useRef()

    const onCreateNewBoard = (ev) => {
        ev.preventDefault()
        createNewBoard(newBoard)
    }

    const onChooseBackground = (imgUrl) => {
        setBackgroundOption(imgUrl)
        newBoard.backgroundOption = imgUrl
    }

    return <div className="workspace-container">
        <section className="board-container">

            {starredBoards.length > 0 &&
                <React.Fragment>
                    <section className="board-preview-header flex align-center">
                        <IStar /><h1>Starred boards</h1>
                    </section>
                    <div className="boards-wrapper">
                        {starredBoards.map(board => {
                            return <BoardPreview key={board._id} board={board} toggleStar={toggleStar} />
                        })}
                    </div>
                </React.Fragment>}
        </section>
        <section className="board-container" >
            <section className="board-preview-header flex align-center">
                <h1>My boards</h1>
            </section>
            {boards.length > 0 &&
                <div className="boards-wrapper" >
                    <div className="new-board-btn-wrapper">
                        <div onClick={toggleModal} className="board-preview-body add-board-btn">
                            <p> Add new Board</p>
                        </div>
                        {isModalOpen && <div className='add-new-board-modal'>
                            <h2>Create board</h2>
                            <div className="img-container"><img src={backgroundOption} alt="" /></div>
                            <div className="choose-background">
                                {imgs.map(img => {
                                    return <div className="img-wrapper">
                                        <img onClick={() => onChooseBackground(img)} src={img} alt="" />
                                    </div >
                                })}

                            </div>
                            <form onSubmit={(event) => onCreateNewBoard(event)} action="">
                                <label htmlFor="">Board title</label>
                                <input value={newBoard.title} ref={titleRef} type="text" name="title" onChange={handleTitleChange} />
                                <button> Create</button>
                            </form>
                        </div>}
                    </div>
                    {boards.map((board, idx) => {
                        if (!board.isStarred) return <BoardPreview key={board._id} board={board} toggleStar={toggleStar} idx={idx} boardAmount={board.length} />
                    })}
                </div>}
            {isModalOpen && <div onClick={toggleModal} className="clear-screen"></div>}
        </section>
    </div>
}