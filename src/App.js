import logo from './logo.svg';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import { Navbar } from './components/Navbar'

// Views
import { Landing } from './views/Landing'

function App() {
	return (
		<div>
			<Navbar />
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/offers" />
					<Route exact path="/login" />
					<Route exact path="/register" />
					<Route exact path="/password/forgot" />
					<Route exact path="/guide" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
