import apiConfig from "../config/api.config"

export function signUp(username, firstname, lastname, email, password, dateOfBirth) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, firstname, lastname, email, password, dateOfBirth })
	}

	return fetch(`${apiConfig}users`, requestOptions)
		.then(user => {
			return user;
		})
}
