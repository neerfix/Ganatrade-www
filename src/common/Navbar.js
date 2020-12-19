import React from 'react'
import { connect } from 'react-redux'
import './Navbar.scss';

import { Link } from 'react-router-dom'

import { signActions } from "../redux/_actions/sign.actions";

import { useHistory } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";

import Logo from '../assets/img/logo.png'
import Search from './Search'

function Navbar(props) {

	let history = useHistory();

	const logout = async () => {
		const { dispatch } = props
		await dispatch(signActions.logout())
		history.push('/')
	}

	return(
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<Link to="/">
								<img className="h-8" src={Logo}
									 alt="Workflow" />
							</Link>
						</div>
						<div className="ml-5">
							<Link to="/offers" className="mr-3 px-3 text-sm roboto-bold text-black hover:text-primary">
								OFFRES
							</Link>
						</div>
					</div>
					<Search history={history}/>
					<div className="hidden md:block">
						<div className="flex items-center">
							{/*<div className="ml-3 relative">
								<div>
									<button
										className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										id="user-menu" aria-haspopup="true">
										<span className="sr-only">Open user menu</span>
										<img className="h-8 w-8 rounded-full"
											 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											 alt="" />
									</button>
								</div>
								<div
									className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
									role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Your Profile</a>

									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Settings</a>

									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Sign out</a>
								</div>
							</div>*/}
							<div className="relative flex items-center">
								{props.sign.user ?
									<div className="relative flex items-center">
										<div className="relative inline-block text-left">
											<Menu>
												{({ open }) => (
													<>
														<span className="rounded-md shadow-sm">
															<Menu.Button className="inline-flex justify-center w-48 px-6 py-2 text-base roboto-bold text-white transition duration-150 ease-in-out bg-black border border-transparent rounded-md">
																<span>{props.sign.user.username}</span>
																<i className="gg-chevron-down ml-2"></i>
															</Menu.Button>
														</span>

														<Transition
															show={open}
															enter="transition ease-out duration-100"
															enterFrom="transform opacity-0 scale-95"
															enterTo="transform opacity-100 scale-100"
															leave="transition ease-in duration-75"
															leaveFrom="transform opacity-100 scale-100"
															leaveTo="transform opacity-0 scale-95"
														>
															<Menu.Items
																static
																className="absolute right-0 w-48 origin-top-right bg-white rounded-md mt-1 shadow-2xl ring-1 ring-primary ring-opacity-5 outline-none"
																style={{ zIndex: '10000' }}
															>
																<div className="py-1">
																	<Menu.Item>
																		{({ active }) => (
																			<Link to={"/profile/" + props.sign.user.id}
																				  className={`${
																					  active
																						  ? "bg-gray-100 text-gray-900"
																						  : "text-gray-700"
																				  } flex items-center w-full px-7 py-2 text-base roboto-bold leading-5 text-left uppercase hover:text-primary`}
																			>
																				<div className="w-4 mr-3">
																					<i className="gg-user"></i>
																				</div>
																				Profil
																			</Link>
																		)}
																	</Menu.Item>
																</div>
																<div className="border-t border-primary mx-6"></div>
																<div className="py-1">
																	<Menu.Item>
																		{({ active }) => (
																			<a onClick={logout}
																			   className={`${
																				   active
																					   ? "bg-gray-100 text-gray-900"
																					   : "text-gray-700"
																			   } flex items-center w-full px-7 py-2 text-base leading-5 text-left uppercase roboto-bold hover:text-primary cursor-pointer`}
																			>
																				<div className="w-4 ml-2 mr-5 flex justify-center">
																					<i className="gg-log-out"></i>
																				</div>
																				Déconnexion
																			</a>
																		)}
																	</Menu.Item>
																</div>
															</Menu.Items>
														</Transition>
													</>
												)}
											</Menu>
										</div>
										<Link to="/newoffer" className="w-48 flex items-center justify-center ml-5 px-6 py-2 border border-transparent text-base roboto-bold rounded-md text-white bg-secondary hover:text-white hover:bg-secondary-dark">
											<span>Ajouter une offre</span>
										</Link>
									</div>
									:
									<Link to="/sign" className="px-3 py-2 text-sm roboto-bold text-black flex items-center hover:text-primary">
										<i className="gg-log-in"></i>
										<span className="ml-4">CONNEXION / INSCRIPTION</span>
									</Link>
								}
								<Link to="/guide" className="ml-3 px-3 py-2 text-sm roboto-bold text-black flex items-center hover:text-primary">
									<i className="gg-info"></i>
									<span className="ml-2">GUIDE</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<span className="sr-only">Open main menu</span>
							<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									  d="M4 6h16M4 12h16M4 18h16"/>
							</svg>
							<svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									  d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)

}

function mapStateToProps(state) {
	const { sign } = state
	return {
		sign
	};
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };
