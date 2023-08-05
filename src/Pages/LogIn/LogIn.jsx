import { React, useState, useContext } from 'react'
import validator from 'validator';
import { AiOutlineLeft } from "react-icons/ai";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import './LogIn.css'

function LogIn() {
  const { setuser } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const [shouldJump, setShouldJump] = useState(false);
  const [emailerror, setemailerror] = useState(null)
  const [error, seterror] = useState(null)
  const [isloading, setIsloading] = useState(false)



  function HandleSubmit(e) {
    e.preventDefault()
    setIsloading(true)

    if (emailerror != "correct") {
      seterror(null)
      setShouldJump(true);

      setTimeout(() => {
        setShouldJump(false);
      }, 1000);
      setIsloading(false)
      return
    }

    seterror(null)




    const userr = { email, password }
    const login = async () => {
      const responde = await fetch("https://todo-list-server-s66y.onrender.com/api/user/login", {
        method: "POST",
        body: JSON.stringify(userr),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await responde.json()
      if (!responde.ok) {
        setIsloading(false)
        seterror(json)
        return
      }
      setIsloading(false)
      localStorage.setItem("user", json.user)
      localStorage.setItem("token", json.token)
      setuser({ user_name: json.user, token: json.token })
    }
    login()


  }
  function Handle_email(e) {
    if (e.target.value == "")
      setemailerror(null)
    else if (!validator.isEmail(e.target.value))
      setemailerror("false")
    else
      setemailerror("correct")

    setEmail(e.target.value)
  }
  return (
    <div className="LogIn_body" onSubmit={HandleSubmit}>
      <form className='LogIn_conatiner'>
        <Link to="/"><AiOutlineLeft /></Link>
        <h2>Log in</h2>
        <h3>Please enter your details</h3>
        <h4>Email adress</h4>
        <div className='inputs_container'>
          <input
            className="inputs"
            value={email}
            onChange={Handle_email}
          />
          {emailerror === "correct" && <i className={`fa-solid fa-circle-check icons ${shouldJump ? 'jump-animation' : ''}`}></i>}
          {!emailerror && <i className={`fa-regular fa-circle icons ${shouldJump ? 'jump-animation' : ''}`} ></i>}
          {emailerror === "false" && <i className={`fa-solid fa-circle-exclamation icons ${shouldJump ? 'jump-animation' : ''}`} ></i>}

        </div>
        <h4>Password</h4>
        <div className='inputs_container'>
          <input
            className="inputs"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className='wrong_password'>{error} !</p>
        <div>
          <input type="checkbox" />
          <label> Remember me</label>
        </div>
        <button
          disabled={isloading}
          onClick={HandleSubmit}
          className={`login ${isloading && "disable"}`}>
          Log in
        </button>
        <button
          className='login_google'><i className="fa-brands fa-google" /> Log in with google</button>
        <div className='toSignup'>
          don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form >
    </div>
  )
}

export default LogIn