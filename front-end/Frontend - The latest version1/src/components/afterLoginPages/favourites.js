import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './navbar2.js';
import Footer from '../footer.js';
import './ListEvents.css';
import heart from '../images/heart.png';
import heart1 from '../images/heart1.png';
import homeIcon from '../images/tree.png';

/* Ocean cleanup image from : // https://www.freepik.com/free-vector/seaweed-sealife-plant_136482370.htm#fromView=search&page=2&position=43&uuid=81240eec-d040-40ee-92e6-c253f9711b0c */
import oceanCleanup from '../images/oceancleanup.jpg';

/* Litter cleanup image from : https://www.freepik.com/free-vector/green-ecology-bin-ecological-sustainability_89158773.htm#fromView=search&page=1&position=60&uuid=cd0f4d8b-90ed-4a50-ae8e-7ccdc0555810 */
import litterCleanup from '../images/litter.jpg';

const Favorites = () => {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");

    useEffect(() => {
        fetchFavoriteEvents();
    }, []);

    const fetchFavoriteEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/${userId}/favorite-events`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setFavoriteEvents(response.data);
        } catch (error) {
            console.error('Error fetching favorite events:', error);
        }
    };

    const toggleFavorite = async (eventId) => {
        try {
            const isFavorite = favoriteEvents.some(event => event.id === eventId);
            if (isFavorite) {
                await axios.delete(`http://localhost:8080/user/${userId}/events/${eventId}/favorite`,{
                    headers: {
                      Authorization: `Bearer ${jwtToken}`
                    }
                });
                setFavoriteEvents(prev => prev.filter(event => event.id !== eventId));
            } 
        } catch (error) {
            if(error.response.status===400){
                alert("Can't add an own event to 'Favourites'")
            }
            console.error('Error toggling favorite:', error);
        }     
    };

    const handleApplyEvent = async (eventId) => { 
        try {
            const response = await axios.post(`http://localhost:8080/applications/apply/${userId}/${eventId}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Applying for event:', eventId);
            alert("Successfully applied for the event!");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            }   
        }
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <h2 className="page-title">Favorite Events</h2>
                {favoriteEvents.length === 0 ? (
                    <p>You have not favorited any events.</p>
                ) : (
                    <div className="event-list">
                        {favoriteEvents.map(event => (
                            <div className="event-item" key={event.id}>
                                <h2>{event.name}</h2>
                                <p className="description"><strong>Description:</strong> {event.description}</p>
                                <p className="hosted-by"><strong>Hosted by:</strong> {event.userName}</p>
                                <p className="location"><strong>Location:</strong> {event.location}</p>
                                <p className="date"><strong>Date:</strong> {event.date ? event.date.substring(0, 10) : 'Not specified'}</p>
                                <p className="slots"><strong>Reserved Slots:</strong> {event.numberOfApplications}/{event.applicationLimit}</p>
                                <button className="apply-button" onClick={() => handleApplyEvent(event.id)}>Apply</button>
                                <div onClick={() => toggleFavorite(event.id)}>
                                    {favoriteEvents.some(favoriteEvent => favoriteEvent.id === event.id) ? <img src={heart1} alt="Heart" /> : <img src={heart} alt="Heart1" />}
                                </div>
                                <img className="event-image" src={event.description.toLowerCase().includes('litter') ? litterCleanup : event.description.toLowerCase().includes('ocean') ? oceanCleanup : homeIcon} alt="Event" />
                            </div>
                        ))}
                    </div>
                )}

                <Footer/>
            </div>
        </div>
    );
};
export default Favorites;