import React from 'react';
import './Sign.scss';

function Sign() {

	return(
		<div id="sigh">
			<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
				<div className="w-1/2">
					<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">Connexion</span>
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit
							sunt amet fugiat veniam occaecat fugiat aliqua.
						</p>
						<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						</div>
					</div>
				</div>
				<div className="w-1/2">
					<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">Inscription</span>
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit
							sunt amet fugiat veniam occaecat fugiat aliqua.
						</p>
						<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export { Sign }
