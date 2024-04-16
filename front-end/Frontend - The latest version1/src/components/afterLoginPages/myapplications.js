import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './navbar2.js';
import Footer from '../footer.js';
import './myapplications.css';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");
    useEffect(() => {
        const fetchUserApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/applications/applications/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching user applications:', error);
            }
        };
        fetchUserApplications();
    }, []);

    const handleDeleteApplication = async (applicationId) => {
        try {
            await axios.delete(`http://localhost:8080/applications/${applicationId}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setApplications(applications.filter(application => application.id !== applicationId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <h1 className='page-title'>Your Applications</h1>
                <ul className='myappliedevents-list'>
                {applications.length === 0 ? (
                    <p>You have not applied for any events.</p>
                ) : (
                    <ul className='myappliedevents-list'>
                        {applications.map(application => (
                            <li className='myapp-box' key={application.id}>
                                <p><strong>Event Name:</strong> {application.eventName}</p>
                                <p><strong>Status:</strong> {application.applicationStatus}</p>
                                <button className='withdraw-app-button' onClick={() => handleDeleteApplication(application.id)}>Withdraw Application</button>
                            </li>
                        ))}
                    </ul>
                )}
                </ul>
                <Footer style={{ marginTop: 'auto' }}/>
            </div>
        </div>
    );
};
export default MyApplications;