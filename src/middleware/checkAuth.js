import SIGN from "../redux/_constants/sign.constants";

const checkAuth = (history) => store => next => action => {
	const result = next(action);
	let state = store.getState();
	if(history.location.pathname !== "/sign"){
		if(state.StatusLogin === SIGN.LOGOUT){
			history.push('/login')
		}
	}
	return result;
};

export default checkAuth;
