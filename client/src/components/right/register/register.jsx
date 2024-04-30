import './register.scss'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  let [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    repassword: ""
  })
  const getDetails = (e) => {
    let { name, value } = e.target;
    setRegisterDetails((e) => {
      return ({ ...e, [name]: value })
    })
  }
  const register = () => {
    axios.post('http://localhost:5000/register', {
      email: registerDetails.email,
      password: registerDetails.password
    }, {
      withCredentials: true
    })
      .then(function (response) {
        if (response.data.status) {
          alert("Sign up successful\nRedirecting to home")
          navigate("/");
        } else {
          document.getElementsByClassName("massage")[0].innerHTML = "User exits please login"
        }
      }).catch(() => {
        alert("404 not found");
      })
  }
  const confirmPassword = (e) => {
    e.preventDefault();
    if (e.target[1].value == e.target[2].value) {
      e.target.children[7].innerHTML = ""
      register();
    } else {
      e.target.children[7].innerHTML = "Re-Enter correct password"
    }
  }
  return (
    <div className="registerBox">
      <div className="register">
        <form action="" onSubmit={confirmPassword}>
          <h3>Register Here</h3>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email or Phone" id="email" name='email' onChange={getDetails} required />

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" name='password' onChange={getDetails} minLength={7} maxLength={11} required />

          <label htmlFor="repassword">Re Enter Password</label>
          <input type="password" placeholder="Password" id="repassword" name='repassword' onChange={getDetails} minLength={7} maxLength={11} required />
          <p className="massage"></p>
          <input type="submit" value="Register Here" />
          <a href="login">Login instead</a>
        </form>
      </div>
    </div>
  )
}