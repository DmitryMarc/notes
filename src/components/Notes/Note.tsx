import { ListItem, ListItemText } from "@mui/material"
import { FC } from "react"

type PropsType = {
    isList: boolean, 
    index: number, 
    key: number
}

const Note:FC<PropsType> = ({isList, index, key}) => {
    return (
        <ListItem key={key} sx={{width: isList ? '100%' : '50%'}}>
            {index}
            <ListItemText primary="Photos" secondary="Jan 9, 2014..." />
        </ListItem>
    )
}

export default Note
