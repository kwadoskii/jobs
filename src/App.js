import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Auth from './components/Auth';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path='/' exact component={Signin} />
					<Route path='/signin' exact component={Signin} />
					
					{/* protected routes */}
					<Auth>
						<Route path='/profile' exact component={Profile} />
						<Route path='/academy' exact component={Academy} />
						<Route path='/applications' exact component={Application} />
						<Route path='/applications/:id' component={ApplicationDetails} />
						<Route path='/academy/:id' component={Post} />
						<Route path='/setting' component={Setting} />
					</Auth>
				</Switch>
			</div>
		</Router>
	);
}

export default App;