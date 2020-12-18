import apiConfig from "../config/api.config"

export function updateUser(id, username, avatar, firstname, lastname, email, password, birthdate, phone, address) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, avatar, firstname, lastname, email, password, birthdate, phone, address })
	}

	return fetch(`${apiConfig}users/${id}`, requestOptions)
		.then((response) => {
			return response;
		})
		.catch((e) => {
			console.log(e)
		})
}
