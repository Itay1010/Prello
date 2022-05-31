import { utilService } from '../../services/basic/util.service'
import { storageService } from '../basic/async-storage.service'




export const minisService = {
    query,
    // remove,
    // getById,
    // save,
    // getMembers
    // subscribe,
    // unsubscribe,
}

async function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?minis=${filterBy.minis}&sort=anaAref`
    try {
        // return await httpService.get(`board${queryStr}`)
        const res = await storageService.query(STORAGE_KEY)
        console.log('query - res', res)
        return res
    } catch (error) {
        throw _logError(error)
    }
}