
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './eventbyuser.css';

const EventForm = ({ onCancel, eventId }) => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const jwtToken = sessionStorage.getItem("jwt");
    const [applicationLimit, setApplicationLimit] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/events/${eventId}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}` // Include token in headers
                }
            });
            const eventData = response.data;
            setEventName(eventData.name);
            setEventDescription(eventData.description);
            setApplicationLimit(eventData.applicationLimit);
            setLocation(eventData.location);
            setDate(new Date(eventData.date));
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/events/${eventId}`, {
                name: eventName,
                description: eventDescription,
                applicationLimit: parseInt(applicationLimit),
                location: location,
                date: date
            },{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Event updated:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div className='createform'>
            <div className='form-modal'>
                <div className="form-container">
                    <h2>Edit Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Event Name:</label>
                            <input type="text" name="post" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        </div>
                        <div>
                            <label>Event Description:</label>
                            <input type="text" name="post" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                        </div>
                        <div>
                            <label>Application Limit:</label>
                            <input type="text" name="post" value={applicationLimit} onChange={(e) => setApplicationLimit(e.target.value)} />
                        </div>
                        <div>
                            <label>Location:</label>
                            <select name="post" type="text" value={location} onChange={(e) => setLocation(e.target.value)}>
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
                            <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()} />
                        </div>
                        <button className="edit-button2" type="submit">Edit</button>
                        <Link to="/manage" className='cancel1'>
                            <button className="cancel-create" type="button" onClick={onCancel}>Cancel</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;