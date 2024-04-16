import React, { useState } from 'react';
import axios from 'axios';
import {useEffect} from "react";
import {useRef} from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import './postEvent.css';
import { Link } from 'react-router-dom';

const EventForm = ({onCancel}) => {
    const eventName=useRef();
    const eventDescription = useRef();
    const applicationLimit = useRef();
    const location = useRef();
    const [date, setDate] = useState(new Date());
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");
    const numberOfApplications=0;
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/user/"+userId,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
            try {
                const response = await axios.post('http://localhost:8080/events/create/' + userId, { name: eventName.current.value, description:eventDescription.current.value, applicationLimit:applicationLimit.current.value,numberOfApplications:numberOfApplications, location:location.current.value, date:date, userName:user.name, email:user.email },{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log('Event created:', response.data);
                window.location.reload();
            } catch (error) {
                console.error('Error creating event:', error);
            }
        }
    };

    const validateForm = () => {
        const applicationLimitValue = parseInt(applicationLimit.current.value);
        let formValid = false;
        if (eventDescription.current.value=="" || location.current.value=="" || applicationLimit.current.value=="" || eventName.current.value=="" ){
            alert("Please fill in all text fields.");
        } else if(isNaN(applicationLimitValue) || applicationLimitValue < 0 || applicationLimitValue > 100) {
            alert("Application limit must be an integer between 0 and 100.");
        }else{
            alert("Successfully posted event!")
            formValid = true;
        }
        return formValid;
    }

    return (
        <div className='createform'>
            <div className='form-modal'>
                <div className="form-container">
                    <h2>Create Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Event Name:</label>
                            <input name="post" type="text" ref={eventName} />
                        </div>
                        <div>
                            <label>Event Description:</label>
                            <input name="post" type="text" ref={eventDescription} />
                        </div>
                        <div>
                            <label>Application Limit:</label>
                            <input name="post" type="text" ref={applicationLimit} />
                        </div>
                        <div>
                            <label>Location:</label>
                            <select name="post" type="text"ref={location}>
                                <option value="">Select City</option>
                                <option value="Bath">Bath</option>
                                <option value="Birmingham">Birmingham</option>
                                <option value="Bradford">Bradford</option>
                                <option value="Brighton and Hove">Brighton and Hove</option>
                                <option value="Bristol">Bristol</option>
                                <option value="Cambridge">Cambridge</option>
                                <option value="Canterbury">Canterbury</option>
                                <option value="Carlisle">Carlisle</option>
                                <option value="Chester">Chester</option>
                                <option value="Chichester">Chichester</option>
                                <option value="Coventry">Coventry</option>
                                <option value="Derby">Derby</option>
                                <option value="Durham">Durham</option>
                                <option value="Ely">Ely</option>
                                <option value="Exeter">Exeter</option>
                                <option value="Gloucester">Gloucester</option>
                                <option value="Hereford">Hereford</option>
                                <option value="Kingston upon Hull">Kingston upon Hull</option>
                                <option value="Lancaster">Lancaster</option>
                                <option value="Leeds">Leeds</option>
                                <option value="Leicester">Leicester</option>
                                <option value="Lichfield">Lichfield</option>
                                <option value="Lincoln">Lincoln</option>
                                <option value="Liverpool">Liverpool</option>
                                <option value="City of London">City of London</option>
                                <option value="Manchester">Manchester</option>
                                <option value="Newcastle upon Tyne">Newcastle upon Tyne</option>
                                <option value="Norwich">Norwich</option>
                                <option value="Nottingham">Nottingham</option>
                                <option value="Oxford">Oxford</option>
                                <option value="Peterborough">Peterborough</option>
                                <option value="Plymouth">Plymouth</option>
                                <option value="Portsmouth">Portsmouth</option>
                                <option value="Preston">Preston</option>
                                <option value="Ripon">Ripon</option>
                                <option value="Salford">Salford</option>
                                <option value="Salisbury">Salisbury</option>
                                <option value="Sheffield">Sheffield</option>
                                <option value="Southampton">Southampton</option>
                                <option value="St Albans">St Albans</option>
                                <option value="Stoke-on-Trent">Stoke-on-Trent</option>
                                <option value="Sunderland">Sunderland</option>
                                <option value="Truro">Truro</option>
                                <option value="Wakefield">Wakefield</option>
                                <option value="Wells">Wells</option>
                                <option value="Westminster">Westminster</option>
                                <option value="Winchester">Winchester</option>
                                <option value="Wolverhampton">Wolverhampton</option>
                                <option value="Worcester">Worcester</option>
                                <option value="York">York</option>
                            </select>
                        </div>
                        <div>
                            <label>Date:</label>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()}/>
                        </div>
                        <button className="post-button" name="post" type="submit">Post</button>
                        <Link to="/homepage" className='cancel1'><button className="cancel-create" type="button" onClick={onCancel}>Cancel</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EventForm;