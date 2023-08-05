import React, { useState, useEffect, useContext } from 'react'
import './Notes.css'
import Note from '../Note/Note'
import { DateContext } from '../../Contexts/DateContext'
import { NotesContext } from '../../Contexts/NotesContext'
import { AuthContext } from '../../Contexts/AuthContext'
import HashLoader from 'react-spinners/HashLoader'
import BeatLoader from 'react-spinners/BeatLoader'

function Notes() {
  const { user } = useContext(AuthContext)

  const { Notes, dispatch } = useContext(NotesContext)
  const { date } = useContext(DateContext)
  const [NewNoteValue, setNewNoteValue] = useState("")
  const [today, settoday] = useState([])
  const [IsLoading, setIsLoading] = useState(true)
  const [loadingnewnote, setloadingnewnote] = useState(false)

  useEffect(() => {
    const get_Notes = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("https://todo-list-server-s66y.onrender.com/api/notes", {
          headers: {
            "authorization": `bearer ${user.token}`
          }
        })
        const json = await response.json()

        setIsLoading(false)
        if (!response.ok) {
          return console.log({ error: "error getting notes" })
        } else {
          // console.log(json)
          dispatch({
            type: "SET_NOTES",
            payload: json
          })

        }
      } catch (error) {
        console.log(error.message)
        setIsLoading(false)
      }
    }
    if (user)
      get_Notes()
  }, [])

  useEffect(() => {
    if (!Notes)
      return

    const todaysNote = Notes.filter(note => (
      note.date.day === date.day
      &&
      note.date.month === date.month
    ));
    settoday(todaysNote.map(element => {
      return <Note
        key={element._id}
        content={element} />
    }))
  }, [date.day, date.month, Notes]);


  function addnewnote() {
    if (!NewNoteValue)
      return
    setloadingnewnote(true)
    const add_Note = async () => {

      const note = {
        "title": NewNoteValue,
        "content": "dasdsadasda!",
        "date": date,
        "checked": false
      }
      const responde = await fetch("https://todo-list-server-s66y.onrender.com/api/notes", {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json',
          "authorization": `bearer ${user.token}`
        }
      })
      const json = await responde.json()

      if (!responde.ok) {
        console.log("error adding the note")
        setloadingnewnote(false)
      }
      // console.log(json)
      setloadingnewnote(false)
      dispatch({ type: "CREATE_NOTE", payload: json })
      setNewNoteValue("")

    }
    if (user)
      add_Note()
  }

  return (
    <div className='lower_container'>
      <div className='notes_container'>
        <BeatLoader
          className='spinner'
          color={"#fe7271"}
          loading={IsLoading}
          size={15}
        />
        {!IsLoading && <h1>{today.length ? today.length : "No"} Tasks</h1>}
        {!IsLoading && <div className='tasks_container'>
          {today.length != 0 ? today : "No tasks for today yet"}
        </div>}
      </div>
      <div className='addnote_container'>
        <input
          value={NewNoteValue}
          onChange={e => setNewNoteValue(e.target.value)}
          className='newnoteinput'
          placeholder='New note!'
        />
        <div className='addnote'>
          {!loadingnewnote && <button
            className='addnote_button'
            onClick={addnewnote}>
            +
          </button>}
          <HashLoader
            className='addnote_spinner'
            color={"#fe7271"}
            loading={loadingnewnote}
            size={25}
          />

        </div>
      </div>
    </div>
  )
}

export default Notes