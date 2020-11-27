import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import { Navbar } from './common/Navbar'

// Views
import { Landing } from './landing/Landing'
import { Sign } from './sign/Sign'
import { Offer } from './offer/Offer'
import { Offers } from './offers/Offers'
import { NewOffer } from './newoffer/NewOffer'
import { Guide } from './guide/Guide'

function App() {
	return (
		<div>
			<Navbar />
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/offers" component={Offers} />
					<Route exact path="/sign" component={Sign}  />
					<Route exact path="/password/forgot" />
					<Route exact path="/guide" component={Guide}/>
					<Route exact path="/newoffer" component={NewOffer}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
