import apiConfig from "../config/api.config"

export function updateUser(username, firstname, lastname, email, password, birthdate, phone, address) {
	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, firstname, lastname, email, password, birthdate, phone, address })
	}

	return fetch(`${apiConfig}users`, requestOptions)
		.then(user => {
			return user;
		})
}
