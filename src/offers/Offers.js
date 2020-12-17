import React from 'react';
import './Offers.scss';

// Skeleton de chargement
import Skeleton from 'react-loading-skeleton';

// Filtre premier
import filterListStatic from '../assets/icons/filterList.png';
import filterList from '../assets/icons/filterList.gif';

// Loading
import loading from '../assets/img/loading.gif';

// Loading
import errorImg from '../assets/img/error.png';

import {OfferCard} from '../components/OfferCard';

class Offers extends React.Component {

	state = {
		loading: true,
		error: false,
		offers: null,
		categories: null,
		filters: ['test'],
	}

	async componentDidMount() {

		// Récupération des offres
		async function fetchOffers(){
			const offers_url = "https://beta.api.ganatrade.xyz/offers";
			const offers_call = await fetch(offers_url);
			const offers = await offers_call.json();
			return offers;
		}

		fetchOffers().then( offers => {
			if(!offers){
				throw new Error(offers);
			} else {	
				this.setState({offers: offers, loading: false});
			}
		}).catch( error => {
			console.log('Erreur dans la récupération des offres');
			this.setState({error: true, loading: false});
			throw error;
		});

		// Récupération des categories
		const categories_url = "https://beta.api.ganatrade.xyz/categories";
		const categories_call = await fetch(categories_url);

		try {
			const categories = await categories_call.json();
			this.setState({categories: categories, loading: false});
		} catch ( e ) {
			this.setState({error: true, loading: false});
			console.log(categories_call);
			console.log(e);
		}

	}

	changeBackground(e) {
		let buttonImg;
		let button = e.target;
		if( e.target.tagName === 'IMG' ){
			buttonImg = button;
		} else {
			buttonImg = button.getElementsByTagName("img")[0];
		}
		if( buttonImg ) {
			let staticImg;
			let hoverimg;
			
			if( e.type === "mouseenter" ){
				staticImg = buttonImg.src;
				hoverimg = buttonImg.dataset.hoverimg;
			
				buttonImg.src = hoverimg;
				buttonImg.dataset.hoverimg = staticImg;
			} else if ( e.type === "mouseleave" ) {
				staticImg = buttonImg.dataset.hoverimg;
				hoverimg = buttonImg.src;
			
				buttonImg.src = staticImg;
				buttonImg.dataset.hoverimg = hoverimg;
			}
		}
	}

	slideFilters(e){
		let button = e.target;
		let direction = button.dataset.direction;
		let listFilters = document.getElementById('listFilters');

		if (!direction) return false;
		if ( direction === "left" ) {
			listFilters.classList.remove('justify-end');
			listFilters.classList.add('justify-start');
		} else if ( direction === "right" ) {
			listFilters.classList.remove('justify-start');
			listFilters.classList.add('justify-end');
		}
	}

	toggleFilter(e){
		console.log("click");
	}

	retryFetch = () => {
		this.setState({error: false, loading: true});
		this.componentDidMount();
	}

	render(){
		return(
			<div id="offers" className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">
				<div className="w-4/5 mx-auto mb-5">
					<div className="sm:text-center lg:text-left">
						<h1 className="text-3xl tracking-tight roboto-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl ml-5 mb-5">
							<span className="block xl:inline">De quoi avez-vous besoin ?</span>
						</h1>
						<div className="flex justify-center items-center my-5">
							{/* Liste liste gauche */}
							<button onClick={this.slideFilters} data-direction="left" className="slideFilter rounded-full p-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 focus:outline-none mr-3">
								<i className="gg-arrow-left"></i>
							</button>
							{/* Liste des filtres */}
							<div id="listFilters" className="filter-buttons flex flex-nowrap justify-start py-2 my-3 mr-2 w-auto overflow-hidden">
								<button onMouseEnter={this.changeBackground} onMouseLeave={this.changeBackground} 
										onClick={this.toggleFilter} className="shadow rounded-lg bg-white mx-2 w-1/4 px-3 py-5">
											<img className="m-auto" src={filterListStatic} data-hoverimg={filterList} alt="" />
											<span>Tous les produits</span>
								</button>

								{this.state.categories ? ( 
										this.state.categories.map((filter, f) => {
											return (
												<button key={f} filter={filter.img} onMouseEnter={this.changeBackground} onMouseLeave={this.changeBackground} onClick={this.toggleFilter} className="shadow rounded-lg bg-white mx-2 w-1/4 px-3 py-5">
													<img className="m-auto" src={'/assets/icons/' + filter.img + '.png'} data-hoverimg={'/assets/icons/' + filter.img + '.gif'} alt="" />
													<span>{filter.title}</span>
												</button>
											)
										})
									) : ( 
										<Skeleton width="150" height="150" />
									)
								}
							</div>
							{/* Slide liste droite */}
							<button onClick={this.slideFilters} data-direction="right" className="slideFilter rounded-full p-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 focus:outline-none mr-3">
								<i className="gg-arrow-right"></i>
							</button>
						</div>
					</div>
				</div>

				{/* Filtres appliqués */}
				{this.state.filters.length > 0 &&
					<div id="selectedFilters" className="flex items-center">
						<p>Filtres appliqués: </p>
						{this.state.filters.map((filter, j) => {
							return ( 
								<div key={j} className="filterItem flex m-1 ml-4 uppercase border-2 border-green-500 px-2 py-1 bg-green-200 uppercase text-green-700 rounded-full">
									<span class="mr-2">{filter}</span>
									<button onClick={this.toggleFilter} filter="">
										<i className="gg-close"></i>
									</button>
								</div> 
							)
						})}
					</div>
				}

				<div>
					{ (this.state.loading && !this.state.error) ? (
						<img className="m-auto" src={loading} alt="Chargement des offres en cours"/>
					) : ( 
						(this.state.offers) ? (
							<main className="flex flex-wrap">
								{this.state.offers.map((offer, i) => {
									if(offer.is_active) {
										return (<OfferCard key={offer.id} offer={offer} />) 
									}
									return false;
								})}
							</main>
						) : (
							<div>

							</div>
						)
					)}
					{!this.state.loading && this.state.error &&
						<div className="w-1/2 m-auto flex-column items-center justify-center">
							<img src={errorImg} className="m-auto" alt="Une erreur est survenue !" />
							<button className="flex items-center w-1/2 flex items-center justify-center px-5 py-3 border border-transparent cursor-pointer font-medium rounded-md text-black bg-white hover:text-primary m-auto" onClick={() => this.retryFetch()}>
								<i class="gg-redo mr-5"></i>
								<span>Réessayer</span>
							</button>
						</div>
					}
				</div>
			</div>
		)
	}

}

export { Offers }
