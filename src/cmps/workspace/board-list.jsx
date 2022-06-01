import React, { useRef, useState } from "react"
import { useForm } from "../../hooks/useForm"
import { BoardPreview } from './board-preview'

export const BoardList = ({ boards, userId, toggleStar, createNewBoard }) => {
    const [isModalOpen, setModal] = useState(false)
    const img1 = 'https://images.unsplash.com/photo-1653933889737-aa3b1453a450?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60'
    const img2 = 'https://images.unsplash.com/photo-1653826531670-3a0ce374c725?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60'
    const img3 = 'https://images.unsplash.com/photo-1653592328269-09c14b3628f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60'
    const [backgroundOption, setBackgroundOption] = useState(img1)
    const starredBoards = boards.filter(board => board.isStarred === true)

    const toggleModal = () => {
        setModal(!isModalOpen)
    }
    const [newBoard, handleTitleChange] = useForm({
        title: '',
        isStarred: false,
        backgroundOption: img1
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
            <section className="board-preview-header">
                <div className="icon-wrapper">
                    <h4>Star icon</h4>
                </div>
                <h1>Starred boards</h1>
            </section>
            {starredBoards.length > 0 &&
                <div className="boards-wrapper">
                    {starredBoards.map(board => {
                        return <BoardPreview key={board._id} board={board} toggleStar={toggleStar} />
                    })}
                </div>}
        </section>
        <section className="board-container" >
            <section className="board-preview-header">
                <div className="icon-wrapper">
                    <h4>icon</h4>
                </div>
                <h1>My boards</h1>
            </section>
            {boards.length > 0 &&
                <div className="boards-wrapper" >
                    {boards.map((board, idx) => {
                        return <BoardPreview key={board._id} board={board} toggleStar={toggleStar} idx={idx} boardAmount={board.length} />
                    })}
                </div>}
            <div className="new-board-btn-wrapper">
                <div onClick={toggleModal} className="board-preview-body add-board-btn">
                    Add new Board
                </div>
                {isModalOpen && <div className='add-new-board-modal'>
                    <h2>Create board</h2>
                    <div className="img-container"><img src={backgroundOption} alt="" /></div>
                    <div className="choose-background">
                        <div className="img-wrapper">
                            <img onClick={() => onChooseBackground(img1)} src={img1} alt="" />
                        </div >
                        <div className="img-wrapper">
                            <img onClick={() => onChooseBackground(img2)} src={img2} alt="" />
                        </div >
                        <div className="img-wrapper">
                            <img onClick={() => onChooseBackground(img3)} src={img3} alt="" />
                        </div >
                    </div>
                    <form onSubmit={(event) => onCreateNewBoard(event)} action="">
                        <label htmlFor="">Board title</label>
                        <input value={newBoard.title} ref={titleRef} type="text" name="title" onChange={handleTitleChange} />
                        <button> Create</button>

                    </form>
                </div>}
            </div>
        </section>
    </div>
}
