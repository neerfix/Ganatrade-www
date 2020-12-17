import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import './Profile.scss';

import {CardReview} from '../common/CardReview'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import moment from 'moment';
import 'moment/locale/fr'

function Profile(props) {

	const [user, setUser] = useState(props.sign.user)

	const responsive = {
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
	};

	useEffect(() => {
		setUser({
			...user,
			creationDate: moment.unix(user.created_at._seconds).format('MMMM YYYY'),
			lastLogin: moment.unix(user.last_login._seconds).format('Do MMMM YYYY')
		})
	}, []);

	const inputChange = (e) => {
		const { name, value } = e.target
		setUser({
			...user,
			[name]: value
		})
	}

	const cancelModifications = (e) => {
		e.preventDefault()
		setUser(props.sign.user)
	}

	const saveModifications = (e) => {
		e.preventDefault()
		const { address, city, zipcode, ...userWithout } = user
		const userUpdate = {
			...userWithout,
			address: {
				street: address,
				city: city,
				zipcode: zipcode
			}
		}
		console.log(userUpdate)
	}

	return(
		<div id="profile">
			<div className="container py-10">
				<div className="grid grid-cols-6 gap-10">

					<div id="infos" className="col-span-3">
						<div className="bg-white shadow overflow-hidden rounded-lg">

							<div className="px-4 py-5 sm:px-6">
								<div className="w-full lg:flex">
									<div className="h-48 lg:w-48 sm:rounded-lg flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
										style={{ backgroundImage: "url('https://tailwindcss.com/img/card-left.jpg')" }}
										title="Woman holding a mug">
									</div>
									<div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 py-2 leading-normal">
										<div className="text-black font-bold text-xl mb-3">{user.username}</div>
										<div className="text-black font-medium text-l mb-3">Mittelschaeffolsheim, BAS-RHIN</div>
										<div className="mb-4">
											<p className="text-grey-darker text-sm mb-0">Membre depuis {user.creationDate}</p>
											<p className="text-grey-darker text-sm mb-0">Temps de réponse : 30 minutes</p>
											<p className="text-grey-darker text-sm mb-0">Dernière connexion le {user.lastLogin}</p>
										</div>
										<div className="flex items-center px-2">
											<div id="stars" className="flex h-3.5 mr-6">
												<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
												<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
												<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
												<i className="gg-trophy bg-gray-light-2 text-gray-light-2 h-2.5 mr-3"></i>
												<i className="gg-trophy bg-gray-light-2 text-gray-light-2 h-2.5"></i>
											</div>
											<div className="text-sm">25 avis</div>
										</div>
									</div>
								</div>
							</div>

							<div className="border-t border-secondary mx-10"></div>

							<form>

								<div className="px-4 py-5">
									<div className="mb-4">
										<label htmlFor="username"
											   className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
												 style={{ minWidth: '30px' }}
											>
												<span className="text-gray-500 sm:text-sm">
													<i className="gg-user" />
												</span>
											</div>
											<input type="text" id="username" name="username" required defaultValue={user.username}
												   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
												   placeholder="Pseudo" onChange={(e) => inputChange(e)} />
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
											<input type="email" id="email" name="email" required defaultValue={user.email}
												   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
												   placeholder="Email" onChange={(e) => inputChange(e)} />
										</div>
									</div>
									<div>
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
												   placeholder="**********" onChange={(e) => inputChange(e)} />
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
													 style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-user" />
													</span>
												</div>
												<input type="text" id="firstname" name="firstname" required defaultValue={user.firstname}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="Prénom" onChange={(e) => inputChange(e)} />
											</div>
										</div>
										<div className="">
											<label htmlFor="lastname"
												   className="block text-sm font-medium text-gray-700">Nom de famille</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													 style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-user" />
													</span>
												</div>
												<input type="text" id="lastname" name="lastname" required defaultValue={user.lastname}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="Nom de famille" onChange={(e) => inputChange(e)} />
											</div>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div className="">
											<label htmlFor="birthdate"
												   className="block text-sm font-medium text-gray-700">Date de naissance</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													 style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-calendar-dates" />
													</span>
												</div>
												<input type="date" id="birthdate" name="birthdate" required defaultValue={user.birthdate}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   onChange={(e) => inputChange(e)} />
											</div>
										</div>
										<div className="">
											<label htmlFor="phone"
												   className="block text-sm font-medium text-gray-700">Téléphone</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													 style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-smartphone" />
													</span>
												</div>
												<input type="text" id="phone" name="phone" required  defaultValue={user.phone}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="0612345678" onChange={(e) => inputChange(e)} />
											</div>
										</div>
									</div>
									<div className="mb-4">
										<label htmlFor="address"
											   className="block text-sm font-medium text-gray-700">Adresse</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
												 style={{ minWidth: '30px' }}
											>
												<span className="text-gray-500 sm:text-sm">
													<i className="gg-globe-alt" />
												</span>
											</div>
											<input type="text" id="address" name="address" required defaultValue={user.address?.street}
												   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
												   placeholder="1 Rue de la République" onChange={(e) => inputChange(e)} />
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
												<input type="text" id="city" name="city" required defaultValue={user.address?.city}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="Paris" onChange={(e) => inputChange(e)} />
											</div>
										</div>
										<div className="">
											<label htmlFor="zipCode"
												   className="block text-sm font-medium text-gray-700">Code postal</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
													 style={{ minWidth: '30px' }}
												>
													<span className="text-gray-500 sm:text-sm">
														<i className="gg-globe-alt" />
													</span>
												</div>
												<input type="text" id="zipCode" name="zipCode" required defaultValue={user.address?.zipcode}
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="95000" onChange={(e) => inputChange(e)} />
											</div>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-6 gap-4 px-4 pb-3 mb-2">
									<button className="col-start-1 col-end-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red hover:bg-red-dark"
										onClick={cancelModifications}>
										<div className="flex items-center">
											<span className="mr-2 sm:text-sm">
												<i className="gg-close-o bg-white text-red" />
											</span>
											Annuler
										</div>
									</button>
									<button className="col-end-7 col-span-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark"
										onClick={saveModifications}>
										<div className="flex items-center">
											<span className="mr-2 sm:text-sm">
												<i className="gg-check-o bg-white text-secondary" />
											</span>
											Enregistrer
										</div>
									</button>
								</div>

							</form>

							<div className="border-t border-secondary mx-10"></div>

							<div className="px-4 py-5">
								<div className="grid grid-cols-2 gap-4">

									<div className="bg-secondary-light-2 overflow-hidden rounded-lg px-4 py-3">
										<div className="flex items-center text-secondary">
											<span className="mr-4 h-5 sm:text-sm">
												<i className="gg-bell" />
											</span>
											<div className="font-bold text-l">Notifications</div>
										</div>
									</div>

									<div className="bg-secondary-light-2 overflow-hidden rounded-lg px-4 py-3">
										<div className="flex items-center text-secondary">
											<span className="mr-4 h-5 sm:text-sm">
												<i className="gg-user-list" />
											</span>
											<div className="font-bold text-l">Profil privée</div>
										</div>
									</div>

								</div>
							</div>

						</div>
					</div>

					<div id="" className="col-span-3">

						<div id="reviews" className="mb-7">
							<div className="text-3xl font-bold leading-7 mb-3">
								Évaluations
							</div>
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=""
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
								responsive={responsive}
							>
								<CardReview user={{ name: 'Alex', text: 'Je lui ai échangé des chaussettes contre une Toyota Yaris Hybride. . . . .' }} />
								<CardReview user={{ name: 'Michel', text: 'Échange rapide d\'une paire de socquettes contre un escargot mort (????)' }} />
								<CardReview user={{ name: 'Morgane', text: '' }} />
								<CardReview user={{ name: 'Nicolas', text: '' }} />
								<CardReview user={{ name: 'Corentin', text: '' }} />
								<CardReview user={{ name: 'Marc', text: '' }} />
							</Carousel>
						</div>

						<div id="publised-offers" className="mb-7">
							<h2 className="text-3xl font-bold leading-7 mb-3">
								Mes offres publiées
							</h2>
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=""
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
								responsive={responsive}
							>
								<CardReview user={{ name: 'Alex' }} />
								<CardReview user={{ name: 'Michel' }} />
								<CardReview user={{ name: 'Morgane' }} />
								<CardReview user={{ name: 'Nicolas' }} />
								<CardReview user={{ name: 'Corentin' }} />
								<CardReview user={{ name: 'Marc' }} />
							</Carousel>
						</div>

						<div id="following-offers">
							<h2 className="text-3xl font-bold leading-7 mb-3">
								Mes offres suivies
							</h2>
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=""
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
								responsive={responsive}
							>
								<CardReview user={{ name: 'Alex' }} />
								<CardReview user={{ name: 'Michel' }} />
								<CardReview user={{ name: 'Morgane' }} />
								<CardReview user={{ name: 'Nicolas' }} />
								<CardReview user={{ name: 'Corentin' }} />
								<CardReview user={{ name: 'Marc' }} />
							</Carousel>
						</div>

					</div>

				</div>
			</div>
		</div>
	)

}

function mapStateToProps(state) {
	const { sign } = state
	return {
		sign
	};
}

const connectedProfilePage = connect(mapStateToProps)(Profile);
export { connectedProfilePage as Profile };
