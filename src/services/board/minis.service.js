import { httpService } from '../basic/http.service'
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/workspace'
    : 'http://localhost:3030/api/workspace/'


// import { utilService } from '../../services/basic/util.service'
// import { storageService } from '../basic/async-storage.service'




export const minisService = {
    // query,
    // remove,
    // getById,
    // save,
    // getMembers,
    saveMiniBoard
    // subscribe,
    // unsubscribe,
}

// async function query(filterBy) {
//     // var queryStr = (!filterBy) ? '' : `?minis=${filterBy.minis}&sort=anaAref`
//     try {
//         // return await httpService.get(`board${queryStr}`)
//         const res = await storageService.query(STORAGE_KEY)
//         console.log('query - res', res)
//         return res
//     } catch (error) {
//         throw _logError(error)
//     }
// }

async function saveMiniBoard(board) {
    console.log('in the mini board service')
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

        // try {
        //     const res = await axios.post(BASE_URL, board)
        //     return res.data
        // } catch (err) {
        //     console.log('Saving new board failed \n', err)
        //     throw err
        // }
    }
}