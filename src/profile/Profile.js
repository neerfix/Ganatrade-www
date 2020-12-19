import React from 'react'
import {connect} from 'react-redux'
import './Profile.scss'

import axios from 'axios'
import apiConfig from '../config/api.config'
import { userActions } from '../redux/_actions/user.actions'

import {OfferCard} from '../components/OfferCard'
import {CardReview} from '../common/CardReview'

import { Redirect } from 'react-router-dom';

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

// Carousel
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

// Moment js
import moment from 'moment'
import 'moment/locale/fr'

// Profil de l'utilisateur
import {OfferUser} from '../components/OfferUser';

class Profile extends React.Component {

	state = {
		loading: true,
		error: false,
		user: {
			id: this.props.match.params.id,
		},
		editedUser:{
			id: this.props.match.params.id,
		},
		trades: [],
		offers: [],
	}

	responsive = {
		desktop: {
			breakpoint: {
				max: 3000,
				min: 1024
			},
			items: 1,
			partialVisibilityGutter: 40
		},
		mobile: {
			breakpoint: {
				max: 464,
				min: 0
			},
			items: 1,
			partialVisibilityGutter: 30
		},
		tablet: {
			breakpoint: {
				max: 1024,
				min: 464
			},
			items: 1,
			partialVisibilityGutter: 30
		}
	}

	inputChange(e) {
		const { name, value } = e.target;

		if( value && this.state.user[name] !== value ){

			if( name === "city" || name === "street" || name === "zipcode"){
				this.setState({editedUser : {
					...this.state.editedUser,
					address : {
						...this.state.editedUser.address, 
						[name]: value
					}
			  	}})
			} else {
				this.setState({editedUser : {
					...this.state.editedUser,
					[name]: value
			  	}})
			}
		}
	}

	saveModifications = async (e) => {
		e.preventDefault();
		const { dispatch } = this.props;

		if(!this.state.editedUser.address){
			this.setState({editedUser : { address : { city : "", zipcode: "", street: "" } }});
		}

		await dispatch(userActions.update(this.state.editedUser));
		document.location.reload();
		
	}

	cancelModifications = (e) => {
		e.preventDefault()
		document.getElementById("updateUser").reset();
		console.log('click');

		console.log(this.state.editedUser);

		this.setState({editedUser : this.state.user})
		/*
		Object.keys(this.state.editedUser).map( (prop) => {
			this.setState({editedUser : {
				[prop]: undefined
			}})
		})
		*/
	}

	async componentDidMount() {

		const user_id = this.props.match.params.id;
		this.setState({user : { id: user_id }});

		const api_url = "https://beta.api.ganatrade.xyz/users/";

		// Récupération des infos user
		const user_url = api_url + this.state.user.id;
		async function fetchUser(){
			const user_call = await fetch(user_url);
			const user = await user_call.json();
			return user;
		}

		// Récupération des infos trades
		const offers_url = api_url + this.state.user.id + '/offers/';
		async function fetchOffers(trades_url){
			const trades_call = await fetch(trades_url);
			const trades = await trades_call.json();
			return trades;
		}

		// Récupération des avis utilisateur
		const reviews_url = api_url + this.state.user.id + '/reviews/';
		async function fetchReviews(reviews_url){
			const reviews_call = await fetch(reviews_url);
			const reviews = await reviews_call.json();
			return reviews;
		}

		if(user_id){

			fetchUser(user_url).then( user => {
				if(!user){
					throw new Error(user);
				} else {
					this.setState({user: user, loading: false});
					this.setState({editedUser: user, loading: false});

					fetchOffers(offers_url).then( offers => {
						if(!offers){
							throw new Error(offers);
						} else {
							this.setState({offers: offers, loading: false});
						}
					}).catch( error => {
						console.log('Erreur dans la récupération des offres');
						this.setState({error: true, loading: false});
						throw error;
					});

					fetchReviews(reviews_url).then( reviews => {
						if(!reviews){
							throw new Error(reviews);
						} else {
							this.setState({reviews: reviews, loading: false});
						}
					}).catch( error => {
						console.log('Erreur dans la récupération des reviews');
						this.setState({error: true, loading: false});
						throw error;
					});

				}
			}).catch( error => {
				console.log('Erreur dans la récupération de l\'utilisateur');
				this.setState({error: true, loading: false});
				throw error;
			});

		} else {
			return <Redirect to='/offers'/>;
		}

	}

	render(){
		return(
			<div id="user">
				<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">
					<div className="grid grid-cols-4 gap-4">

						<div id="userProfile" className="col-span-2 rounded mt-5 p-5 bg-white">

							{/* Carte utilisateur */}
							{
								this.state.user ?
								(
									<OfferUser user={this.state.user} />
								) : (
									<Skeleton height={300} />
								)
							}

							{ (this.state.user.id === this.props.sign.user.id) &&
								<form id="updateUser">
									<div className="px-4 py-5">
										<div className="mb-4">
											<label htmlFor="username"
												className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													style={{ minWidth: '30px' }} >
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-user" />
													</span>
												</div>
												<input type="text" id="username" name="username" required defaultValue={this.state.editedUser.username || this.state.user.username}
													className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													placeholder="Pseudo" onChange={(e) => this.inputChange(e)} onBlur={(e) => this.inputChange(e)} />
											</div>
										</div>
										<div className="mb-4">
											<label htmlFor="email"
												className="block text-sm font-medium text-gray-700">Adresse email</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-mail" />
													</span>
												</div>
												<input type="email" id="email" name="email" required defaultValue={this.state.editedUser.email || this.state.user.email}
													className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													placeholder="Email" onChange={(e) => this.inputChange(e)} />
											</div>
										</div>
										{/* <div className="mb-4">
											<label htmlFor="password"
												className="block text-sm font-medium text-gray-700">Mot de passe</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-keyhole" />
													</span>
												</div>
												<input type="password" id="password" name="password" required
													className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													placeholder="**********" onChange={(e) => this.inputChange(e)} />
											</div>
										</div> */}
										<div className="">
												<label htmlFor="avatar"
													className="block text-sm font-medium text-gray-700">Avatar</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }} >
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-image" />
														</span>
													</div>
													<input type="text" id="avatar" name="avatar" required defaultValue={this.state.editedUser.avatar || this.state.user.avatar}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="Avatar (url)" onChange={(e) => this.inputChange(e)} />
												</div>
										</div>
									</div>

									<div className="border-t border-secondary mx-10"></div>

									<div className="px-4 py-5 pb-1">
										<div className="grid grid-cols-2 gap-4 mb-4">
											<div className="">
												<label htmlFor="firstname"
													className="block text-sm font-medium text-gray-700">Prénom</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }} >
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-user" />
														</span>
													</div>
													<input type="text" id="firstname" name="firstname" required defaultValue={this.state.editedUser.firstname || this.state.user.firstname}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="Prénom" onChange={(e) => this.inputChange(e)} />
												</div>
											</div>
											<div className="">
												<label htmlFor="lastname"
													className="block text-sm font-medium text-gray-700">Nom de famille</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }} >
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-user" />
														</span>
													</div>
													<input type="text" id="lastname" name="lastname" required defaultValue={this.state.editedUser.lastname || this.state.user.lastname}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="Nom de famille" onChange={(e) => this.inputChange(e)} />
												</div>
											</div>
										</div>
										{/*
										<div className="grid grid-cols-2 gap-4 mb-4">
											<div className="">
												<label htmlFor="phone"
													className="block text-sm font-medium text-gray-700">Téléphone</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }} >
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-smartphone" />
														</span>
													</div>
													<input type="text" id="phone" name="phone" defaultValue={this.state.editedUser.phone || this.state.user.phone}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="0612345678" onChange={(e) => this.inputChange(e)} />
												</div>
											</div>
										</div>
										<div className="mb-4">
											<label htmlFor="street"
												className="block text-sm font-medium text-gray-700">Adresse</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-globe-alt" />
													</span>
												</div>
												<input type="text" id="street" name="street" defaultValue={this.state.editedUser.street || this.state.user.street}
													className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													placeholder="1 Rue de la République" onChange={(e) => this.inputChange(e)} />
											</div>
										</div>
										<div className="grid grid-cols-3 gap-4 mb-4">
											<div className="col-span-2">
												<label htmlFor="city"
													className="block text-sm font-medium text-gray-700">Ville</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }}
													>
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-globe-alt" />
														</span>
													</div>
													<input type="text" id="city" name="city" defaultValue={this.state.editedUser.city || this.state.user.city}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="Paris" onChange={(e) => this.inputChange(e)} />
												</div>
											</div>
											<div className="">
												<label htmlFor="zipCode"
													className="block text-sm font-medium text-gray-700">Code postal</label>
												<div className="mt-1 relative rounded-md shadow-sm">
													<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
														style={{ minWidth: '30px' }} >
														<span className="text-gray-500 sm:text-sm">
															<i className="gg-globe-alt" />
														</span>
													</div>
													<input type="text" id="zipCode" name="zipCode" defaultValue={this.state.editedUser.zipcode || this.state.user.zipcode}
														className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
														placeholder="95000" onChange={(e) => this.inputChange(e)} />
												</div>
											</div>
										</div>
										*/}
									</div>
								
									<div className="grid grid-cols-6 gap-4 px-4 pb-3 mb-2">
										<button className="col-start-1 col-end-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red hover:bg-red-dark"
												onClick={this.cancelModifications}>
											<div className="flex items-center">
												<span className="mr-2 sm:text-sm">
													<i className="gg-close-o bg-white text-red" />
												</span>
												Annuler
											</div>
										</button>
										<button className="col-end-7 col-span-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark"
												onClick={this.saveModifications}>
											<div className="flex items-center">
												<span className="mr-2 sm:text-sm">
													<i className="gg-check-o bg-white text-secondary" />
												</span>
												Enregistrer
											</div>
										</button>
									</div>

								</form>
							}

						</div>

						{/* Colonne de droite */}
						<div id="userProfile" className="col-span-2 rounded mt-5 p-5">

							{/* Evaluations utilisateur */}

							<div id="reviews" className="mb-7">
								<div className="text-3xl font-bold leading-7 mb-3">
									Évaluations
								</div>
								{
									this.state.reviews && this.state.reviews.length  ?
									(
										<Carousel
												additionalTransfrom={0}
												arrows
												autoPlaySpeed={3000}
												centerMode={false}
												className="ml-0"
												containerClass=""
												dotListClass=""
												draggable
												focusOnSelect={false}
												itemClass=""
												keyBoardControl
												minimumTouchDrag={80}
												partialVisible
												renderButtonGroupOutside={false}
												renderDotsOutside={false}
												showDots={false}
												sliderClass=""
												slidesToSlide={1}
												swipeable
												responsive={this.responsive}
											>
														
												{this.state.reviews.map( (review, index) => {
													return(
														<CardReview
															key={index}
															review={review}
														/>
													)
												})}
											
											</Carousel>
									) : (
										<div className="flex items-center justify-center overflow-hidden bg-white p-3 mb-3">
											<i className="gg-smile-sad mr-3"></i>
											Aucun avis
										</div>
									)
								}
								
							</div>

							{/* Offres */}
							{ ( this.state.user.id === this.props.sign.user.id ) &&
									<div id="offers" className="mb-7">
									<div className="text-3xl font-bold leading-7 mb-3">
										Vos offres
									</div>
									{
										this.state.offers && this.state.offers.length ?
										(
											<Carousel
												additionalTransfrom={0}
												arrows
												autoPlaySpeed={3000}
												centerMode={false}
												className="ml-0"
												containerClass="container"
												dotListClass=""
												draggable
												focusOnSelect={false}
												itemClass=""
												keyBoardControl
												minimumTouchDrag={80}
												partialVisible
												renderButtonGroupOutside={false}
												renderDotsOutside={false}
												showDots={false}
												sliderClass=""
												slidesToSlide={1}
												swipeable
												responsive={this.responsive}
											>
														
												{this.state.offers.map( (offer, index) => {
													return(
														<OfferCard
															key={index}
															offer={offer}
														/>
													)
												})}
											
											</Carousel>
	
										) : (
											<div className="flex items-center justify-center overflow-hidden bg-white p-3 mb-3">
												<i className="gg-smile-sad mr-3"></i>
												Aucune offre
											</div>
										)
										
									}
								</div>
							}

						</div>
					</div>

					{/* Liste des offres si le profil != user connecté */}
					{ ( this.state.user.id !== this.props.sign.user.id ) &&
						<div id="offers" className="mt-5 mb-7">
							<div className="text-3xl font-bold leading-7 mb-3">
								Offres publiées par {this.state.user.username}
							</div>
								{
									this.state.offers && this.state.offers.length ?
									(
										<Carousel
											additionalTransfrom={0}
											arrows
											autoPlaySpeed={3000}
											centerMode={false}
											className="ml-0"
											containerClass="container"
											dotListClass=""
											draggable
											focusOnSelect={false}
											itemClass=""
											keyBoardControl
											minimumTouchDrag={80}
											partialVisible
											renderButtonGroupOutside={false}
											renderDotsOutside={false}
											showDots={false}
											sliderClass=""
											slidesToSlide={1}
											swipeable
											responsive={this.responsive}
										>
													
											{this.state.offers.map( (offer, index) => {
												return(
													<OfferCard
														key={index}
														offer={offer}
													/>
												)
											})}
										
										</Carousel>

									) : (
										<div className="flex items-center justify-center overflow-hidden bg-white p-3 mb-3">
											<i className="gg-smile-sad mr-3"></i>
											Aucune offre
										</div>
									)
									
								}
							</div>
					}

				</main>
			</div>
		)
	}

}

function mapStateToProps(state) {
	const { sign } = state
	return {
		sign
	};
}

const connectedProfilePage = connect(mapStateToProps)(Profile);

export { connectedProfilePage as Profile }