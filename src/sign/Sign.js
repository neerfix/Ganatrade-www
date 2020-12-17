import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './Sign.scss';

import { useHistory } from "react-router-dom";

import { signActions } from "../redux/_actions/sign.actions";

import { firebaseConfig } from '../config/firebase.config'
import firebase from "firebase";

// import bcryptjs from 'bcryptjs'
// const salt = bcryptjs.genSaltSync(10);
// 8 caractères, 1 majuscule, 1 chiffre
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

function Sign(props) {

	let history = useHistory();

	const [fields, setFields] = useState({})
	const [errorMessage, setErrorMessage] = useState({})

	useEffect(() => {
		if(props.sign.error) {
			let error = tradErrors(props.sign.error.message)
			if(props.sign.error.type === 'login') {
				setErrorMessage({
					...errorMessage,
					emailLogin: error
				})
			} else {
				setErrorMessage({
					...errorMessage,
					emailRegister: error
				})
			}
		}
	}, [props.sign.error]);

	useEffect(() => {
		if(props.sign.user) {
			if(props.sign.user.id) {
				console.log(props.sign.user)
				history.push('/profile/' + props.sign.user.id)
			}
		}
	}, [props.sign.user]);

	const inputChange = (e) => {
		const { name, value } = e.target
		setFields({
			...fields,
			[name]: value
		})
	}

	const register = async (e) => {
		e.preventDefault();
		setErrorMessage({})
		const { dispatch } = props
		const age = calculateAge(new Date(fields.birthdate))
		const validate = validator(fields.passwordRegister, fields.passwordConfirm)
		if(validate) {
			if(age >= 18) {
				setErrorMessage({})
				await dispatch(signActions.register(fields))
			} else {
				setErrorMessage({
					...errorMessage,
					birthdate: 'L\' âge minimum requis est de 18 ans'
				})
			}
		}
	}

	const login = async (e) => {
		e.preventDefault();
		setErrorMessage({})
		const { dispatch } = props
		await dispatch(signActions.login(fields.emailLogin, fields.passwordLogin))
	}

	const calculateAge = (birthday) => { // birthday is a date
		let ageDifMs = Date.now() - birthday.getTime();
		let ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	const validator = (password, confirm) => {
		if(password !== confirm) {
			setErrorMessage({
				...errorMessage,
				passwordRegister: 'Les mots de passse de sont pas identiques'
			})
			return false
		} else if(!strongRegex.test(password)) {
			setErrorMessage({
				...errorMessage,
				passwordRegister: 'Le mot de passe doit contenir aux moins 8 caractères, 1 majuscule et 1 chiffre'
			})
			return false
		}
		setErrorMessage({
			...errorMessage,
			passwordRegister: ''
		})
		return true
	}

	const tradErrors = (message) => {
		let traduction = ''
		switch (message) {
			case 'There is no user record corresponding to this identifier. The user may have been deleted.':
				traduction = 'L\' adresse email est invalide'
				break
			case 'The password is invalid or the user does not have a password.':
				traduction = 'Le mot de passe est incorrect'
				break
			case 'Email already exist':
				traduction = 'L\' adresse email est déjà utilisée'
				break
		}
		return traduction
	}

	return(
		<div id="sign">
			<div className="h-screen-remaining py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
				<div id="register" className="flex-1 flex justify-center">
					<div className="max-w-lg w-full space-y-8">
						<div>
							<h2 className="-mb-14 text-center text-5xl font-extrabold text-black">
								Inscription
							</h2>
						</div>
						<form className="space-y-6 bg-white shadow p-4 rounded-md" onSubmit={(e) => register(e)}>
							<input type="hidden" name="remember" value="true" />
							<div className="rounded-md">
								<div className="mb-1">
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
										<input type="text" id="username" name="username" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="Pseudo" onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.username}
									</div>
								</div>
								<div className="mb-1">
									<div className="grid grid-cols-2 gap-4">
										<div>
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
												<input type="text" id="firstname" name="firstname" required
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="Prénom" onChange={(e) => inputChange(e)} />
											</div>
											<div className="validation-message">
												{errorMessage.firstname}
											</div>
										</div>
										<div>
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
												<input type="text" id="lastname" name="lastname" required
													   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
													   placeholder="Nom de famille" onChange={(e) => inputChange(e)} />
											</div>
											<div className="validation-message">
												{errorMessage.lastname}
											</div>
										</div>
									</div>
								</div>
								<div className="mb-1">
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
										<input type="email" id="emailRegister" name="emailRegister" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="adresse@email.com" onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.emailRegister}
									</div>
								</div>
								<div className="mb-1">
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
										<input type="password" id="passwordRegister" name="passwordRegister" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="***********" onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.passwordRegister}
									</div>
								</div>
								<div className="mb-1">
									<label htmlFor="passwordConfirm"
										   className="block text-sm font-medium text-gray-700">Confirmez votre mot de passe</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
											 style={{ minWidth: '30px' }}
										>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-keyhole" />
											</span>
										</div>
										<input type="password" id="passwordConfirm" name="passwordConfirm" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="***********" onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.passwordConfirm}
									</div>
								</div>
								<div className="mb-1">
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
										<input type="date" id="birthdate" name="birthdate" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.birthdate}
									</div>
								</div>
							</div>

							<div className="flex items-center justify-center">
								<div className="text-sm text-center">
									<p className="font-medium">
										En créer votre compte, vous acceptez les Termes de Conditions d'utilisations
										et notre Politique de confidentialité
									</p>
								</div>
							</div>

							<div>
								<button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark">
									Inscription
								</button>
							</div>
						</form>
					</div>
				</div>
				<div id="login" className="flex-1 flex justify-center">
					<div className="max-w-lg w-full space-y-8">
						<div>
							<h2 className="-mb-14 text-center text-5xl font-extrabold text-black">
								Connexion
							</h2>
						</div>
						<form className="space-y-6 bg-white shadow p-4 rounded-md" onSubmit={(e) => login(e)}>
							<input type="hidden" name="remember" value="true" />
							<div className="rounded-md">
								<div className="mb-1">
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
										<input type="email" id="emailLogin" name="emailLogin" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="adresse@email.com" onChange={(e) => inputChange(e)} />
									</div>
									<div className="validation-message">
										{errorMessage.emailLogin}
									</div>
								</div>
								<div className="mb-1">
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
										<input type="password" id="passwordLogin" name="passwordLogin" required
											   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
											   placeholder="***********" onChange={(e) => inputChange(e)} />
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input id="rememberMe" type="checkbox" name="rememberMe"
										   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										   onChange={(e) => inputChange(e)} />
										<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
											Se souvenir de moi
										</label>
								</div>

								<div className="text-sm">
									<a href="/password/forgot" className="font-medium text-secondary hover:text-secondary-dark">
										Mot de passe oublié ?
									</a>
								</div>
							</div>

							<div>
								<button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark">
									Connexion
								</button>
							</div>
						</form>
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

const connectedSignPage = connect(mapStateToProps)(Sign);
export { connectedSignPage as Sign };
