import React, { useEffect, useState } from 'react';

import { boardService } from '../../../services/board/board.service'


export const Labels = ({ saveLabels }) => {
    const [labels, setLabels] = useState(boardService.getLabels())






    return <section className='labels'>
        <button>x</button>
        <h2>Labels</h2>
        <hr />
        {/* <input onChange={(event) => handleChange(event)} type="text" value={filter} placeholder="Search members" /> */}
        {labels.map(label => {
            return <div className='label' key={label} style={{ backgroundColor: label }}>

            </div>
        })}
    </section >
}