import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Offer.scss';


// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

// Moment js
import moment from 'moment';
import 'moment/locale/fr'

// Zoom on Img
import { ImageGroup, Image } from 'react-fullscreen-image'

// Placeholder
import placeholder from '../assets/img/placeholder.png';
import placeholder1 from '../assets/img/placeholder1.png';
import placeholder2 from '../assets/img/placeholder2.png';

// Profil de l'utilisateur
import {OfferUser} from '../components/OfferUser';

class Offer extends React.Component {

	state = {
		loading: true,
		error: false,
		user: null,
		map_url : '',
		trades: [],
		offer: {
			id: this.props.match.params.id,
		},
	}

	async componentDidMount() {

		const offer_id = this.props.match.params.id;
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

		// Récupération des infos trades
		const trades_url = offer_url + '/trades';
		async function fetchTrades(trades_url){
			const trades_call = await fetch(trades_url);
			const trades = await trades_call.json();
			return trades;
		}

		if(offer_id){
			fetchOffer().then( offer => {
				if(!offer){
					throw new Error(offer);
				} else {

					if(!offer.pictures.length){
						offer.pictures.push(placeholder1);
						offer.pictures.push(placeholder2);
					}

					this.setState({offer: offer, loading: false});
					if( this.state.offer.trade && this.state.offer.trade.place && this.state.offer.trade.place.longitude ){
						this.state.map_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' + this.state.offer.trade.place.longitude + ',' + this.state.offer.trade.place.latitude + ',12.7,0.00,0.00/400x300@2x?access_token=pk.eyJ1IjoiYWltZWVyaXRsZW5nIiwiYSI6ImNrYnl3cHNkYTB4dHEycm5hdWNlc3lyOWUifQ.0JJSaUTh5i90t6xL0gmVyQ';
					}


					// Récupération des infos utilisateur
					const user_url = "https://beta.api.ganatrade.xyz/users/" + this.state.offer.user_id;
					fetchUser(user_url).then( user => {
						if(!user){
							throw new Error(user);
						} else {
							this.setState({user: user, loading: false});
						}
					}).catch( error => {
						console.log('Erreur dans la récupération de l\'utilisateur');
						this.setState({error: true, loading: false});
						throw error;
					});

					// Récupération des trades
					fetchTrades(trades_url).then( trades => {
						if(!trades){
							throw new Error(trades);
						} else {
							trades.map( (trade) => {
								// Récupération des infos utilisateur de l'échange
								const trade_user_url = "https://beta.api.ganatrade.xyz/users/" + trade.trader_id;
								fetchUser(trade_user_url).then( user => {
									if(!user){
										throw new Error(user);
									} else {
										trade.user = user;
									}
									this.setState({trades : [...this.state.trades, trade]});
								}).catch( error => {
									console.log('Erreur dans la récupération de l\'utilisateur de l\'échange');
									throw error;
								});
								return trade;
							})

							console.log(offer);
							console.log(trades);
						}
					}).catch( error => {
						console.log('Erreur dans la récupération des offres');
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
						<div className="col-span-2">

							{/* Contenu de l'offre */}
							<div id="offerInfo" className="bg-white rounded mb-5">
								<h1 id="offerTitle" className="text-3xl tracking-tight roboto-bold text-gray-900 ml-3">
									<span className="block xl:inline">
										{this.state.offer.title || <Skeleton height={50}/>}
									</span>
								</h1>

								<div className="mt-5 p-5">
									<div className="offerPictures pb-5">
										{this.state.offer.pictures ? (
											<ImageGroup>
												<div className="images">
													{ this.state.offer.pictures[0].length > 1 ? (
														this.state.offer.pictures.map( (picture, i) => {
															return(
																<div key={picture}>
																	<Image src={picture} alt='Photo du produit' />
																</div>
															)
														})
														) : (
															<div key={this.state.offer.pictures}>
																<Image src={this.state.offer.pictures} alt='Photo du produit' />
															</div>
														)
													}
												</div>
											</ImageGroup>
										) : (
											<Skeleton height={300}/>
										)}
									</div>

									{ !this.state.offer || this.state.loading ?
										(
											<div>
												<Skeleton height={300} className="mt-3"/>
												<Skeleton height={30} className="my-3"/>
											</div>
										) : (
											<div className="mt-5 mb-2 pt-2">

												{/* Informations produit */}
												<div className="flex justify-between my-5 px-2">
													<div className="w-2/5">
														{ this.state.offer.product && this.state.offer.product.condition &&
															<p>ÉTAT : <span className="roboto-bold">{this.state.offer.product.condition}</span></p>
														}
														{ this.state.offer.trade.method &&
															<p>METHODE : <span className="roboto-bold">{this.state.offer.trade.method}</span></p>
														}
														{ this.state.offer.trade.estimation &&
															<p>VALEUR : <span className="roboto-bold">{this.state.offer.trade.estimation}</span>€</p>
														}
														{ this.state.offer.trade.target &&
															<p>CONTRE : <span className="roboto-bold">{this.state.offer.trade.target}</span></p>
														}
													</div>
													<div className="offerDescription w-3/5 ml-5">
														<p>{ this.state.offer.description }</p>
													</div>
												</div>

												<hr></hr>

												<div className="flex justify-between items-center mt-5">
													{/* Tags */}
													<div className="flex items-center">
														<i className="gg-tag mr-5 p-1"></i>
														{ this.state.offer.tags ?
															(
																this.state.offer.tags.map( (tag, i) => {
																return (
																	<span key={i} className="tag flex uppercase align-items-center bg-gray-100 rounded-full text-sm roboto-medium text-green-600 pr-1 mr-1" >
																		{tag}
																	</span>
																	)
																})
															) : (
																<small className="mr-5" >
																	Aucun tag
																</small>
															)
														}
													</div>

													{/* Vues */}
													<div className="flex items-center">
														<i className="gg-eye mr-3"></i>
														<span className="mr-1">{ this.state.offer.views || "0" }</span>
														vues
														{ ( this.state.offer.views > 500 ) && " 🔥" }
													</div>
												</div>
											</div>
										)
									}
								</div>
							</div>

							{/* Offres */}
							<div id="offerComments" className="rounded mt-5">

								<div className="flex justify-between">
									<h2 className="text-3xl tracking-tight roboto-bold text-gray-900 ml-3">
										<span className="block xl:inline">
											Propositions d'échange
										</span>
									</h2>
									{this.state.offer &&
										<Link className="flex items-center p-2 bg-primary text-white rounded-md hover:bg-primary-dark"
											to={ "/newoffer/" + this.state.offer.id }>
											Faire une proposition
										</Link>
									}
								</div>

								<div className="mt-5">
									{ this.state.trades ?
										(
											<div>
												{ this.state.trades.length > 0 ? (
														this.state.trades.map( (trade, i) => {
															return (
																<div key={i} className="flex items-center bg-white p-3 mb-3">
																	<div className="h-20 w-20 rounded-full ring-2 ring-white mr-3 overflow-hidden flex items-center">
																		<img src={trade.user.avatar} alt="" />
																	</div>
																	<div>
																		<p>Posté par
																			<Link title="Consulter le profil"
																				className="ml-1"
																				to={"/profile/" + trade.user.id} >
																				{trade.user.username}
																			</Link>
																			{trade.date_of_trade &&
																				<span className="ml-1">{moment.unix(trade.date_of_trade._seconds).fromNow()}</span>
																			}
																		</p>
																	</div>
																</div>
															)
														})
													) : (
														// Aucun échange proposé
														<div className="flex items-center justify-center overflow-hidden bg-white p-3 mb-3">
															<i className="gg-smile-sad mr-3"></i>
															Aucune proposition d'échange pour l'instant
														</div>
													)
												}
											</div>
										): (
											<div>
												<div className="flex items-center overflow-hidden bg-white p-3 mb-3">
													<Skeleton circle={true}  height={70} width={70} className="mr-2" />
													<Skeleton height={40} width={200}/>
												</div>
												<div className="flex items-center overflow-hidden bg-white p-3 mb-3">
													<Skeleton circle={true}  height={70} width={70} className="mr-2" />
													<Skeleton height={40} width={200}/>
												</div>
												<div className="flex items-center overflow-hidden bg-white p-3 mb-3">
													<Skeleton circle={true}  height={70} width={70} className="mr-2" />
													<Skeleton height={40} width={200}/>
												</div>
											</div>
										)
									}
								</div>
							</div>

						</div>

						<div id="offerUser" className="rounded mt-5 p-5">

							{/* Carte utilisateur */}
							{
								this.state.user ?
								(
									<OfferUser user={this.state.user} />
								) : (
									<Skeleton height={300} />
								)
							}

							<hr className="my-5"></hr>

							{/* Rayon d'échange */}
							<div>
								{
									this.state.offer.trade && this.state.offer.trade.place && this.state.offer.trade.place.name ?
									(
										<div className="flex justify-between mb-3">
											<p>RAYON D'ÉCHANGE</p>
											<p className="roboto-bold text-uppercase">
												{this.state.offer.trade.place.name}
											</p>
										</div>
									) : (
										<div className="flex justify-between mb-3">
											<p>RAYON D'ÉCHANGE</p>
											<p className="roboto-bold">
												INCONNU
											</p>
										</div>
									)
								}

								{/* Emplacement de l'offre */}
								<div className="offerPlace">
									{
										this.state.map_url ?
										(
											<a className="offerPlaceMap flex items-center justify-center" title="Voir sur le plan"
												target="_blank" rel="noreferrer"
												href={"https://www.google.fr/maps/?q=" + this.state.offer.trade.place.name}>
												<img alt="Carte statique Mapbox de la zone d'échange"
												src={this.state.map_url} />
											</a>
										) : (
											<img alt="Carte statique Mapbox de la zone d'échange"
												src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/3.1246,46.8675,3.08,0/300x200?access_token=pk.eyJ1IjoiYWltZWVyaXRsZW5nIiwiYSI6ImNrYnl3cHNkYTB4dHEycm5hdWNlc3lyOWUifQ.0JJSaUTh5i90t6xL0gmVyQ' />
										)
									}
								</div>

							</div>

							<hr className="my-5"></hr>

							{/* Signaler */}
							{
								this.state.user && this.state.user ?
								(
									<div className="w-full flex align-center justify-around">
										<div className="flex items-center justify-center border border-transparent cursor-pointer font-medium rounded-md text-black hover:text-primary">
											<i className="gg-flag-alt mr-2"></i>
											<small>Signaler l'annonce</small>
										</div>

										<div className="flex items-center justify-center border border-transparent cursor-pointer font-medium rounded-md text-black hover:text-primary">
											<i className="gg-flag-alt mr-2"></i>
											<small>Signaler l'utilisateur</small>
										</div>
									</div>
								) : (
									<div>
									</div>
								)
							}

						</div>
					</div>
				</main>
			</div>
		)
	}

}

export { Offer }
