import { IMembers, IGroups, ITask, IUnassigned } from '../icons/icons'

export const SummaryBox = ({ title, data }) => {

    let icon

    switch (title) {
        case 'Members':
            icon = <IMembers />
            break;
        case 'Groups':
            icon = <IGroups />
            break;
        case 'Active cards':
            icon = <ITask />
            break;
        case 'Unassigned cards':
            icon = <IUnassigned />
            break;
        default:
            break;
    }

    return (
        <div className="box">
            {icon}
            <h4>{title}</h4>
            <h3>{data}</h3>
        </div>
    )
}