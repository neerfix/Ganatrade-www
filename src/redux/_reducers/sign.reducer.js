import SIGN from '../_constants/sign.constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { loggingIn: false, loggedIn: true, error: false, user, token } : {};

export const sign = (state = initialState, action) => {
	switch (action.type){
		case SIGN.LOGIN_PENDING:
		case SIGN.REGISTER_PENDING:
			return {
				...state,
				loggingIn: true,
				user: action.user,
				error: false
			};
		case SIGN.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				user: action.user,
				error: false
			};
		case SIGN.LOGIN_ERROR:
		case SIGN.REGISTER_ERROR:
			return {
				...state,
				loggedIn: false,
				error: action.error
			};
		case SIGN.LOGOUT:
			return {};
		default:
			return state
	}
};
