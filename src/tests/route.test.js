import { Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from 'history'

import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { screen } from '@testing-library/dom'

const LocationDisplay = () => {
	const location = useLocation()

	return <div data-testid="location-display">{location.pathname}</div>
}

test('rendering a component that uses useLocation', () => {
	const history = createMemoryHistory()
	const route = '/'
	history.push(route)
	render(
		<Router history={history}>
			<LocationDisplay />
		</Router>
	)

	expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})

