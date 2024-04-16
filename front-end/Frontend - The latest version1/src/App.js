import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import LoginPage from './components/loginpage.js';
import HomePage from './components/homepage.js';
import AboutPage from './components/aboutpage.js';
import ImageSlider from './components/imageSlider.js';
import HPaL from './components/afterLoginPages/homepageAL.js';
import Profile from './components/afterLoginPages/profile.js';
import PostEvent from './components/afterLoginPages/postEvent.js';
import ListEvent from './components/afterLoginPages/ListEvents.js';
import Footer from './components/footer.js';
import Registration from './components/registration.js';
import ManageEvents from './components/afterLoginPages/manageEvents.js';
import ManageApplications from './components/afterLoginPages/manageApplications.js';
import MyApplications from './components/afterLoginPages/myapplications.js';
import Favourites from './components/afterLoginPages/favourites.js';
import ForgotPassword from './components/forgotpassword.js';

function App() {
   return (
     <Router>
       <div>
         <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/imageSlider" element={<ImageSlider />} />
          <Route path="/homepage" element={<HPaL />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/postevent" element={<PostEvent/>}/>
          <Route path="/listevent" element={<ListEvent/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/manage" element={<ManageEvents/>}/>
          <Route path="/manageApplications/:eventId" element={<ManageApplications/>}/>
          <Route path="/myapplications" element={<MyApplications/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/homepageAL" element={<HPaL/>}/>
         {/* Add more routes as needed */}
         </Routes>
       </div>
     </Router>
   );
 }
 
 export default App;