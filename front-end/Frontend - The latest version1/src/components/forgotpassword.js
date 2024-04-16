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
    const outletContextValue = useOutletContext(); // Store the return value in a variable

    // Destructure the context value with a default value of an empty array to avoid null errors

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
                              Authorization: `Bearer ${jwtToken}` // Include token in headers
                          }})
                        .then(response => {
                            const userId = response.data.id;
                            sessionStorage.setItem("userId", userId);
                            console.log("User ID:", userId);
                            // You can do whatever you want with the user ID here
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
                alert("Login error!");
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
                <a href="/forgotpassword"> Forgot Password?</a>
                </div>
               <div className="field">
                  <input type="submit" value="Login"/>
               </div>
               <div className="signup-link">
                  Not a member? 
                  <label htmlFor="policy">
                      <a href="/register"> Sign Up Now</a>
                  </label>
               </div>
               </form>
            </div>
            </div>
    );
}
/*import React, {useState} from 'react';
import { Link, useNavigate,} from 'react-router-dom';
import {useRef} from "react";
import './loginpage.css';
import { useOutletContext } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import homeIcon from './images/ECO_SWEEP.png';
import axios from 'axios';

/*import '../script.js'; 

function LoginPage() {
  const [policyChecked, setPolicyChecked] = useState(false);
  const [loggedInUser, setLoggedinUser] = useOutletContext();
  const navigate = useNavigate(); // Hook for navigation
  const password=useRef();
  const email=useRef();
  const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	}


  const showSignupForm = () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('forgot-password-form').style.display = 'none';
  };
  const showLoginForm = () => {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
  };
  const showForgotPasswordForm = () => {
   document.getElementById('login-form').style.display = 'none';
   document.getElementById('signup-form').style.display = 'none';
   document.getElementById('forgot-password-form').style.display = 'block';
 };
  const validateSignupForm = (e) => {
    if (!policyChecked) {
      alert('Please agree to the Terms & Conditions');
      e.preventDefault(); // Prevent form submission
    }

    // Validate email format
    const emailInput = document.getElementById('signup-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert('Please enter a valid email address');
      e.preventDefault(); // Prevent form submission
    }

    // Validate password format
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput.value.length < 5 || !/\d/.test(passwordInput.value)) {
      alert('Password must be at least 5 characters long and include a number');
      e.preventDefault(); // Prevent form submission
    }
  };
  const validateLoginForm = (e) => {
   // Validate email format in the login form
   const emailInput = document.getElementById('login-email');
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(emailInput.value)) {
     alert('Please enter a valid email address');
     e.preventDefault(); // Prevent form submission
   }
   navigate('/homepage');
 };

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const validateForgotPasswordForm = (e) => {
      // Validate email format in the forgot password form
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(forgotPasswordEmail)) {
        alert('Please enter a valid email address');
        e.preventDefault(); // Prevent form submission
      }
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      let dataLogin = {};
      if (email.current && email.current.value && password) {
        dataLogin = {
            username: email.current.value,
            password: password
        };

        // Rest of the code...
    

      console.log(dataLogin);

      if(validateLoginForm()){
          axios({
              method: 'post',
              url: 'http://localhost:8080/login',
              data: dataLogin
          })
          .then(response=>{
              console.log(response);
              if (response.status === 200){
                  alert("Logged in successfully.")
                  const jwtToken = response.headers.authorization.split(' ')[1]
                  if (jwtToken !== null) {
                      sessionStorage.setItem("jwt", jwtToken);
                      console.log(jwtToken);
                      setLoggedinUser(email.current.value);
                  } else{
                      alert("Token failure!");
                      setLoggedinUser("");
                  }
              }else{
                  alert("Login error!")
                  setLoggedinUser("");
              }
          }).then(()=>{
              email.current.value="";
              password.current.value="";
          })
          .catch(error=>{
              alert("Login error!")
              setLoggedinUser("");
              console.log(error);
          })
      }
    } else {
        console.error('Email or password is null or empty.');
    }
    }



  return (
    <div className="login-page">
      <li>
        <Link to="/" className ="home-button">
        <img src={homeIcon} alt="Home"/>
        </Link>
      </li>
      <div className="wrapper login" id="login-form">
         <div className="title">Login</div>
         <form action="#" onSubmit={handleSubmit}>
            <div className="field">
               <input type="email" id="login-email" ref={email} required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" />
               <label>Email Address</label>
            </div>
            <div className="field">
               <input type="password" id = "password" name="password" ref={password} onChange={passwordChangeHandler} required/>
               <label>Password</label>
            </div>
            <div className="content">
                <div className="checkbox">
                   <input type="checkbox" id="remember-me"/>
                   <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="pass-link">
                <a href="#" onClick={showForgotPasswordForm}> Forgot Password?</a>
                </div>
             </div>
             <div className="field">
                <input type="submit" value="Login"/>
             </div>
             <div className="signup-link">
                Not a member? 
                <label htmlFor="policy">
                    <a href="/register"> Sign Up Now</a>
                </label>
             </div>
          </form>
      </div>

       <div className="wrapper signup" id="signup-form" style={{display: 'none'}}>
        <div className="title">Register</div>
        <form action="#" onSubmit={validateSignupForm}>
        <div className="field">
            <input type="text" id="full-name" required />
            <label>Full Name</label>
          </div>
           <div className="field">
              <input type="text" id="signup-email" required pattern="[^\s@]+@[^\s@]+\.[^\s@]+"/>
              <label>Enter Email Address</label>
           </div>
           <div className="field">
           <input type="password" id = "password" name="password" value={password} onChange={passwordChangeHandler} required/>
              <label>Create Password</label>
           </div>
            <div className="field">
           </div>
            <div className="field">
               <input type="submit" value="Sign Up"/>
            </div>
            <div className = "policy-link">
                <input type="checkbox" id = "policy" onChange={() => setPolicyChecked(!policyChecked)}/>
                 I agree to the 
                <label htmlFor="policy">
                    <a href="#"> Terms & Conditions</a>
                </label>
            </div>
            <div className="login-link">
                Have an account? <a href="#" onClick={showLoginForm}>Login Here</a>
            </div>
         </form>
      </div>
      <script src="script.js"></script>

        <div className="wrapper forgot-password" id="forgot-password-form" style={{ display: 'none' }}>
          <div className="title">Forgot Password</div>
          <form action="#" onSubmit={validateForgotPasswordForm}>
            <div className="field">
              <input
                type="text"
                id="forgot-password-email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input type="submit" value="Reset Password" />
            </div>
          </form>
          <form action="#" onSubmit={showLoginForm}>
            <div className='field'>
           <input type="submit" value="Back To Login"/>
           </div>
           </form>
        </div>
      </div>
  );
}

export default LoginPage;

*/