import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './NewTrade.scss'

import {Link, useHistory} from "react-router-dom"

import axios from "axios"
import configApi from '../config/api.config'

import {Listbox, Transition} from "@headlessui/react"

import placeholder from '../assets/img/placeholder.png';
import moment from "moment";

function NewTrade(props) {

	let history = useHistory()

	const [offer, setOffer] = useState({})
	const [fields, setFields] = useState({})
	const [types] = useState([{ text: "Achat", value: "purchase" }, { text: "Échange", value: "exchange" }])
	const [selectedType, setSelectedType] = useState({})

	useEffect(() => {

		if(props.match.params.id) {
			axios.get(`${configApi}offers/${props.match.params.id}`)
				.then((response => {
					let offer = response.data
					axios.get(`${configApi}users/${offer.user_id}`)
						.then((r => {
							offer.user = r.data
							console.log(offer)
							setOffer(offer)
						}))
				}))
				.catch(e => {
					console.log(e)
					history.push('/offers')
				})
		} else {
			history.push('/offers')
		}

	}, [props.match.params.id])

	const inputChange = (e) => {
		const { name, value } = e.target
		setFields({
			...fields,
			[name]: value
		})
	}

	const addTrade = (e) => {
		e.preventDefault()
		let newTrade = {
			date_of_trade: new Date(),
			is_visible: true,
			offer_id: offer.id,
			status: 'PENDING',
			type: selectedType.value,
			value: fields.value,
			trader_id: props.user.id,
			buyer_id: offer.user_id
		}
		axios.post(`${configApi}offers/${offer.id}/trades`, newTrade)
			.then((response) => {
				// console.log(response)
				history.push('/offers/' + offer.id)
			})
			.catch(e => {
				console.log(e)
			})
	}

	return(
		<div id="new-trade">
			<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">

				<div className="bg-white rounded mb-10 px-2 py-2">
					<div className="w-full flex">
						<div className="h-40 w-52 sm:rounded-lg flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
							<img className="w-full h-full" src={offer.pictures ? offer.pictures[0] : placeholder} alt={""} />
						</div>
						<div className="w-full ml-3">
							<div className="flex items-center justify-between mb-1">
								<div className="text-black font-bold text-xl m-0">
									<span className="text-secondary">Posté par</span>
									<Link title="Consulter le profil"
										  className="ml-1">
										{offer.user?.username}
									</Link>
								</div>
								<div className="text-black text-sm m-0">
									Le {moment.unix(offer.created_at?._seconds).format('Do MMMM YYYY')}
								</div>
							</div>
							<div className="flex justify-between my-5">
								<div className="w-2/5">
									{ offer.product?.condition &&
									<p>ÉTAT : <span className="roboto-bold">{offer.product.condition}</span></p>
									}
									{ offer.trade?.method &&
									<p>METHODE : <span className="roboto-bold">{offer.trade.method}</span></p>
									}
									{ offer.trade?.estimation &&
									<p>VALEUR : <span className="roboto-bold">{offer.trade.estimation}</span>€</p>
									}
									{ offer.trade?.target &&
									<p>CONTRE : <span className="roboto-bold">{offer.trade.target}</span></p>
									}
								</div>
								<div className="offerDescription w-3/5 ml-5 px-2">
									<p>{offer.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="tradeInfo" className="bg-white rounded mb-5">
					<h1 id="tradeTitle" className="text-3xl tracking-tight roboto-bold text-gray-900 ml-3">
						<span className="block xl:inline">
							Nouvelle proposition
						</span>
					</h1>
					<form className="p-6" onSubmit={(e) => addTrade(e)}>
						<div className="mt-4">
							<div className="w-full">
								<Listbox
									as="div"
									className="space-y-1"
									value={selectedType}
									onChange={setSelectedType}
								>
									{(type) => (
										<>
											<Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
												Type
											</Listbox.Label>
											<div className="relative">
                								<span className="inline-block w-full rounded-md shadow-sm">
                  									<Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-light bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
														<span className="block truncate">{selectedType.text || 'Catégorie'}</span>
														<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
															<svg className="h-5 w-5 text-gray-400"
																 viewBox="0 0 20 20"
																 fill="none"
																 stroke="currentColor"
															>
																<path d="M7 7l3-3 3 3m0 6l-3 3-3-3"
																	  strokeWidth="1.5"
																	  strokeLinecap="round"
																	  strokeLinejoin="round"
																/>
															</svg>
														</span>
                  									</Listbox.Button>
                								</span>

												<Transition
													show={type.open}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
													style={{ zIndex: '100000' }}
												>
													<Listbox.Options
														static
														className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
													>
														{types.map((type) => (
															<Listbox.Option key={type.value} value={type}>
																{({ selected, active }) => (
																	<div
																		className={`${
																			active
																				? "text-white bg-primary"
																				: "text-gray-900"
																		} cursor-default select-none relative py-2 pl-8 pr-4`}
																	>
																		<span
																			className={`${
																				selected ? "roboto-bold" : "font-normal"
																			} block truncate`}
																		>
																		  {type.text}
																		</span>
																		{selected && (
																			<span
																				className={`${
																					active ? "text-white" : "text-primary"
																				} absolute inset-y-0 left-0 flex items-center pl-1.5`}
																			>
																				<svg className="h-5 w-5"
																					 xmlns="http://www.w3.org/2000/svg"
																					 viewBox="0 0 20 20"
																					 fill="currentColor"
																				>
																				  	<path fillRule="evenodd"
																						  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																						  clipRule="evenodd"
																					/>
																				</svg>
																			</span>
																		)}
																	</div>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="value"
								   className="block text-sm font-medium text-gray-700">Échange</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									 style={{ minWidth: '30px' }}
								>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-gift" />
											</span>
								</div>
								<input type="text" id="value" name="value" required
									   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
									   placeholder="15€ ou Chemise bleu" onChange={(e) => inputChange(e)} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-4 mt-6">
							<Link to="/offers"
								  className="col-start-1 col-end-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red hover:bg-red-dark">
								<div className="flex items-center">
											<span className="mr-2 sm:text-sm">
												<i className="gg-close-o bg-white text-red" />
											</span>
									Annuler
								</div>
							</Link>
							<button className="col-end-7 col-span-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark"
									onClick={addTrade}>
								<div className="flex items-center">
									<span className="mr-2 sm:text-sm">
										<i className="gg-check-o bg-white text-secondary" />
									</span>
									Ajouter la proposition
								</div>
							</button>
						</div>
					</form>
				</div>

			</main>
		</div>
	)

}

function mapStateToProps(state) {
	const { sign } = state
	const { user } = sign
	return {
		user
	};
}

const connectedNewTrade = connect(mapStateToProps)(NewTrade);
export { connectedNewTrade as NewTrade };
