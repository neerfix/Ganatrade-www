import React from 'react';
import './Offers.scss';

import filterListStatic from '../assets/icons/filterList.png';
import filterBikeStatic from '../assets/icons/filterBike.png';
import filterElectronicStatic from '../assets/icons/filterElectronic.png';
import filterToolsStatic from '../assets/icons/filterTools.png';
import filterHomeStatic from '../assets/icons/filterHome.png';
import filterPuzzleStatic from '../assets/icons/filterPuzzle.png';
import filterArtStatic from '../assets/icons/filterArt.png';
import filterBooksStatic from '../assets/icons/filterBooks.png';
import filterPetsStatic from '../assets/icons/filterPets.png';

// import filterAll from '../assets/icons/filterAll.gif';
import filterList from '../assets/icons/filterList.gif';
import filterBike from '../assets/icons/filterBike.gif';
import filterElectronic from '../assets/icons/filterElectronic.gif';
import filterTools from '../assets/icons/filterTools.gif';
import filterHome from '../assets/icons/filterHome.gif';
import filterPuzzle from '../assets/icons/filterPuzzle.gif';
import filterArt from '../assets/icons/filterArt.gif';
import filterBooks from '../assets/icons/filterBooks.gif';
import filterPets from '../assets/icons/filterPets.gif';

import {OfferCard} from '../components/OfferCard';

function Offers() {

	function changeBackground(e) {
		let buttonImg;
		let button = e.target;
		if( e.target.tagName === 'IMG' ){
			buttonImg = button;
		} else {
			buttonImg = button.getElementsByTagName("img")[0];
		}
		if( buttonImg ) {
			console.log(buttonImg);
			let staticImg = buttonImg.src;
			let hoverimg = buttonImg.dataset.hoverimg;
			buttonImg.src = hoverimg;
			buttonImg.hoverimg = staticImg;
		}
	}

	return(
		<div id="offers" className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">
			<div className="w-4/5 mx-auto mb-5">
				<div className="sm:text-center lg:text-left">
					<h1 className="text-3xl tracking-tight roboto-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl ml-5 mb-5">
						<span className="block xl:inline">De quoi avez-vous besoin ?</span>
					</h1>
					<div className="flex justify-center items-center my-5">
						<button className="rounded-full p-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 focus:outline-none mr-3">
							<i className="gg-arrow-left"></i>
						</button>
						<div className="flex flex-nowrap justify-center my-3 w-auto">
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white mx-2 w-1/6 p-3">
								<img className="m-auto" src={filterListStatic} data-hoverimg={filterList} alt="" />
								<span>Tous les produits</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterBikeStatic} data-hoverimg={filterBike} alt="" />
								<span>Vélos et accessoires</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterElectronicStatic} data-hoverimg={filterElectronic} alt="" />
								<span>Électronique et composants</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterToolsStatic} data-hoverimg={filterTools} alt="" />
								<span>Bricolage et outils</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterBooksStatic} data-hoverimg={filterBooks} alt="" />
								<span>Livres et matériel scolaire</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterHomeStatic} data-hoverimg={filterHome} alt="" />
								<span>Meubles et ustensiles</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterArtStatic} data-hoverimg={filterArt} alt="" />
								<span>Art et décoration</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterPuzzleStatic} data-hoverimg={filterPuzzle}  alt=""/>
								<span>Jouets et jeux de société</span>
							</button>
							<button onMouseOver={changeBackground} onMouseOut={changeBackground} className="bg-white">
								<img className="m-auto" src={filterPetsStatic} data-hoverimg={filterPets} alt="" />
								<span>Accessoires pour animaux</span>
							</button>
						</div>
						<button class="rounded-full p-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 focus:outline-none mr-3">
							<i class="gg-arrow-right"></i>
						</button>
					</div>
				</div>
			</div>
			<main className="flex flex-wrap">
				<OfferCard />
				<OfferCard />
				<OfferCard />
				<OfferCard />
				<OfferCard />
				<OfferCard />
				<OfferCard />
				<OfferCard />
			</main>
		</div>
	)

}

export { Offers }
