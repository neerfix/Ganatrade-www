import apiConfig from "../config/api.config"

export function signUp(username, firstname, lastname, email, password, birthdate) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, firstname, lastname, email, password, birthdate })
	}

	return fetch(`${apiConfig}users`, requestOptions)
		.then(user => {
			return user;
		})
}
