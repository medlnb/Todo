import { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/LogIn/LogIn'
import HomePage from './Pages/HomePage/HomePage'
import { DateContextProvider } from './Contexts/DateContext'
import { NotesContextProvider } from './Contexts/NotesContext'
import { AuthContext } from './Contexts/AuthContext';
import SignUp from './Pages/SignUp/SignUp'
import Welcome from './Pages/Welcome/Welcome';

function App() {
  const { user, setuser } = useContext(AuthContext)

  useEffect(() => {
    const user_name = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (user_name && token)
      setuser({ user_name, token })

  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={user ? <NotesContextProvider>
          <DateContextProvider>
            <Navigate to="/homepage" />
          </DateContextProvider>
        </NotesContextProvider> : <SignUp />} />
        <Route path="/login" element={user ? <NotesContextProvider>
          <DateContextProvider>
            <Navigate to="/homepage" />
          </DateContextProvider>
        </NotesContextProvider> : <Login />} />
        <Route path='/homepage' element={user ? <NotesContextProvider>
          <DateContextProvider>
            <HomePage />
          </DateContextProvider>
        </NotesContextProvider> : <Navigate to="/login" />} />
        <Route path="*" />
      </Routes>
    </Router>
  )
}

export default App
