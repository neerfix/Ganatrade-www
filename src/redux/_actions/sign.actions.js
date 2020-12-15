import firebase from "firebase";
import apiConfig from "../../config/api.config";
import signConstants from "../_constants/sign.constants"
import { signUp } from "../../api/register"

const login = (email, password) => async dispatch => {

	dispatch(request({ email }));

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(r => {
			console.log(r)
			const refreshToken = r.user.refreshToken
			fetch(apiConfig + "users/" + r.user.uid, {
				// headers: {'Authorization': token},
			}).then(response => response.json()).then(user => {
				if(user) {
					localStorage.setItem('user', JSON.stringify(user));
					localStorage.setItem('token', JSON.stringify(refreshToken));
					if(user.rank) {
						if(user.rank === "admin" || user.rank === "super_admin") {
							dispatch(success({ ...user, refreshToken }))
						}
					} else {
						dispatch(failure("Tu n'as pas accès à l'administration"))
					}
				}
			}).catch(e => {
				dispatch(failure(e.message))
			})
		}).catch(e => {
			dispatch(failure(e.message))
		})

	function request(user) { return { type: signConstants.LOGIN_PENDING, user }}
	function success(user) { return { type: signConstants.LOGIN_SUCCESS, user }}
	function failure(error) { return { type: signConstants.LOGIN_ERROR, error }}
}

const register = ({ username, firstname, lastname, emailRegister, passwordRegister, dateOfBirth }) => async dispatch => {

	dispatch(request({ username }));

	await signUp(username, firstname, lastname, emailRegister, passwordRegister, dateOfBirth)
		.then(
			user => {
				dispatch(success(user))
			},
			error => {
				dispatch(failure(error))
			}
		)

	function request(user) { return { type: signConstants.REGISTER_PENDING, user }}
	function success(user) { return { type: signConstants.REGISTER_SUCCESS, user }}
	function failure(error) { return { type: signConstants.REGISTER_ERROR, error }}
}

export const signActions = {
	login,
	register
}
