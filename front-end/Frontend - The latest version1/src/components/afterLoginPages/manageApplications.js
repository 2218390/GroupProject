import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './navbar2.js';
import "./myapplications.css";
import profileDefault from '../images/profile.png';

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const { eventId } = useParams();
    const jwtToken = sessionStorage.getItem("jwt");
    const [profileData, setProfileData] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false); // State for profile modal
    const [volunteeredEvents, setVolunteeredEvents] = useState([]);

    useEffect(() => {
        const fetchApplicationsForEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/applications/${parseInt(eventId, 10)}/applications`,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications for event:', error);
            }
        };
        fetchApplicationsForEvent();
    }, [eventId]);

    const handleUpdateStatus = async (applicationId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/applications/${applicationId}`, { applicationStatus: newStatus },{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setApplications(applications.map(application => {
                if (application.id === applicationId) {
                    return { ...application, applicationStatus: newStatus };
                }
                return application;
            }));
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };
    const fetchApplications = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/applications/applications/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            const filteredApplications = response.data.filter(application => application.applicationStatus === "accepted" && application.event.isFinished === true);
            setVolunteeredEvents(filteredApplications);
            console.log(volunteeredEvents);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };
    const handleViewProfile = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/email/${email}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setProfileData(response.data);
            fetchApplications(profileData.id);
            setShowProfileModal(true); // Show profile modal
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <div>
            <Header/>
            <h1 className='page-title'>Your Applications</h1>
            {applications.length === 0 ? (
                <p>You do not have any applicants for your event.</p>
            ) : (
                <ul className='myapplied events-list'>
                    {applications.map(application => (
                        <li className='myapp-box' key={application.id}>
                            <strong>Applicant Name: </strong><a className="profile-link" onClick={() => handleViewProfile(application.applicantEmail)}>{application.applicantName}</a>
                            <p><strong>Applicant Email:</strong> {application.applicantEmail}</p>
                            <p><strong>Status:</strong> {application.applicationStatus}</p>
                            <select onChange={(e) => handleUpdateStatus(application.id, e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </li>
                    ))}
                </ul>
            )}
            {showProfileModal && profileData && (
                <div className="profile-modal">
                    <div className="profile-content">
                        <img className="profile-picture"src={profileData.profilePicture ? `data:image/jpeg;base64,${profileData.profilePicture}` : profileDefault}></img>
                        <p><strong>Name:</strong> {profileData.name}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Mission:</strong> {profileData.mission}</p>
                        <p><strong>Volunteer Experience:</strong></p>
                        {volunteeredEvents.map(application => (
                                            <li key={application.id}>
                                                <div>{application.event.name}</div>
                                            </li>
                                        ))}
                        <button onClick={() => setShowProfileModal(false)}>Close</button>
                    </div>
                </div>
            )} 
        </div>
    );
};
export default ManageApplications;