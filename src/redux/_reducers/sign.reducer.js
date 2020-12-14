import SIGN from '../_constants/sign.constants';

const initialState = { login: false, register: false, error: false };

export const SignReducer = (sign = initialState, action = {}) =>{
	switch (action.type){
		case SIGN.LOGIN_PENDING :
		case SIGN.REGISTER_PENDING :
		case SIGN.LOGOUT :
			return initialState
		case SIGN.LOGIN_SUCCESS :
			return {
				...sign,
				login: true,
				error: false,
			};
		case SIGN.LOGIN_ERROR :
			return {
				...sign,
				login: false,
				error: true,
			};
		case SIGN.REGISTER_SUCCESS :
			return {
				...sign,
				register: true,
				error: false,
			};
		case SIGN.REGISTER_ERROR :
			return {
				...sign,
				register: false,
				error: true,
			};
		default:
			return initialState
	}
};
