import React from "react";
import './CardOffer.scss';

import moment from "moment";
import 'moment/locale/fr'

class CardOffer extends React.Component {

	offer = this.props.offer;
	
	state = {
		user: {},
	}

	async componentDidMount(){
		// Récupération des infos user
		const user_url = "https://beta.api.ganatrade.xyz/users/" + this.offer.author_id;
		async function fetchUser(){
			const user_call = await fetch(user_url);
			const user = await user_call.json();
			return user;
		}
		
		fetchUser(user_url).then( user => {
			if(!user){
				throw new Error(user);
			} else {
				this.setState({user: user, loading: false});
				console.log(user);
			}
		}).catch( error => {
			console.log('Erreur dans la récupération de l\'utilisateur');
			this.setState({error: true, loading: false});
			throw error;
		});
	}

	render(){
		return(
			<div className="bg-white shadow overflow-hidden rounded-lg m-1 mr-4">
				<div className="px-2 py-2">
					<div className="w-full lg:flex items-center">
						<div className="h-16 w-16 sm:rounded-lg flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
							style={{ backgroundImage: "url('" + this.state.user.avatar +"')" }}>
						</div>
						<div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 leading-normal">
							<div className="w-full flex items-center justify-between">
								<div className="text-black font-bold text-xl m-0">{this.state.user?.username}</div>
								<div className="text-black text-sm m-0">Le {moment.unix(this.offer.created_at?._seconds).format('Do MMMM YYYY')}</div>
							</div>
							<div className="flex items-center offerRate">
                                <div className="flex items-center">
                                    <svg viewBox="0 0 1000 200" className='rating'>
                                        <defs>
                                            <polygon id="star" points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>
                                            <clipPath id="stars">
                                                <use href="#star"/>
                                                <use href="#star" x="20%"/>
                                                <use href="#star" x="40%"/>
                                                <use href="#star" x="60%"/>
                                                <use href="#star" x="80%"/>
                                            </clipPath>
                                        </defs>
                                        <rect className='rating__background' clipPath="url(#stars)"></rect>
                                        <rect width={ this.offer.note * 20 + "%"} className='rating__value' clipPath="url(#stars)"></rect>
                                    </svg>
                                </div>
                            </div>
							<p className="text-grey-darker text-sm mb-0">{this.offer.content}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export { CardOffer }
