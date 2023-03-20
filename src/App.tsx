import { Container, Divider, Grid, Stack } from '@mui/material'
import { FC, useState, useCallback } from 'react'
import './App.css'
import NoteContent from './components/NoteContent/NoteContent'
import Notes from './components/Notes/Notes'
import TopBar from './components/TopBar/TopBar'

const App: FC = () => { 
  const [isList, setIsList] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: 'ButtonFace', borderRadius: '20px', height: '90vh' }}
    >
      <Stack flexDirection={'column'} height={'100%'}>
        <TopBar isList={isList} setIsList={setIsList} isEdit={isEdit} setIsEdit={setIsEdit} />
        <Divider />
        <Grid container
          flexGrow={1}
          sx={{ overflow: 'hidden' }}
        >
          <Notes isList={isList} />
          <NoteContent isEdit={isEdit} setIsEdit={setIsEdit} />
        </Grid>
      </Stack>
    </Container>
  )
}

export default App
