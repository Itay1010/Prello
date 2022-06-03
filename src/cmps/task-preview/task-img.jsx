export function TaskImage({ attachment }) {
    // console.log('attachment', attachment)
    // const imgUrl = attachments[0].url
    return <div className="img-container">
        <img src={attachment} alt="Attachment-preview" />
    </div>
}
// export function TaskImage({ attachments }) {
//     const imgUrl = attachments[0].url
//     return <div className="img-container">
//         <img src={imgUrl} alt="Attachment-preview" />
//     </div>
// }