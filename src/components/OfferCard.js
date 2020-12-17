import React from 'react';
import './OfferCard.scss';

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

import placeholder from '../assets/img/placeholder.png';


class OfferCard extends React.Component {

	state = {
		loading: true,
		user: '',
	}

    async componentDidMount() {

		// Récupération du profil utilisateur
		const user_url = "https://beta.api.ganatrade.xyz/users/" + this.props.offer.user_id;
		const user_call = await fetch(user_url);

		try {
			const user = await user_call.json();
			this.setState({user: user, loading: false});
		} catch ( e ) {
			this.setState({user: false, loading: false});
			console.log(user_call);
			console.log(e);
		}
        
	}

    render(){
        return(
            <div key={this.props.offer.id} className="offerCard max-w-sm rounded-sm overflow-hidden shadow-md mx-2 my-8 flex-column bg-white">

                {/* Photo de l'offre */}
                <div className="offerImg"> 
                    {this.props.offer.pictures ? (
                        <a title="Consulter l'offre" href={"/offers/" + this.props.offer.id}>
                            <img className="w-full" src={ ( Array.isArray(this.props.offer.pictures) ? this.props.offer.pictures[0] : this.props.offer.pictures) || placeholder} alt="" />
                        </a>
                        ) : (
                            <Skeleton height={200} />
                    )}
                </div>
                
                {/* Contenu de l'offre */}
                <div className="offerContent px-6 py-2 flex-column flex-1">
                    {/* Titre et description */}
                    <a className="offerBasics flex-column flex-1" title="Consulter l'offre" href={"/offers/" + this.props.offer.id}>
                        <h2 className="offerTitle roboto-bold text-xl mb-2 mt-3 text-primary">
                            {this.props.offer.title || <Skeleton height={20}/>}
                        </h2>
                        <p className="offerDesc text-gray-600 text-base flex-1">
                            {this.props.offer.description || <Skeleton count={2} />}
                        </p>
                    </a>

                    <hr className="mx-2 my-3"></hr>

                    <div className="offerInfo">
                        {/* Target (en échange de) */}
                            <div className="offerTarget py-2">
                                <small className="offerTarget flex text-base roboto-bold">
                                    <i className="gg-arrows-exchange mr-5"></i>
                                    Échange contre : { ( this.props.offer.trade && this.props.offer.trade.target ) ? this.props.offer.trade.target : "peu importe"}
                                </small>
                            </div>

                        {/* Tags */}
                        <div className="offerTags rounded flex flex-wrap align-items-center py-2">
                            <i className="gg-tag mr-3 p-1"></i>
                            {this.props.offer.tags && this.props.offer.tags.map((tag, i) => {
                                return (
                                    <button
                                        key={i} 
                                        onClick={this.toggleFilter}
                                        className="tag flex align-items-center bg-gray-100 rounded-full text-sm roboto-medium text-green-600 pr-1 mr-1">
                                        {tag}
                                    </button>
                                )
                            })}
                            {!this.props.offer.tags &&
                                <span className="tag flex align-items-center bg-gray-100 rounded-full text-sm roboto-medium text-green-600 pr-1 mr-1">
                                    Aucun tag
                                </span>
                            }
                        </div>
                        
                        {/* Utilisateur */}
                        <div className="my-3">
                            <a className="offerUser flex flex-wrap flex-end align-items-center text-primary" 
                                href={'/profile/'+this.props.offer.user_id}
                                title="Accéder au profil de l'annonceur">
                                <span className="flex">Posté par <b className="ml-1"> {this.state.user.username || <Skeleton height={15}/> }</b></span>
                                <div className="offerUserPicture rounded overflow-hidden flex align-items-center">
                                    <img src={this.state.user.avatar || placeholder} alt="" />
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}

export { OfferCard }
