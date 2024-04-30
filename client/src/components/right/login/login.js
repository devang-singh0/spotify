import './login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const navigate = useNavigate();
    let [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })
    const getDetails = (e) => {
        let { name, value } = e.target;
        setLoginDetails((e) => {
            return ({ ...e, [name]: value })
        })
    }
    const login = () => {
        axios.post('http://localhost:5000/login', {
            email: loginDetails.email,
            password: loginDetails.password
        }, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data.status) {
                    alert("Login successful\nredirecting to Home");
                    navigate("/");
                } else {
                    document.getElementsByClassName("massage")[0].innerHTML = "Please check username or password again"
                }
            }).catch(() => {
                alert("404 not found");
            })
    }
    return (
        <div className="loginBox">
            <div className="login">
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" name='email' id="username" onChange={getDetails} />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" name='password' onChange={getDetails} />
                <p className="massage"></p>
                <button onClick={login}>Log In</button>
                <a href='/register'>Register instead</a>
            </div>
        </div>
    )
}