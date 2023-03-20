import { Grid } from "@mui/material"
import { FC, useRef, useEffect } from "react"
import style from './NoteContent.module.css'

type PropsType = {
    isEdit: boolean, 
    setIsEdit: (isEdit: boolean) => void
}

const NoteContent: FC<PropsType> = ({isEdit, setIsEdit}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const onClickHandler = () => {
        if (!isEdit) {
            setIsEdit(true);
        }
    }
    const onBlurHandler = () => {
        if (isEdit) {
            setIsEdit(false);
        }
    }

    useEffect(() => {
        if(isEdit){
            inputRef.current?.focus();
        }

    },[isEdit])

    return (
        <Grid item sm={8} xs={6}
            padding={'10px'}
            textAlign={'left'}
        >
            <textarea
                value={'Ало, ну как там с деньгами?'}
                onFocus={onClickHandler}
                onBlur={onBlurHandler}
                className={style.edit}
                ref={inputRef}
            >
            </textarea>
        </Grid>
    )
}

export default NoteContent
