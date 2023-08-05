import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const NoteReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":

      return {
        Notes: action.payload
      }
    case "CREATE_NOTE":
      return {
        Notes: [action.payload, ...state.Notes]
      }
    case "DELETE_NOTE":
      return {
        Notes: state.Notes.filter(note => note._id !== action.payload._id)
      }
    case "UPDATE_NOTE_CHECK":
      return {
        Notes: [...state.Notes.filter(note => note._id !== action.payload._id), action.payload]
      }
    case "UPDATE_NOTE_INCHECK":
      return {
        Notes: [action.payload, ...state.Notes.filter(note => note._id !== action.payload._id)]
      }
    default:
      return state
  }
}
export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NoteReducer, { Notes: null })
  
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}