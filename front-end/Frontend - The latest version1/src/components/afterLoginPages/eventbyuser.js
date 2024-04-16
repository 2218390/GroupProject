import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './manageEvents.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ListEvents.css';
import EditForm from './editEvent.js';
import homeIcon from '../images/tree.png';
import { BsTrash3Fill } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './eventbyuser.css';

/* Ocean cleanup image from : // https://www.freepik.com/free-vector/seaweed-sealife-plant_136482370.htm#fromView=search&page=2&position=43&uuid=81240eec-d040-40ee-92e6-c253f9711b0c */
import oceanCleanup from '../images/oceancleanup.jpg';

/* Litter cleanup image from : https://www.freepik.com/free-vector/green-ecology-bin-ecological-sustainability_89158773.htm#fromView=search&page=1&position=60&uuid=cd0f4d8b-90ed-4a50-ae8e-7ccdc0555810 */
import litterCleanup from '../images/litter.jpg';

const EventsByUser = () => {
    const [events, setEvents] = useState([]);
    const jwtToken = sessionStorage.getItem("jwt");
    const [showEdit, setShowEdit] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const userId = sessionStorage.getItem("userId");
    const currentDate = new Date();

    const toggleFormVisibility = (eventId) => { 
        setShowEdit(!showEdit);
        setSelectedEventId(eventId); 
    };

    useEffect(() => {
        const fetchEventsByUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${userId}/events`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEventsByUser();
    }, [userId]);

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8080/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleMarkAsFinished = async (eventId) => {
        try {
            await axios.put(`http://localhost:8080/events/${eventId}/markFinished`, null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        } catch (error) {
            console.error('Error marking event as finished:', error);
        }
    };

    return (
        <div className="container5">
            <h2 className='page-title'>My Hostings</h2>
            {showEdit && <div className="backdrop" onClick={() => toggleFormVisibility(null)}></div>}
            {showEdit && <EditForm onCancel={() => toggleFormVisibility(null)} eventId={selectedEventId} />}
            {events.length === 0 ? (
                <div className="no-events-message">You are currently not hosting any events.</div>
            ) : (
                <div className="event-list">
                    {events.map(event => (
                        <div className="event-item" key={event.id}>
                            <div className='editbutton-area'>
                             <div className = 'editevent-button' title='Edit Job' onClick={() => toggleFormVisibility(event.id)}><FaEdit /></div>
                            <h2 className='hosting-job-title'>{event.name}</h2>
                            </div>
                            <p className="description"><strong>Description:</strong> {event.description}</p>
                            <p className="hosted-by"><strong>Hosted by:</strong> {event.userName}</p>
                            <p className="location"><strong>Location:</strong> {event.location}</p>
                            <p className="date"><strong>Date:</strong> {event.date ? event.date.substring(0, 10) : 'Not specified'}</p>
                            <p className="slots"><strong>Reserved Slots:</strong> {event.numberOfApplications}/{event.applicationLimit}</p>
                            <p><strong><Link to={`/manageApplications/${event.id}`}>Manage Applications</Link></strong></p>
                            <div className="delete-button" onClick={() => handleDeleteEvent(event.id)}><BsTrash3Fill /> Delete Event</div>
                                <button className='markfinished-button' onClick={() => handleMarkAsFinished(event.id)}>
                                <MdDone /> Mark as Finished</button>
                        
                            <img className="event-image" src={event.description.toLowerCase().includes('litter') ? litterCleanup : event.description.toLowerCase().includes('ocean') ? oceanCleanup : homeIcon} alt="Event" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsByUser;
