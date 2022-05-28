import { IAttachment } from "../icons/i-attachment"
import { IChecklist } from "../icons/i-checklist"
import { IComments } from "../icons/i-comments"

export function TaskBadges({ task }) {
    // console.log(task);
    if (!task.checklist && !task.attachments && !task.comments && !task.loaction) return <section className="badges"></section>

    return <section className="badges flex align-center">
        {task.checklist?.length > 0 && <div className="badge"> <IChecklist /></div>}
        {task.attachments?.length > 0 && <div className="badge"><IAttachment /></div>}
        {task.comments?.length > 0 && <div className="badge"><IComments /> </div>}
        {/*  {task.loaction?.length > 0 && <div className="badge">L</div>} */}
    </section>
}