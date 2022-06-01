import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"

import { IAttachment } from "../icons/i-attachment"
import { IChecklist } from "../icons/i-checklist"
import { IComments } from "../icons/i-comments"
import { IDescription } from "../icons/i-description"
import { IWatch } from "../icons/i-watch"

export function TaskBadges({ task, getClStatus }) {
    const { user } = useSelector((storeState) => storeState.userModule)
    if (!task.checklist && !task.attachments && !task.comments && !task.loaction && !task.members) return <section className="badges"></section>

    if (!user && task.members?.length > 0) return

    return <section className="badges flex align-center">
        {task.members?.length > 0 && task.members.includes(user._id) && <div className="badge"> <IWatch /> </div>}
        {task.description && <div className="badge"> <IDescription /> </div>}
        {task.checklist?.length > 0 && <div className="badge flex"> <IChecklist /> <p>{getClStatus(task)}</p> </div>}
        {task.attachments?.length > 0 && <div className="badge"><IAttachment /></div>}
        {task.comments?.length > 0 && <div className="badge"><IComments /> </div>}
        {/*  {task.loaction?.length > 0 && <div className="badge">L</div>} */}
        {/*  {task.activities?.length > 0 && <div className="badge">L</div>} */}
    </section>
}