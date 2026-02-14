import { Icon } from "@iconify/react"

export const BooleanField = ({boolean}) => {
    return (
        boolean ? 
        <Icon icon="icon-park-solid:correct" style={{color: "green"}} />
        : 
        <Icon icon="emojione-monotone:cross-mark"  style={{color: "red"}} />
    )
}