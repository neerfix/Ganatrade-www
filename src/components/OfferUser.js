import React from 'react';
import './OfferUser.scss';

import dateFormat from 'dateformat';

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

// Loading
import placeholder from '../assets/img/placeholder.png';

class OfferUser extends React.Component {

	state = {
		loading: true,
		user: '',
	}

    render(){
        return(
            <div key={this.props.user.id} id="offerUser" className="flex">

                {/* Avatar */}
                <div className="userAvatar rounded overflow-hidden mr-3">
                    <img src={this.props.user.avatar || placeholder} alt="" /> 
                </div>
            
                <div>
                    {/* Nom de l'utilisateur */}
                    
                    <h2 className="text-1xl">{this.props.user.username}</h2>
                    
                    <p className="flex items-center">
                        <i className="gg-pin mr-2"></i>
                        <span>{this.props.user.address || "Localisation inconnue" }</span>
                    </p>

                    <p>
                        <span className="mr-1">Membre depuis le</span>
                        <span>{ dateFormat(this.props.user.last_seen._seconds, 'fullDate') || "Date inconnue" }</span>
                    </p>
                    
                </div>
            </div>
        )
    }

}

export { OfferUser }
