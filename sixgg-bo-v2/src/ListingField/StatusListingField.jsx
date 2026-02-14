import { Icon } from "@iconify/react"

export const StatusListingField = ({status}) => {
    switch(status){
        case 'activated':
            return <Icon icon="pajamas:status-active"  style={{color: "lime"}} />
        case 'verify':
            return <Icon icon="pajamas:status-active"  style={{color: "orange"}} />
        case 'signup':
            return <Icon icon="pajamas:status-active"  style={{color: "grey"}} />
        default:
            return <Icon icon="pajamas:status-active"  style={{color: "red"}} />
    }
}