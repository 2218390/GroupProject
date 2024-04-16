import React, {useRef} from "react";
import axios from "axios";
import {useState} from "react";
import { Link, useNavigate,} from 'react-router-dom';
import validator from 'validator'
import PasswordChecklist from "react-password-checklist"
import './loginpage.css'

export default function Registration(){
    const name=useRef();
    const navigate = useNavigate();
    const email=useRef();
    const tos=useRef();
    const [password, setPassword] = useState("");

    const passwordChangeHandler = (event) => {
	    setPassword(event.target.value);
	}

    const validateForm = () => {
        let formValid = false;
        if (name.current.validity.valueMissing || email.current.validity.valueMissing ){
                alert("Please fill in all text fields.");
        } else if (email.current.validity.typeMismatch){
            alert("Invalid e-mail address. Please enter your e-mail again.");
        } else if (!validator.isStrongPassword(password, { minLength: 8, minLowerCase:0, minUppercase:1, minNumbers:1, minSymbols:1})){
            alert("The password is too weak. Try again.");
        } else if (tos.current.validity.valueMissing){
            alert("Please agree to the Terms and Conditions, and Privacy Policy.")
        } else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()){
            axios.post('http://localhost:8080/user',{
                name: name.current.value,
                email: email.current.value,
                password: password,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
                    alert("Registered successfully.")
                }
            }).then(()=>{
                navigate('/login');
                name.current.value="";
                email.current.value="";
                password=setPassword("");
                tos.current.checked=false;
            })
            .catch(error=>{
                console.log(error);
                if(error.response && error.response.status===400){
                    alert("Email already in use.");
                }
            })
        }
    }

    function PasswordStrength(props){
        const strengthChecker = () => {      
      	    let strengthValue = 0;
      	    let regexList = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
      	    let strengthText = ["", "unacceptable", "weak", "average", "good", "strong"];
      	    regexList.forEach((regex) => {
        	    if (new RegExp(regex).test(props.password)) {
          		    strengthValue += 1;
        	    }
      	    });
      	    if(props.password.length >=8){
        	    strengthValue += 1;
      	    }
      	    return { text: strengthText[strengthValue], value: strengthValue }
        };

        return <div > 
            <progress
                className={`pwd-checker-bar strength-${strengthChecker().text}`}
                value={strengthChecker().value}
                max="5"
            /> {strengthChecker().text}
        </div>;
    }
    
    return (
        <div className="registration">
            <div className="wrapper signup" id="signup-form">
                <div className="title"> Register </div>
                <form action="#" noValidate onSubmit={handleSubmit}>
                    <div class="field">
                        <input type="text" ref={name} placeholder="Enter Full Name" required></input>
                    </div>
                    <div class="field">
                        <input type="email" name="email" ref={email} placeholder="Enter Email Address" required></input>
                    </div>
                    <div class="field">
                        <input id = "password" name="password" value={password} type="password" placeholder="Create Password" onChange={passwordChangeHandler}  required></input>
                    </div>
                    <div class="field">
                        <PasswordStrength password={password}/>
                    </div>
                    <div class="field2">
                        <PasswordChecklist rules={["minLength","specialChar","number","capital"]} minLength={8} value={password} onChange={(isValid) => {}}/>
                    </div>
                    <div class="field">
                        <input type="submit" value="Sign Up"></input>
                    </div>
                    <div class = "policy-link">
                        <input type="checkbox" ref={tos} id = "policy" required></input>  I agree to the   <label for="policy"><a href="#">Terms & Conditions</a></label>
                    </div>
                    <div class="login-link"> Have an account? <a href="/login">Login Here</a></div>
                </form>
            </div>
        </div>
    )
}