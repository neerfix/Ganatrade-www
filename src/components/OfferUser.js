import React from 'react';
import './OfferUser.scss';

// Moment js
import moment from 'moment';
import 'moment/locale/fr'

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

// Loading
import placeholder from '../assets/img/placeholder.png';

class OfferUser extends React.Component {

	state = {
		loading: true,
        user: {
            rating: 0
        },
        reviews: '',
    }
    
    async componentDidMount() {

		// Récupération des reviews
		const reviews_url = "https://beta.api.ganatrade.xyz/users/" + this.props.user.id + "/reviews";
		async function fetchReviews(){
			const reviews_call = await fetch(reviews_url);
			const reviews = await reviews_call.json();
			return reviews;
		}

        fetchReviews().then( reviews => {
            if(!reviews){
                throw new Error(reviews);
            } else {	
                this.setState({reviews: reviews, loading: false});
                const rowLen = reviews.length;
                reviews.map( (review, i) => {
                    this.setState({user:{rating : this.state.user.rating + review.note}})
                    if (rowLen === i + 1) {
                        this.setState({user:{rating :  this.state.user.rating / rowLen}})
                    }
                    return review;
                });
            }
        }).catch( error => {
            console.log('Erreur dans la récupération des reviews');
            this.setState({error: true, loading: false});
            throw error;
        });

	}

    render(){
        return(
            <div key={this.props.user.id} id="offerUser">
                <a href={"/profile/" + this.props.user.id } className="flex items-center">
                    {/* Avatar */}
                    <div className="userAvatar rounded overflow-hidden mr-3">
                        { this.props.user.avatar ? 
                        (
                                <img src={this.props.user.avatar || placeholder} alt="" /> 
                            ) : (
                                <img src={placeholder} alt="" /> 
                            )
                        }
                    </div>
                
                    <div>
                        {/* Nom de l'utilisateur */}

                        <h2 className="roboto-bold">
                            {this.props.user.username || <Skeleton height={20} /> }
                        </h2>
                        
                        <p className="flex items-center my-1">
                            <i className="gg-pin mr-2"></i>
                            <span>
                                { 
                                    this.props.user.address || this.props.user.city ? (
                                       (  this.props.user.city || this.props.user.address.city )
                                    ) : (
                                        "Quelque part"
                                    )
                                }
                            </span>
                        </p>

                        {this.props.user.created_at &&
                            <p>
                                <span className="mr-1">Membre depuis le</span>
                                <span>{ moment.unix(this.props.user.created_at._seconds).format('L') || "Date inconnue" }</span>
                            </p>
                        }

                        {this.props.user.last_seen &&
                            <p>
                                <span className="mr-1">Vu</span>
                                <span>{ moment.unix(this.props.user.last_seen._seconds).fromNow() }</span>
                            </p>
                        }

                        { (this.state.reviews && this.state.user.rating) ? (
                            <div className="flex items-center">
                                <div className="flex items-center mt-2 mb-2 mr-3">
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
                                        <rect width={ this.state.user.rating * 20 + "%"} className='rating__value' clipPath="url(#stars)"></rect>
                                    </svg>
                                </div>
                                <p>
                                    {this.state.reviews.length} avis
                                </p>
                            </div>
                            ) : (
                                <p>
                                    Aucun avis
                                </p>
                            )
                        }
                    </div>
                </a>
            </div>
        )
    }

}

export { OfferUser }
