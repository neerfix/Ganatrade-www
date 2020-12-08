import React from 'react';
import './Landing.scss';

function Landing(props) {

	function goToRoute(route) {
		console.log(props.history.push(route))
	}

	return(
		<div id="landing">
			<main className="mt-32 mb-24 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-16 lg:px-8 xl:mt-36">
				<div className="sm:text-center lg:text-left">
					<h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-5xl lg:text-7xl max-w-6xl">
						<span className="block xl:inline">Échanger ses objets c'est</span>
						<span className="block text-primary xl:inline"> économique et écologique</span>
					</h1>
					<p className="mt-5 lg:max-w-5xl font-medium text-base text-gray sm:mt-5 sm:text-2xl sm:max-w-3xl sm:mx-auto md:mt-10 md:text-xl lg:text-2xl lg:mx-0">
						<span className="text-black">GanaTrade</span> est une plateforme d'échange de biens entre particuliers.
						Ici, vous pourrez mettre en avant les objets qui ne vous servent plus via
						des <span className="text-black">annonces publiques</span>.
					</p>
				</div>
			</main>
			<div className="py-12 mb-24 bg-grey-500">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-base text-primary font-semibold tracking-wide uppercase">Transactions</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							L'échange nouvelle génération
						</p>
						<p className="mt-4 max-w-2xl text-xl font-medium text-gray lg:mx-auto">
							GanaTrade vous propose un large catalogue d'annonces et la possibilité
							d'y proposer les votre gratuitement.
						</p>
					</div>

					<div className="mt-10">
						<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
							<div className="flex">
								<div className="flex-shrink-0">
									<div
										className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-md">
										<i className="gg-arrows-exchange"></i>
									</div>
								</div>
								<div className="ml-4">
									<dt className="text-lg leading-6 font-medium">
										Simplicité
									</dt>
									<dd className="mt-2 font-medium text-gray">
										Parcourez les diverses annonces, déposez les votres et
										échangez avec les autres utilisateurs simplement sur notre plateforme.
									</dd>
								</div>
							</div>

							<div className="flex">
								<div className="flex-shrink-0">
									<div
										className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-md">
										<i className="gg-pin"></i>
									</div>
								</div>
								<div className="ml-4">
									<dt className="text-lg leading-6 font-medium text-gray-900">
										Localisation
									</dt>
									<dd className="mt-2 font-medium text-gray">
										Un système de localisation afin de vous proposer des
										échanges toujours au plus proche de vous.
									</dd>
								</div>
							</div>

							<div className="flex">
								<div className="flex-shrink-0">
									<div
										className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-md">
										<i className="gg-bell"></i>
									</div>
								</div>
								<div className="ml-4">
									<dt className="text-lg leading-6 font-medium text-gray-900">
										Notifications
									</dt>
									<dd className="mt-2 font-medium text-gray">
										Une notification vous est envoyé à chaque fois qu'une action
										est réalisé avec une de vos offres (commentaire, proposition, ...)
									</dd>
								</div>
							</div>

							<div className="flex">
								<div className="flex-shrink-0">
									<div
										className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-md">
										<i className="gg-globe-alt"></i>
									</div>
								</div>
								<div className="ml-4">
									<dt className="text-lg leading-6 font-medium text-gray-900">
										Écologique
									</dt>
									<dd className="mt-2 font-medium text-gray">
										En promouvant l'échange et l'achat d'occasion,
										vous réduisez les déchets et par conséquent vous aidez la planète.
									</dd>
								</div>
							</div>
						</dl>
					</div>
				</div>
			</div>
			<div className="bg-primary">
				<div
					className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
					<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						<span className="block">Intéressé ?</span>
						<span className="block text-white">Inscrivez-vous dès maintenant.</span>
					</h2>
					<div className="mt-8 lex lg:mt-0 lg:flex-shrink-0">
						<div className="inline-flex rounded-md shadow">
							<a href="/sign"
							   className="w-full flex items-center justify-center px-5 py-3 cursor-pointer font-medium rounded-md text-black bg-white hover:text-primary">
								Inscription
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}

export { Landing }
