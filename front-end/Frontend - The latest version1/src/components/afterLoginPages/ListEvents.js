import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListEvents.css';
import homeIcon from '../images/tree.png';
import Footer from '../footer.js';
import heart from '../images/heart.png';
import heart1 from '../images/heart1.png';
import EventForm from './postEvent.js';
import profileDefault from '../images/profile.png';

/* Ocean cleanup image from : // https://www.freepik.com/free-vector/seaweed-sealife-plant_136482370.htm#fromView=search&page=2&position=43&uuid=81240eec-d040-40ee-92e6-c253f9711b0c */
import oceanCleanup from '../images/oceancleanup.jpg';

/* Litter cleanup image from : https://www.freepik.com/free-vector/green-ecology-bin-ecological-sustainability_89158773.htm#fromView=search&page=1&position=60&uuid=cd0f4d8b-90ed-4a50-ae8e-7ccdc0555810 */
import litterCleanup from '../images/litter.jpg';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const jwtToken = sessionStorage.getItem("jwt");
    const userId = sessionStorage.getItem("userId");
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false); // State for profile modal
    const [profileData, setProfileData] = useState(null);
    const [hostedEvents, setHostedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

//    useEffect(() => {
//        fetchEvents();
//        fetchFavoriteEvents();
//    },[selectedCity, searchQuery]);
//

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                await Promise.all([fetchEvents(), fetchFavoriteEvents()]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false); // Stop loading after both fetches
        };

        fetchData();
    }, [selectedCity, searchQuery]);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };
    const handleViewProfile = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/email/${email}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setProfileData(response.data);
            fetchHostExperience(profileData.id);
            setShowProfileModal(true); // Show profile modal
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchHostExperience = async (userId) => {
        try {
            const response = await axios.get('http://localhost:8080/events/'+userId+'/events/all', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                } 
            });
            const hosted = response.data.filter(event => event.isFinished);
            setHostedEvents(hosted);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }; 
    const fetchEvents = async () => {
        try {
            let url = 'http://localhost:8080/events/all';
            if (searchQuery) {
                url = `http://localhost:8080/events/search?name=${encodeURIComponent(searchQuery)}`;
            } else if (selectedCity) {
                url = `http://localhost:8080/events/city?location=${encodeURIComponent(selectedCity)}`;
            }
            console.log('Fetching events from URL:', url);
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            if (searchQuery) {
                const filteredEvents = response.data.filter(event => event.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
                setSearchResults(filteredEvents); // Update search results
                setEvents([]);
            } else {
                setSearchResults([]);
                setEvents(response.data); // Update events list
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
        setIsLoading(false);
    };

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
            } else {
                await axios.post(`http://localhost:8080/user/${userId}/events/${eventId}/favorite`,{},{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setFavoriteEvents(prev => [...prev, events.find(event => event.id === eventId)]);
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

    const handleViewAll = () => {
        setSearchQuery('');
        setSelectedCity('');
    };

    return (
        <div className="container">
            <h1 className="page-title">All Events</h1>
            <div className = 'createevent_button' onClick={toggleFormVisibility}>Create Event</div>
            {showForm && <div className="backdrop" onClick={toggleFormVisibility}></div>}
            {showForm && <EventForm onCancel={toggleFormVisibility} />}
            <div className="search">
                <input className='search-box1' type="text" placeholder="Search by event name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <select className='cities-box' value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">All Cities</option>
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
                <button className= 'view-button' onClick={handleViewAll}>View all</button>
            </div>
            <div className="event-list">
                {isLoading ? (
                    <p>Loading events...</p>
                ) : (
                    (searchResults.length > 0 ? searchResults : events).filter(event => {
                        const eventDate = new Date(event.date);
                        const currentDate = new Date();
                        return eventDate.setHours(0,0,0,0) >= currentDate.setHours(0,0,0,0);
                    }).map(event => (
                        <div className="event-item" key={event.id}>
                            {/* Event details */}
                            <h2>{event.name}</h2>
                            <strong className="hosted-by">Hosted By: </strong><a className="profile-link" onClick={() => handleViewProfile(event.email)}>{event.userName}</a>
                            <p className="description"><strong>Description:</strong> {event.description}</p>
                            <p className="location"><strong>Location:</strong> {event.location}</p>
                            <p className="date"><strong>Date:</strong> {event.date ? event.date.substring(0, 10) : 'Not specified'}</p>
                            <p className="slots"><strong>Reserved Slots:</strong> {event.numberOfApplications}/{event.applicationLimit}</p>
                            <button className="apply-button" onClick={() => handleApplyEvent(event.id)}>Apply</button>
                            <div onClick={() => toggleFavorite(event.id)}>
                                {favoriteEvents.some(favoriteEvent => favoriteEvent.id === event.id) ? <img src={heart1} alt="Heart" /> : <img src={heart} alt="Heart1" />}
                            </div>
                            <img className="event-image" src={event.description.toLowerCase().includes('litter') ? litterCleanup : event.description.toLowerCase().includes('ocean') ? oceanCleanup : homeIcon} alt="Event" />
                        </div>
                    ))
                )}
            </div>
            {showProfileModal && profileData && (
                <div className="profile-modal">
                    <div className="profile-content">
                    <img src={profileData.profilePicture ? `data:image/jpeg;base64,${profileData.profilePicture}` : profileDefault}></img>
                        <p><strong>Name:</strong> {profileData.name}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Mission:</strong> {profileData.mission}</p>
                        <p><strong>Host Experience:</strong></p>
                        {hostedEvents.map(event => (
                                            <li key={event.id}>{event.name}</li>
                                        ))}
                        <button onClick={() => setShowProfileModal(false)}>Close</button>
                    </div>
                </div>
            )}    
            <Footer style={{ marginTop: 'auto' }}/>
        </div>
    );
};
export default AllEvents;