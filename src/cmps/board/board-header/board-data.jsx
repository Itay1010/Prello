import React, { useEffect, useRef, useState } from 'react'
import { TxtInputCmp } from '../../shared cmps/txt-input-cmp.jsx'
import { TextareaAutosize } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../store/board/board.action.js';
import { actService } from '../../../services/board/activity.service.js';


export const BoardData = ({ board, saveBoardHeader }) => {
    const dispatch = useDispatch()

    const [isBoardTitleEditable, setBoardTitleEditable] = useState(null)
    const [boardTitle, setBoardTitleValue] = useState(board.title)
    const boardTitleRef = useRef()
    const [width, setWidth] = useState(0);
    // useEffect(() => {
    //     setWidth(boardTitleRef.current.offsetWidth);
    // }, [boardTitle]);

    const handleBoardTitleChange = (value) => {
        // setWidth(target.value.length)
        setBoardTitleValue(value)
        const newBoard = JSON.parse(JSON.stringify(board))
        newBoard.title = value
        actService.activityTo('renamed this board to', newBoard, newBoard)
        dispatch(updateBoard(newBoard))
    }

    const toggleBoardTitleEditable = () => {
        if (isBoardTitleEditable) {
            setBoardTitleEditable(false)
        } else {
            setBoardTitleEditable(true)
            setBoardTitleValue(board.title)
        }
    }



    // console.log(board);
    return <section className="board-data flex align-center">
        <button>Dashboard</button>
        {/* <textarea maxRows={1}>{board.title}</textarea> */}

        {/* <div>{board.title}</div> */}
        {/* {!isBoardTitleEditable && <h2 onClick={toggleBoardTitleEditable}>{board.title ? board.title : 'Enter board title'}</h2>} */}

        {/* <TextareaAutosize
            rows={1}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }}
        /> */}
        <TxtInputCmp isBoardTitleEditable={isBoardTitleEditable}
            toggleContentEditable={toggleBoardTitleEditable}
            saveFunc={saveBoardHeader}
            contentInitialState={board.title}
            handleBoardTitleChange={handleBoardTitleChange}
        />
        <div className='btn-stared flex align-center justify-center'>
            <svg viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z" /></svg>
        </div>
    </section>
}