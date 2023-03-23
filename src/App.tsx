import { Container, Divider, Grid, Stack } from '@mui/material'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import './App.css'
import NoteContent from './components/NoteContent/NoteContent'
import Notes from './components/Notes/Notes'
import TopBar from './components/TopBar/TopBar'

const idb = window.indexedDB;

const unitIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("notes-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("notesData")) {
      db.createObjectStore("notesData", { keyPath: "id" });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
  };
};

const App: FC = () => {
  let refId = useRef(0);
  const [isList, setIsList] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(0);

  useEffect(() => {
    unitIndexedDb();
    getAllData();
  }, []);


  const getAllData = () => {
    const dbPromise = idb.open("notes-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("notesData", "readonly");
      var notesData = tx.objectStore("notesData");
      const notes = notesData.getAll();

      notes.onsuccess = (query) => {
        //@ts-ignore
        setAllNotes(query?.srcElement?.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };

  const addNoteHandler = () => {
    const dbPromise = idb.open("notes-db", 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("notesData", "readwrite");
      var notesData = tx.objectStore("notesData");

      refId.current++;
      const notes = notesData.put({
        id: refId.current,
        title: 'New note',
        content: 'Some text'
      });

      console.log("add");
      notes.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        alert("Note added!");
        getAllData();
      }
    };
  };

  const editNoteHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const dbPromise = idb.open("notes-db", 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("notesData", "readwrite");
      var notesData = tx.objectStore("notesData");

      const notes = notesData.put({
        id: selectedNote,
        title: event.target.value,
        content: event.target.value
      });
      console.log("edit");

      notes.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };

        getAllData();
        event.preventDefault();
      };
    }
  }

  const deleteSelected = (noteId: number) => {
    const dbPromise = idb.open("notes-db", 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;
      var tx = db.transaction("notesData", "readwrite");
      var notesData = tx.objectStore("notesData");
      const deleteNote = notesData.delete(noteId);

      deleteNote.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        alert("Note deleted!");
        getAllData();
      };
    };
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: 'ButtonFace', borderRadius: '20px', height: '90vh' }}
    >
      <Stack flexDirection={'column'} height={'100%'}>
        <TopBar isList={isList}
          setIsList={setIsList}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedNote={selectedNote}
          deleteSelected={deleteSelected} />
        <Divider />
        <Grid container
          flexGrow={1}
          sx={{ overflow: 'hidden' }}
        >
          <Notes isList={isList}
            addNoteHandler={addNoteHandler}
            allNotes={allNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote} />
          <NoteContent isEdit={isEdit}
            setIsEdit={setIsEdit}
            allNotes={allNotes}
            selectedNote={selectedNote}
            editNoteHandler={editNoteHandler} />
        </Grid>
      </Stack>
    </Container>
  )
}

export default App
