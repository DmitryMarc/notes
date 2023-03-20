import AddIcon from '@mui/icons-material/Add'
import { Fab, Grid, List, Tooltip } from "@mui/material"
import { FC } from "react"
import Note from "./Note"

type PropsType = {
    isList: boolean
}

const getListStyle = (isList: boolean) => {
    return !isList ? { display: 'flex', flexWrap: 'wrap' } : null
}

const Notes: FC<PropsType> = ({ isList }) => {
    const fakeArr = [...Array(100)].map((_, index) => {
        return <Note isList={isList} index={index} key={index} />
    }).reverse()

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
                {fakeArr}
            </List>
            <Tooltip title="Add a note">
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'absolute', right: '10px', bottom: '10px', ':focus': { outline: 'none' } }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Grid>
    )
}

export default Notes
