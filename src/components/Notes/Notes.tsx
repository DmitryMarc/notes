import AddIcon from '@mui/icons-material/Add'
import { Fab, Grid, List, Tooltip } from "@mui/material"
import { FC, MouseEvent } from "react"
import { NoteType } from '../../@types/common'
import Note from "./Note"

type PropsType = {
    isList: boolean,
    addNoteHandler: () => void,
    allNotes: NoteType[],
    selectedNote: number,
    setSelectedNote: (id: number) => void,
}

const getListStyle = (isList: boolean) => {
    return !isList ? { display: 'flex', flexWrap: 'wrap' } : null
}

const Notes: FC<PropsType> = ({ isList, addNoteHandler, allNotes, selectedNote, setSelectedNote }) => {

    const notes = allNotes.length
        ? allNotes.map((note, index) => {
            return <Note isList={isList} note={note} selectedNote={selectedNote} setSelectedNote={setSelectedNote} key={index} />
        }).reverse()
        : 'Add new notes'

    return (
        <Grid item sm={4} xs={6}
            borderRight={'1px solid lightgray'}
            sx={{ overflow: 'hidden' }}
            position={'relative'}
        >
            <List
                sx={getListStyle(isList)}
                style={{ height: '680px', overflowY: 'scroll', paddingRight: '17px', boxSizing: 'content-box', width: '100%' }}
            >
                {notes}
            </List>
            <Tooltip title="Add a note">
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'absolute', right: '10px', bottom: '10px', ':focus': { outline: 'none' } }}
                >
                    <AddIcon onClick={() => {
                        addNoteHandler();
                    }} />
                </Fab>
            </Tooltip>
        </Grid>
    )
}

export default Notes
