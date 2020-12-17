import React from "react";
import './CardReview.scss';

function CardReview({ user }) {

	return(
		<div className="bg-white shadow overflow-hidden rounded-lg m-1 mr-4">
			<div className="px-2 py-2">
				<div className="w-full lg:flex">
					<div className="h-16 w-16 sm:rounded-lg flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
						 style={{ backgroundImage: "url('https://tailwindcss.com/img/card-left.jpg')" }}
						 title="Woman holding a mug">
					</div>
					<div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 leading-normal">
						<div className="text-black font-bold text-xl m-0">{user.name}</div>
						<div id="stars" className="flex h-3.5 mb-3 px-1">
							<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
							<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
							<i className="gg-trophy bg-yellow text-yellow h-2.5 mr-3"></i>
							<i className="gg-trophy bg-gray-light-2 text-gray-light-2 h-2.5 mr-3"></i>
							<i className="gg-trophy bg-gray-light-2 text-gray-light-2 h-2.5"></i>
						</div>
						<p className="text-grey-darker text-sm mb-0">{user.text}</p>
					</div>
				</div>
			</div>
		</div>
	)

}

export { CardReview }
