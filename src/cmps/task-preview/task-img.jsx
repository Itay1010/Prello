export function TaskImage({ attachments }) {
    const imgUrl = attachments[0].url
    return <div className="img-container">
        <img src={imgUrl} alt="Attachment-preview" />
    </div>
}