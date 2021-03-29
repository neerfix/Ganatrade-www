import React from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { withRouter } from "react-router";

import { PrivateRoute } from "./router/PrivateRoute"
import ScrollToTop from "./router/scrollToTop"

// Components
import { Navbar } from './common/Navbar'

// Views
import { Landing } from './landing/Landing'
import { Sign } from './sign/Sign'
import { Offer } from './offer/Offer'
import { Offers } from './offers/Offers'
import { NewOffer } from './newoffer/NewOffer'
import { NewTrade } from "./newtrade/NewTrade";
import { Guide } from './guide/Guide'
import { Profile } from './profile/Profile'

function App() {

	let history = useHistory();

	return (
		<div className="bg-gray-light-3">
			<Router history={history}>
				<Navbar />
				<ScrollToTop />
				<Switch>
					<Route exact path="/" component={withRouter(Landing)} />
					<Route exact path="/offers/:id" component={withRouter(Offer)} />
					<Route exact path="/offers" component={withRouter(Offers)} />
					<Route exact path="/sign" component={withRouter(Sign)} />
					<Route exact path="/password/forgot" />
					<Route exact path="/guide" component={withRouter(Guide)}/>
					<PrivateRoute exact path="/newoffer" component={withRouter(NewOffer)}/>
					<PrivateRoute exact path="/newtrade/:id" component={withRouter(NewTrade)}/>
					<Route exact path="/profile/:id" component={withRouter(Profile)} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
