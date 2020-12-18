import userConstants from "../_constants/user.constants";
import { updateUser } from "../../api/user";

const update = ({ id, username, firstname, lastname, email, password, birthdate, phone, address }) => async dispatch => {

	dispatch(request({ username }));

	await updateUser(id, username, firstname, lastname, email, password, birthdate, phone, address)
		.then(response => response.json()).then(user => {
			if(user) {
				dispatch(success(user))
			}
		})
		.catch(e => {
			dispatch(failure(e.message))
		})

	function request(user) { return { type: userConstants.USER_UPDATE_PENDING, user }}
	function success(user) { return { type: userConstants.USER_UPDATE_SUCCESS, user }}
	function failure(error) { return { type: userConstants.USER_UPDATE_ERROR, error }}
}

export const userActions = {
	update
}
