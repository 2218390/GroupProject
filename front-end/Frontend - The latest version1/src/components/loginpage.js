import React, { useRef, useState } from "react";
import { Link, useNavigate,} from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './loginpage.css';

export default function Login(props) {
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const [loggedInUser, setLoggedinUser] = useState(null);
    const outletContextValue = useOutletContext(); 

    const validateForm = () => {
        if (emailRef.current && passwordRef.current) {
            if (emailRef.current.validity.valueMissing || passwordRef.current.validity.valueMissing) {
                alert("Please fill in all text fields.");
                return false;
            } else if (emailRef.current.validity.typeMismatch) {
                alert("Invalid e-mail address. Please enter your e-mail again.");
                return false;
            }
            return true;
        }
        return false;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataLogin = {
            username: emailRef.current.value,
            password: passwordRef.current.value
        };
        console.log(dataLogin);
        if (validateForm()) {
            axios.post('http://localhost:8080/login', dataLogin)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("Logged in successfully.");
                    const jwtToken = response.headers.authorization.split(' ')[1];
                    const email = emailRef.current.value; 
                    if (jwtToken) {
                        sessionStorage.setItem("jwt", jwtToken);
                        sessionStorage.setItem("email", email);
                        console.log(jwtToken);
                        setLoggedinUser(emailRef.current.value);
                        axios.get(`http://localhost:8080/user/email/${email}`,{
                            headers: {
                                Authorization: `Bearer ${jwtToken}`
                            }
                        })
                        .then(response => {
                            const userId = response.data.id;
                            sessionStorage.setItem("userId", userId);
                            console.log("User ID:", userId);
                        })
                        .catch(error => {
                            console.error("Error retrieving user ID:", error);
                        });
                    } else {
                        alert("Token failure!");
                        setLoggedinUser("");
                    }
                } else {
                    alert("Login error!");
                    setLoggedinUser("");
                }
            }).then(() => {
                emailRef.current.value = "";
                passwordRef.current.value = "";
                navigate('/homepage');

            })
            .catch(error => {
                alert("Login Unsuccessful, check your email or password and try");
                setLoggedinUser("");
                console.log(error);
            });
        }
    };

    return (
        <div className="login-page">
            <div className="wrapper login" id="login-form" >
                <div className="title">Login</div>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="field">
                        <input type="email" id="login-email" ref={emailRef} required />
                        <label>Email Address</label>
                    </div>
                    <div className="field">
                        <input type="password" id = "password" name="password" ref={passwordRef} required/>
                        <label>Password</label>
                    </div>
                    <div className="pass-link">
                        <Link href="/forgotpassword"> Forgot Password?</Link>
                    </div>
                    <div className="field">
                        <input type="submit" value="Login"/>
                    </div>
                    <div className="signup-link">Not a member? <label htmlFor="policy"><a href="/register"> Sign Up Now</a></label></div>
                </form>
            </div>
        </div>
    );
}