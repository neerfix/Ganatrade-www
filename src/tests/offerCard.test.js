import { OfferCard } from '../components/OfferCard'
import { BrowserRouter as Router } from "react-router-dom";

import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { screen } from '@testing-library/dom'

const offer = {
	id: 1, pictures: [], title: 'offer ok',
	description: 'Magnifique pantalon jaune de taille 42',
	trade: { target: 'Chaussure Bleu' }, tags: ['home'],
	is_active: true
}

const offerNoTitle = {
	id: 1, pictures: [],
	description: 'Magnifique pantalon jaune de taille 42',
	trade: { target: 'Chaussure Bleu' }, tags: ['home'],
	is_active: true
}

test("La card devrait d'afficher", function () {
	render(<Router><OfferCard offer={offer}/></Router>)
	const title = screen.getByText(offer.title)
	expect(title).toBeInTheDocument()
})

test("Il manque une ou plusieurs props (ici le 'title')", function () {
	render(<Router><OfferCard offer={offerNoTitle}/></Router>)
	const id = screen.getByText(offer.id)
	expect(id).toBeInTheDocument()
})
