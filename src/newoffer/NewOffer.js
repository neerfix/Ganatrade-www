import React from 'react';
import './NewOffer.scss';

function NewOffer() {

	return(
		<div id="new-offer">
			<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
				<div className="w-full">
					<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">Nouvelle Offre</span>
						</h1>
					</div>
				</div>
			</main>
		</div>
	)

}

export { NewOffer }
