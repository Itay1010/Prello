
// FETCH
export const getCloudUrl = (url, hight = 100) => {
    const CLOUD_NAME = 'di5o0obqy' // Insert yours
    const FETCH_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/h_${hight},c_limit/e_improve/${url}`
    return FETCH_URL
}

export const uploadImg = async (ev) => {
    // Defining our variables
    const UPLOAD_PRESET = 'jbxr9ubh' // Insert yours
    const CLOUD_NAME = 'di5o0obqy' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        const { url } = await res.json()
        return url;
        // return elImg
    } catch (err) {
        console.error('ERROR!', err)
    }
}