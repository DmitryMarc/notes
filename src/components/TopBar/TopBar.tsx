import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ListIcon from '@mui/icons-material/List'
import { Grid, IconButton, Stack, Tooltip } from "@mui/material"
import { FC } from 'react'
import DeleteButton from './DeleteButton'
import FormatMenu from './FormatMenu/FormatMenu'
import SearchButton from './Search'

type PropsType = {
    isList: boolean,
    setIsList: (isList: boolean) => void,
    isEdit: boolean,
    setIsEdit:(isList: boolean) => void
}

const TopBar: FC<PropsType> = ({ isList, setIsList, isEdit, setIsEdit }) => {
    
    const handlerList = () => {
        if (!isList) {
            setIsList(true)
        }
    }
    const handlerTiles = () => {
        if (isList) {
            setIsList(false)
        }
    }

    const handlerEdit = () => {
        if (!isEdit) {
            setIsEdit(true)
        }
    }

    return (
        <Grid container >
            <Grid item sm={3} xs={4} textAlign='left'>
                <Tooltip title="List">
                    <IconButton
                        sx={{ ':focus': { outline: 'none' } }}
                        onClick={handlerList}
                    >
                        <ListIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Tiles">
                    <IconButton
                        sx={{ ':focus': { outline: 'none' } }}
                        onClick={handlerTiles}
                    >
                        <GridViewOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item sm={1} xs={2}
                textAlign='right'
                borderRight={'1px solid lightgray'}
            >
                <DeleteButton />
            </Grid>
            <Grid item sm={8} xs={6}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <Tooltip title="Edit">
                        <IconButton 
                            sx={{ ':focus': { outline: 'none' } }}
                            onClick={handlerEdit}
                            >
                            <BorderColorOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <FormatMenu />
                    <SearchButton />
                </Stack>
            </Grid>
        </Grid>
    )
}

export default TopBar
