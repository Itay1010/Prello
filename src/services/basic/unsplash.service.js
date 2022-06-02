import axios from "axios"
import { utilService } from "./util.service"

const UNSPLASH_KEY = 'tPOzx1nepGTnicfh8tWx4Be22XbskzoZaToa3RhwpWY'

export async function getPhoto(photoId = 'random') {
    const url = `https://api.unsplash.com/photos/${photoId}?client_id=${UNSPLASH_KEY}`
    let res = await axios.get(url)
    res = res.data
    const img = { avgColor: res.color, urls: res.urls, blurHash: res.blur_hash }
    return img
}

export async function getSearch(qString) {
    const url = `https://api.unsplash.com/photos/?query=${qString}&client_id=tPOzx1nepGTnicfh8tWx4Be22XbskzoZaToa3RhwpWY`
    let res = await axios.get(url)
    return res.data
}

export async function getPhotos() {
    const url = 'https://api.unsplash.com/photos/?orientation=portrait&client_id=tPOzx1nepGTnicfh8tWx4Be22XbskzoZaToa3RhwpWY'
    let res = await axios.get(url)
    return res.data
}