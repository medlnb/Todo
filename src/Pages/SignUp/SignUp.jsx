import { React, useState, useContext } from 'react'
import validator from 'validator';
import { AiOutlineLeft } from "react-icons/ai";
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../LogIn/LogIn.css'

function SignUp() {
  const { setuser } = useContext(AuthContext)
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const [error, seterror] = useState(null)
  const [passworderror, setpassworderror] = useState(null)
  const [isloading, setIsloading] = useState(false)


  function Handle_password(e) {
    if (e.target.value == "")
      setpassworderror(null)
    else if (!validator.isStrongPassword(e.target.value))
      setpassworderror("false")
    else
      setpassworderror("correct")

    setPassword(e.target.value)
  }


  function HandleSubmit(e) {
    e.preventDefault()
    setIsloading(true)


    if (!email || !password || !username) {
      seterror("All Fields must be filled")
      setIsloading(false)
      return
    }
    if (username.length > 15) {
      setIsloading(false)
      seterror("Can u entre a shorter name")
      return
    }
    if (!validator.isEmail(email)) {
      setIsloading(false)
      return seterror("Wrong email form, please check it again")
    }
    if (passworderror != "correct") {
      return seterror("Your password is too weak, make sure you have (Capitale & small letters, Numbers , Shiffers")
      setIsloading(false)
    }


    seterror(null)

    const acc = { username, email, password }
    const login = async () => {
      const responde = await fetch("https://todo-list-server-s66y.onrender.com/api/user/signup", {
        method: "POST",
        body: JSON.stringify(acc),
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
      localStorage.setItem("user_name", username)
      localStorage.setItem("token", json.token)
      setuser({ user_name: username, token: json.token })
    }
    login()

  }
  return (
    <div className="LogIn_body" onSubmit={HandleSubmit}>
      <form className='LogIn_conatiner'>
        <Link to="/"><AiOutlineLeft /></Link>
        <h2>Sign up</h2>
        <h3>Please enter your details</h3>
        <h4>Say your name</h4>
        <div className='inputs_container'>
          <input
            className="inputs"
            value={username}
            onChange={e => setusername(e.target.value)}
          />

        </div>
        <h4>Email adress</h4>
        <div className='inputs_container'>
          <input
            className="inputs"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

        </div>
        <h4>Password</h4>
        <div className='inputs_container'>
          <input
            className="inputs"
            type="password"
            value={password}
            onChange={Handle_password}

          />
          {passworderror === "correct" && <i className="fa-solid fa-circle-check icons"></i>}
          {!passworderror && <i className="fa-regular fa-circle icons " ></i>}
          {passworderror === "false" && <i className="fa-solid fa-circle-exclamation icons " ></i>}
        </div>
        <p
          style={error ? { visibility: "visible" } : { visibility: "hidden" }}
          className='wrong_password'>{error} !</p>
        <div>
          <input type="checkbox" />
          <label> Remember me</label>
        </div>
        <button
          onClick={HandleSubmit}
          className='login'>
          Sign up
        </button>
        <button className='login_google'><i className="fa-brands fa-google" /> Log in with google</button>
        <div className='toSignup'>
          allready have an accout <Link to="/login">Log in</Link>
        </div>
      </form >
    </div>
  )
}

export default SignUp