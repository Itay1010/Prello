import { httpService } from '../basic/http.service'
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/workspace'
    : 'http://localhost:3030/api/workspace/'

export const minisService = {
    saveMiniBoard
}

async function saveMiniBoard(board) {
    if (board._id) {
        try {
            // return httpService.put(`workspace/${board._id}`, board)
            const res = await httpService.put(`workspace/${board._id}`, board)
            return res
        } catch (err) {
            console.log('Saving board failed \n', err)
            throw err
        }
    } else {
        console.log(board)
        return httpService.post('workspace', board)

    }
}