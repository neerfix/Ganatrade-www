import apiConfig from "../config/api.config"

export function updateUser(id, username, avatar, firstname, lastname, email, phone, address) {

	if(!address){
		address = {
			city: '',
			zipcode: '',
			street: ''
		}
	}

	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({id, username, avatar, firstname, lastname, email, phone, address})
	}

	return fetch(`${apiConfig}users/${id}`, requestOptions)
		.then((response) => {
			return response;
		})
		.catch((e) => {
			console.log(e)
		})
}
