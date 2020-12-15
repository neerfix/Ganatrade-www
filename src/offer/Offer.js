import React from 'react';
import { Redirect } from 'react-router-dom';
import './Offer.scss';

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

class Offer extends React.Component {

	state = {
		loading: true,
		error: false,
		user: null,
		offer: {
			id: this.props.match.params.id,
		},
	}

	async componentDidMount() {

		const offer_id = this.props.match.params.id;
		console.log(offer_id);
		this.setState({offer : { id: offer_id }});

		// Récupération des infos offre
		const offer_url = "https://beta.api.ganatrade.xyz/offers/" + this.state.offer.id;
		async function fetchOffer(){
			const offer_call = await fetch(offer_url);
			const offer = await offer_call.json();
			return offer;
		}

		// Récupération des infos user
		async function fetchUser(user_url){
			const user_call = await fetch(user_url);
			const user = await user_call.json();
			return user;
		}

		if(offer_id){
			fetchOffer().then( offer => {
				if(!offer){
					throw new Error(offer);
				} else {	
					this.setState({offer: offer, loading: false});
					console.log(this.state.offer);

					const user_url = "https://beta.api.ganatrade.xyz/users/" + this.state.offer.user_id;
					fetchUser(user_url).then( user => {
						if(!user){
							throw new Error(user);
						} else {	
							this.setState({user: user, loading: false});
							console.log(this.state.user)
						}
					}).catch( error => {
						console.log('Erreur dans la récupération de l\'utilisateur');
						this.setState({error: true, loading: false});
						throw error;
					});
				}
			}).catch( error => {
				console.log('Erreur dans la récupération de l\'offre');
				this.setState({error: true, loading: false});
				throw error;
			});
		} else {
			return <Redirect to='/offers'/>;
		}

	}

	render(){
		return(
			<div id="offer">
				<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">
					<div className="grid grid-cols-3 gap-4">
						<div id="offerInfo" className="bg-white rounded col-span-2 mt-5">
							<h1 id="offerTitle" className="text-3xl tracking-tight roboto-bold text-gray-900 ml-3">
								<span className="block xl:inline">
									{this.state.offer.title || <Skeleton height={50}/>}
								</span>
							</h1>
						</div>
						<div id="offerUser" className="bg-white rounded mt-5 p-5">
							<div className="flex">
								{
									this.state.user && this.state.user.avatar && 
									<div className="userAvatar rounded overflow-hidden">
										<img  src={this.state.user.avatar} alt="" /> 
									</div>
									|| 
									<Skeleton height={50} width={50} />
								}

							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}

}

export { Offer }
