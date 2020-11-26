import React from 'react'

import Logo from '../logo-header.png'

function Navbar() {

	return(
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<a href="/">
								<img className="h-8" src={Logo}
									 alt="Workflow" />
							</a>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="flex items-center">
							<a href="/offers" className="mr-3 px-3 text-sm font-medium text-black">
								Offres
							</a>
							<div className="-space-y-px">
								<div className="w-96">
									<input id="search" name="search" type="text"
										   className="appearance-none relative block w-full px-3 py-2 border border-black placeholder-black text-black ring-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-green-500 focus:z-10 sm:text-sm"
										   placeholder="Recherche" />
								</div>
							</div>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="flex items-center">
							{/*<div className="ml-3 relative">
								<div>
									<button
										className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										id="user-menu" aria-haspopup="true">
										<span className="sr-only">Open user menu</span>
										<img className="h-8 w-8 rounded-full"
											 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											 alt="" />
									</button>
								</div>
								<div
									className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
									role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Your Profile</a>

									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Settings</a>

									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									   role="menuitem">Sign out</a>
								</div>
							</div>*/}
							<div className="relative flex items-center">
								<a href="/login" className="px-3 py-2 text-sm font-medium text-black flex items-center">
									<i className="gg-log-in"></i>
									<span className="ml-4">Connexion</span>
								</a>
								<a href="/register" className="ml-3 px-3 py-2 text-sm font-medium text-black flex items-center">
									<i className="gg-user-add"></i>
									<span className="ml-2">Inscription</span>
								</a>
								<a href="/guide" className="ml-3 px-3 py-2 text-sm font-medium text-black flex items-center">
									<i className="gg-info"></i>
									<span className="ml-2">Guide</span>
								</a>
							</div>
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<span className="sr-only">Open main menu</span>
							<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M4 6h16M4 12h16M4 18h16"/>
							</svg>
							<svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)

}

export { Navbar }
