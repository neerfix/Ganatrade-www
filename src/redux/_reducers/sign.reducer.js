import SIGN from '../_constants/sign.constants';
import USER from '../_constants/user.constants'

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { pending: false, loggedIn: false, registered: false, error: false, user, token } : {};

export const sign = (state = initialState, action) => {
	switch (action.type){
		case SIGN.LOGIN_PENDING:
		case SIGN.REGISTER_PENDING:
		case USER.USER_UPDATE_PENDING:
			return {
				...state,
				pending: true,
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
		case SIGN.REGISTER_SUCCESS:
			return {
				...state,
				registered: true,
				user: action.user,
				error: false
			};
		case USER.USER_UPDATE_SUCCESS:
			return {
				...state,
				pending: false,
				user: action.user,
				error: false
			};
		case SIGN.LOGIN_ERROR:
		case SIGN.REGISTER_ERROR:
			return {
				...state,
				pending: false,
				registered: false,
				loggedIn: false,
				error: action.error
			};
		case SIGN.LOGOUT:
			return {};
		default:
			return state
	}
};
