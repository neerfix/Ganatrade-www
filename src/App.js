import React from 'react'
{ BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import PrivateRoute from "./router/PrivateRoute"
import ScrollToTop from "./router/scrollToTop"

// Components
import { Navbar } from './common/Navbar'

// Views
import { Landing } from './landing/Landing'
import { Sign } from './sign/Sign'
import { Offer } from './offer/Offer'
import { Offers } from './offers/Offers'
import { NewOffer } from './newoffer/NewOffer'
import { Guide } from './guide/Guide'
import { Profile } from './profile/Profile'

function App() {

	let history = useHistory();

	return (
		<div className="bg-gray-light-3">
			<Navbar />
			<Router history={history}>
				<ScrollToTop />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/offers/:id" component={Offer} />
					<Route exact path="/offers" component={Offers} />
					<Route exact path="/sign" component={Sign}  />
					<Route exact path="/password/forgot" />
					<Route exact path="/guide" component={Guide}/>
					<Route exact path="/newoffer" component={NewOffer}/>
					<Route exact path="/profile/:id" component={Profile}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
