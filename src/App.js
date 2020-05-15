import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import Signin from './views/Signin';
import Profile from './views/Profile';
import Setting from './views/Setting';
import Academy from './views/Academy';
import Post from './views/Post';
import Application from './views/Application';
import ApplicationDetails from './views/ApplicationDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact component={Signin} />
        <Route path='/signin' exact component={Signin}/>
        <Route path='/profile' exact component={Profile} />
        <Route path='/setting' component={Setting} />
        <Route path='/academy' exact component={Academy} />
        <Route path='/academy/:id' component={Post} />
        <Route path='/applications' exact component={Application} />
        <Route path='/applications/:id' component={ApplicationDetails} />
      </div>
    </Router>
  );
}

export default App;