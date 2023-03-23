import { ListItemButton, ListItemText } from "@mui/material"
import { FC } from "react"
import { NoteType } from "../../@types/common"

type PropsType = {
    isList: boolean,
    note: NoteType,
    selectedNote: number,
    setSelectedNote: (id: number) => void,
    key: number
}

const Note: FC<PropsType> = ({ isList, note, selectedNote, setSelectedNote, key }) => {
    return (
        <>
            <ListItemButton key={key}
                selected={selectedNote === note.id}
                onClick={() => setSelectedNote(note.id)}
                sx={{ width: isList ? '100%' : '50%' }}
            >
                <ListItemText primary={note.title} secondary={note.content} />
            </ListItemButton>
        </>
    )
}

export default Note
