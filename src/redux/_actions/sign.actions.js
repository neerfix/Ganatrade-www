import firebase from "firebase";
import apiConfig from "../../config/api.config";
import signConstants from "../_constants/sign.constants"
import { signUp } from "../../api/register"

const login = (email, password) => async dispatch => {

	dispatch(request({ email }));

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(r => {
			const refreshToken = r.user.refreshToken
			fetch(apiConfig + "users/" + r.user.uid, {
				// headers: {'Authorization': token},
			}).then(response => response.json()).then(user => {
				if(user) {
					localStorage.setItem('user', JSON.stringify(user));
					localStorage.setItem('token', JSON.stringify(refreshToken));
					dispatch(success({ ...user, refreshToken }));
				}
			}).catch(e => {
				dispatch(failure('login', e.message))
			})
		}).catch(e => {
			dispatch(failure('login', e.message))
		})

	function request(user) { return { type: signConstants.LOGIN_PENDING, user }}
	function success(user) { return { type: signConstants.LOGIN_SUCCESS, user }}
	function failure(type, message) { return { type: signConstants.LOGIN_ERROR, error: { type: type, message: message } }}
}

const register = ({ username, firstname, lastname, emailRegister, passwordRegister, birthdate }) => async dispatch => {

	dispatch(request({ username }));

	await signUp(username, firstname, lastname, emailRegister, passwordRegister, birthdate)
		.then((response) => {
			if(response.code) {
				dispatch(failure('register', response.message))
			} else {
				dispatch(success(response))
			}
		})

	function request(user) { return { type: signConstants.REGISTER_PENDING, user }}
	function success(user) { return { type: signConstants.REGISTER_SUCCESS, user }}
	function failure(type, message) { return { type: signConstants.REGISTER_ERROR, error: { type: type, message: message } }}
}

export const signActions = {
	login,
	register
}
