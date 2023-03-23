import { Grid } from "@mui/material"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { NoteType } from "../../@types/common"
import style from './NoteContent.module.css'

type PropsType = {
    isEdit: boolean,
    setIsEdit: (isEdit: boolean) => void,
    allNotes: NoteType[],
    selectedNote: number,
    editNoteHandler: (event: any) => void
}

const NoteContent: FC<PropsType> = ({ isEdit, setIsEdit, allNotes, selectedNote, editNoteHandler }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    let found;
    const [content, setContent] = useState('')

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

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        editNoteHandler(e);
    }

    useEffect(() => {
        if (isEdit) {
            inputRef.current?.focus();
        }

    }, [isEdit])

    useEffect(() => {
        if (!!selectedNote) {
            found = allNotes.find(item => item.id === selectedNote);
            if (found) {
                setContent(found.content)
            }
        }
    }, [selectedNote])

    return (
        <Grid item sm={8} xs={6}
            padding={'10px'}
            textAlign={'left'}
        >
            <textarea
                value={content}
                onFocus={onClickHandler}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                className={style.edit}
                ref={inputRef}
            >
            </textarea>
        </Grid>
    )
}

export default NoteContent
