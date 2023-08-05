import React, { useState, useContext } from 'react'
import { NotesContext } from '../../Contexts/NotesContext'
import { AuthContext } from '../../Contexts/AuthContext';
import ClipLoader from "react-spinners/ClipLoader";
import dashed from '../../assets/red_dashed.png'
import './Note.css'



function Note(props) {
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(NotesContext)
  const [isLoadingDelete, setIsLoadingDelete] = useState(null)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(null)

  const deletenote = () => {
    setIsLoadingDelete(true)

    const delete_note = async () => {

      try {
        const responde = await fetch(`https://todo-list-server-s66y.onrender.com/api/notes/${props.content._id}`, {
          method: "DELETE",
          headers: {
            "authorization": `bearer ${user.token}`
          }
        })
        // const json = await responde.json()
        if (responde.ok) {
          dispatch({ type: "DELETE_NOTE", payload: { _id: props.content._id } })
        }
        setIsLoadingDelete(false)

      } catch (error) {
        setIsLoadingDelete(false)
      }
    }
    if (user)
      delete_note()
  }
  const checking = async () => {
    setIsLoadingUpdate(true)
    try {
      const newNote = { ...props.content, checked: !props.content.checked }
      const responde = await fetch(`https://todo-list-server-s66y.onrender.com/api/notes/${props.content._id}`, {
        method: "PATCH",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${user.token}`
        }
      })
      const json = await responde.json()
      setIsLoadingUpdate(false)
      if (props.content.checked)
        dispatch({ type: "UPDATE_NOTE_INCHECK", payload: { ...props.content, checked: !props.content.checked } })
      else {
        dispatch({ type: "UPDATE_NOTE_CHECK", payload: { ...props.content, checked: !props.content.checked } })
      }
    } catch (err) {
      console.log(err)
      setIsLoadingUpdate(false)
    }
  }



  return (
    <div className='note'>

      <div className='left_note'>

        <ClipLoader
          color={"#8e8e8e"}
          loading={isLoadingUpdate}
          size={15}
        />
        {!isLoadingUpdate && <input
          className='checkbox'
          type="checkbox"
          onChange={checking}
          checked={props.content.checked}
        />}

        <label
          className="label" >
          {props.content.title}
          {props.content.checked && <img className='dashed' src={dashed} />}
        </label>
      </div>
      <div>

        {!isLoadingDelete && <button
          className='done'
          onClick={deletenote}>
          X
        </button>}
        <ClipLoader
          color={"#fe7271"}
          loading={isLoadingDelete}
          size={15}
        />
      </div>
    </div>
  )
}

export default Note

