import React from "react";
import "./profile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react";
import FormData from 'form-data';
import Header from './navbar2.js';
import profileDefault from '../images/profile.png';
import { MdFileUpload } from "react-icons/md";

export default function Profile(){
    const [user, setUser] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");
    const [hostedEvents, setHostedEvents] = useState([]);
    const [volunteeredEvents, setVolunteeredEvents] = useState([]);
    const email=useRef();
    const name=useRef();
    const mission=useRef();
    const [file, setFile] = useState(null);
    const imageUrl1 = user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : profileDefault;

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

        const fetchApplications = async () => {
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

        const fetchEvents = async () => {
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
        fetchEvents();
        fetchData();
        fetchApplications();
    }, [userId, jwtToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put("http://localhost:8080/user/"+userId,{
            mission: mission.current.value
        },{
            headers: {
                Authorization: `Bearer ${jwtToken}` // Include token in headers
            }
        }).then(response=>{
            console.log(response);
            if (response.status === 200){
                alert("Profile Information Updated Successfully.")
            }
        }).then((response)=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        try {
            if (!file) {
                console.error('No file selected.');
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            await axios.put("http://localhost:8080/user/"+userId, formData,{
                headers:{
                    Authorization: `Bearer ${jwtToken}`, // Include token in headers
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        window.location.reload();
    };
    return (
        <div>
            <Header/>
            <div class="container-xl px-4 mt-4">
                <hr class="mt-0 mb-4"></hr>
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mb-4 mb-xl-0">
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                <img class="img-account-profile rounded-circle mb-2" src={imageUrl1} alt="Profile"></img>
                                <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <input type="file" onChange={handleFileChange} accept="image/*" />
                                <button className='upload-image-button' onClick={handleUpload} title="Upload Image">
                            <MdFileUpload /></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="card mb-4">
                            <div class="card-header">Account Details</div>
                            <div class="card-body">
                                <form class="profile" noValidate onSubmit={handleSubmit}>
                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputFullName">Full Name</label>
                                            <input class="form-control" id="inputFullName" type="text" value={user.name} ref={name}></input>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input class="form-control" id="inputEmailAddress" type="text" value={user.email} ref={email}></input>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="small mb-1" for="inputMission">Mission (Background Information)</label>
                                        <textarea class="form-control2" id="inputMission" defaultValue={user.mission} ref={mission}></textarea>
                                    </div>
                                    <input type="submit" value="Save changes"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card mb-4">
                            <div className="card-header">Host Experience</div>
                            <div className="card-body">
                            {hostedEvents.length === 0 ? (
                                    <p>You have not hosted any events.</p>
                                ) : (
                                    <ul>
                                        {hostedEvents.map(event => (
                                            <li key={event.id}>{event.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card mb-4">
                            <div className="card-header">Volunteer Experience</div>
                            <div className="card-body">
                                {volunteeredEvents.length === 0 ? (
                                    <p>You have not volunteered for any events.</p>
                                ) : (
                                    <ul>
                                        {volunteeredEvents.map(application => (
                                            <li key={application.id}>
                                                <div>{application.event.name}</div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
