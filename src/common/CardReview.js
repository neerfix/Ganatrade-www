import React, { useEffect } from "react";
import './CardReview.scss';

import moment from "moment";
import 'moment/locale/fr'

function CardReview({ review }) {

	useEffect(() => {
		console.log(review)
	})

	return(
		<div className="bg-white shadow overflow-hidden rounded-lg m-1 mr-4">
			<div className="px-2 py-2">
				<div className="w-full lg:flex">
					<div className="h-16 w-16 sm:rounded-lg flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
						 style={{ backgroundImage: "url('" + review.author?.avatar +"')" }}
						 title="Woman holding a mug">
					</div>
					<div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 leading-normal">
						<div className="w-full flex items-center justify-between">
							<div className="text-black font-bold text-xl m-0">{review.author?.username}</div>
							<div className="text-black text-sm m-0">Le {moment.unix(review.created_at?._seconds).format('Do MMMM YYYY')}</div>
						</div>
						<div id="stars" className="flex h-3.5 mb-3 px-1">
							<i className={`
								${review.note >= 1 ? 'bg-yellow text-yellow' : 'bg-gray-light-2 text-gray-light-2'}
								gg-trophy  h-2.5 mr-3`}
							/>
							<i className={`
								${review.note >= 2? 'bg-yellow text-yellow' : 'bg-gray-light-2 text-gray-light-2'}
								gg-trophy  h-2.5 mr-3`}
							/>
							<i className={`
								${review.note >= 3 ? 'bg-yellow text-yellow' : 'bg-gray-light-2 text-gray-light-2'}
								gg-trophy  h-2.5 mr-3`}
							/>
							<i className={`
								${review.note >= 4 ? 'bg-yellow text-yellow' : 'bg-gray-light-2 text-gray-light-2'}
								gg-trophy  h-2.5 mr-3`}
							/>
							<i className={`
								${review.note >= 5 ? 'bg-yellow text-yellow' : 'bg-gray-light-2 text-gray-light-2'}
								gg-trophy  h-2.5 mr-3`}
							/>
						</div>
						<p className="text-grey-darker text-sm mb-0">{review.content}</p>
					</div>
				</div>
			</div>
		</div>
	)

}

export { CardReview }

/*
className={`${
	checked ? "translate-x-5 bg-white border-white" : "translate-x-0 bg-black border-black"
} inline-block w-4 h-4 transition duration-200 ease-in-out transform rounded-full border`}*/
