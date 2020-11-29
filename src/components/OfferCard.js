import React from 'react';
import './OfferCard.scss';
import placeholder from '../assets/img/placeholder.png';

function OfferCard() {

	return(
        <div class="max-w-sm rounded-sm overflow-hidden shadow-md mx-2 my-8">
            {/* eslint-disable-next-line */}
            <img class="w-full" src={placeholder} alt="Aucune photo n'est fournie pour cette offre" />
            <div class="px-6 py-4">
                <div class="roboto-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-600 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-6 py-4 rounded">
                <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm roboto-medium text-gray-600 mr-2">#photography</span>
                <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm roboto-medium text-gray-600 mr-2">#travel</span>
                <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm roboto-medium text-gray-600">#winter</span>
            </div>
        </div>
	)

}

export { OfferCard }
