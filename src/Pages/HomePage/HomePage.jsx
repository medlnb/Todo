import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import './HomePage.css'
import Days from '../../Components/Days/Days'
import Navbar from '../../Components/Navbar/Navbar'
import Notes from '../../Components/Notes/Notes';


export default function HomePage() {

  const { user } = useContext(AuthContext)
  console.log(user)
  const CapitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1)



  return (
    <div className='container'>
      <h1 className='username'>
        {user.user_name && "Hello, " + CapitalizeFirstLetter(user.user_name)+ "!"}{/*dont forget to add the username here*/}
      </h1>
      <Navbar />
      <Days />
      <h2 className='todays_tasks'>Today's Tasks</h2>
      <Notes />
    </div>
  )
}