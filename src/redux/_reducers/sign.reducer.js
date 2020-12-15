import SIGN from '../_constants/sign.constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { loggedIn: true, error: false, user, token } : {};

console.log(user, token)

export const sign = (state = initialState, action) => {
	switch (action.type){
		case SIGN.LOGIN_PENDING:
		case SIGN.REGISTER_PENDING:
			return {
				loggingIn: true,
				user: action
			};
		case SIGN.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
			};
		case SIGN.LOGIN_ERROR:
			return {
				loggedIn: false,
				error: action.error
			};
		case SIGN.LOGOUT:
			return {};
		default:
			return state
	}
};
