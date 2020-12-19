import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import './NewOffer.scss';

import { useHistory } from "react-router-dom";

import { Link } from 'react-router-dom'

import axios from "axios";
import configApi from '../config/api.config'

import { Listbox, Transition } from "@headlessui/react";

import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

import { firebaseConfig } from '../config/firebase.config'
import firebase from "firebase"

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();

function NewOffer(props) {

	let history = useHistory()

	const [categories, setCategories] = useState([])
	const [conditions] = useState(["Comme neuf", "Très bon état", "Bon état", "État correct", "En vrai ça passe", "Marche plus"])
	const [methods] = useState(["En main propre", "À venir chercher", "Envoi (La poste)", "Envoi (Chronopost)", "Envoi (Point relai)"])
	const [fields, setFields] = useState({})
	const [errorMessage] = useState({})
	const [selectedCategory, setSelectedCategory] = useState({});
	const [selectedCondition, setSelectedCondition] = useState("");
	const [selectedMethod, setSelectedMethod] = useState("");
	const [pictures, setPictures] = useState([])

	async function fetchDataForm() {
		let response = await axios.get(
			`${configApi}categories`
		);
		let categories = await response.data;
		setCategories(categories)
	}

	useEffect(() => {
		fetchDataForm()
	}, [])

	const inputChange = (e) => {
		const { name, value } = e.target
		setFields({
			...fields,
			[name]: value
		})
	}

	// specify upload params and url for your files
	const getUploadParams = ({ meta }) => {
		return { url: 'https://httpbin.org/post' }
	}

	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		// console.log(status, meta, file)
	}

	// receives array of files that are done uploading when submit button is clicked
	const handleSubmit = (files, allFiles) => {
		setPictures(allFiles)
	}

	const submitPictures = () => {
		let picturesLink = []
		let idFolder = Math.random().toString(36).substr(2, 8)
		pictures.forEach(( { file }) => {
			let metadata = { contentType: file.type }
			const uploadTask = storageRef.child(idFolder + '/' + file.name).put(file, metadata);
			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function(snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							 // console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							// console.log('Upload is running');
							break;
					}
				}, function(error) {

					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							// console.log('storage/unauthorized')
							break;
						case 'storage/canceled':
							// User canceled the upload
							// console.log('storage/canceled')
							break;
						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							// console.log('storage/unknown')
							break;
					}
				}, function() {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						picturesLink.push(downloadURL)
						// console.log('File available at', downloadURL);
					});
				});
		})
		return picturesLink
	}

	const uploadPictures = async (e) => {
		e.preventDefault()
		let picturesLink = await submitPictures()
		setTimeout(() => {
			if(picturesLink.length === pictures.length) {
				addOffer(picturesLink)
			}
		}, 5000)
	}

	const addOffer = (pictures) => {
		let tags = fields.tags.split(';')
		let newOffer = {
			user_id: props.sign.user.id,
			title: fields.title,
			product: {
				name: fields.title,
				condition: selectedCondition,
			},
			description: fields.description,
			pictures: pictures,
			category: selectedCategory.id,
			tags: tags,
			trade: {
				method: selectedMethod,
				target: fields.target,
				estimation: fields.price,
				place: '',
				radius: '',
			},
			views: 0,
			saves: 0,
			is_active: true,
			status: '',
			created_at: new Date(),
			updated_at: new Date()
		}
		console.log(newOffer)
		axios.post(`${configApi}offers`, newOffer)
			.then((response) => {
				history.push('/offers/' + response.data.id)
			})
	}

	return(
		<div id="new-offer">
			<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">

				<div id="offerInfo" className="bg-white rounded mb-5">
					<h1 id="offerTitle" className="text-3xl tracking-tight roboto-bold text-gray-900 ml-3">
						<span className="block xl:inline">
							Nouvelle offre
						</span>
					</h1>
					<div className="px-6 pt-6">
						<Dropzone
							getUploadParams={getUploadParams}
							onChangeStatus={handleChangeStatus}
							onSubmit={handleSubmit}
							accept="image/*"
							inputContent={(files, extra) => (extra.reject ? 'Seules les images sont acceptées' : 'Déposez vos images')}
							inputWithFilesContent={"Ajouter une image"}
							submitButtonContent={"Sauvegarder"}
							maxFiles={5}
						/>
					</div>
					<form className="px-6 pb-6" onSubmit={(e) => addOffer(e)}>
						<div className="mt-4">
							<label htmlFor="title"
								   className="block text-sm font-medium text-gray-700">Titre de l'offre</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									 style={{ minWidth: '30px' }}
								>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-user" />
											</span>
								</div>
								<input type="text" id="title" name="title" required
									   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
									   placeholder="Chemise à carreaux verte et bleu" onChange={(e) => inputChange(e)} />
							</div>
							<div className="validation-message">
								{errorMessage.firstname}
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="description"
								   className="block text-sm font-medium text-gray-700">Description</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<textarea id="description" name="description" required rows="3"
										  className="focus:ring-secondary focus:border-secondary block w-full px-3 sm:text-sm border-gray-light rounded-md"
										  placeholder="Une chemise parfaite pour les grandes occasions tel que le déconfinement ..." onChange={(e) => inputChange(e)} />
							</div>
							<div className="validation-message">
								{errorMessage.description}
							</div>
						</div>
						<div className="mt-4">
							<div className="w-full">
								<Listbox
									as="div"
									className="space-y-1"
									value={selectedCategory}
									onChange={setSelectedCategory}
								>
									{(category) => (
										<>
											<Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
												Catégorie
											</Listbox.Label>
											<div className="relative">
                								<span className="inline-block w-full rounded-md shadow-sm">
                  									<Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-light bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
														<span className="block truncate">{selectedCategory.title || 'Catégorie'}</span>
														<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
															<svg className="h-5 w-5 text-gray-400"
																viewBox="0 0 20 20"
																fill="none"
																stroke="currentColor"
															>
																<path d="M7 7l3-3 3 3m0 6l-3 3-3-3"
																	strokeWidth="1.5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</span>
                  									</Listbox.Button>
                								</span>

												<Transition
													show={category.open}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
													style={{ zIndex: '100000' }}
												>
													<Listbox.Options
														static
														className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
													>
														{categories.map((category) => (
															<Listbox.Option key={category.id} value={category}>
																{({ selected, active }) => (
																	<div
																		className={`${
																			active
																				? "text-white bg-primary"
																				: "text-gray-900"
																		} cursor-default select-none relative py-2 pl-8 pr-4`}
																	>
																		<span
																			className={`${
																				selected ? "roboto-bold" : "font-normal"
																			} block truncate`}
																		>
																		  {category.title}
																		</span>
																		{selected && (
																			<span
																				className={`${
																					active ? "text-white" : "text-primary"
																				} absolute inset-y-0 left-0 flex items-center pl-1.5`}
																			>
																				<svg className="h-5 w-5"
																					xmlns="http://www.w3.org/2000/svg"
																					viewBox="0 0 20 20"
																					fill="currentColor"
																				>
																				  	<path fillRule="evenodd"
																					  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																					  clipRule="evenodd"
																				  	/>
																				</svg>
																			</span>
																		)}
																	</div>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="tags"
								   className="block text-sm font-medium text-gray-700">Tags (séparé par ";" sans espace)</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									 style={{ minWidth: '30px' }}
								>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-math-plus" />
											</span>
								</div>
								<input type="text" id="tags" name="tags" required
									   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
									   placeholder="outil;jardin" onChange={(e) => inputChange(e)} />
							</div>
							<div className="validation-message">
								{errorMessage.tags}
							</div>
						</div>
						<div className="mt-4">
							<div className="w-full">
								<Listbox
									as="div"
									className="space-y-1"
									value={selectedCondition}
									onChange={setSelectedCondition}
								>
									{(condition) => (
										<>
											<Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
												État du produit
											</Listbox.Label>
											<div className="relative">
                								<span className="inline-block w-full rounded-md shadow-sm">
                  									<Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-light bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
														<span className="block truncate">{selectedCondition || 'État du produit'}</span>
														<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
															<svg className="h-5 w-5 text-gray-400"
																 viewBox="0 0 20 20"
																 fill="none"
																 stroke="currentColor"
															>
																<path d="M7 7l3-3 3 3m0 6l-3 3-3-3"
																	  strokeWidth="1.5"
																	  strokeLinecap="round"
																	  strokeLinejoin="round"
																/>
															</svg>
														</span>
                  									</Listbox.Button>
                								</span>

												<Transition
													show={condition.open}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
													style={{ zIndex: '100000' }}
												>
													<Listbox.Options
														static
														className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
													>
														{conditions.map((condition) => (
															<Listbox.Option key={condition} value={condition}>
																{({ selected, active }) => (
																	<div
																		className={`${
																			active
																				? "text-white bg-primary"
																				: "text-gray-900"
																		} cursor-default select-none relative py-2 pl-8 pr-4`}
																	>
																		<span
																			className={`${
																				selected ? "roboto-bold" : "font-normal"
																			} block truncate`}
																		>
																		  {condition}
																		</span>
																		{selected && (
																			<span
																				className={`${
																					active ? "text-white" : "text-primary"
																				} absolute inset-y-0 left-0 flex items-center pl-1.5`}
																			>
																				<svg className="h-5 w-5"
																					 xmlns="http://www.w3.org/2000/svg"
																					 viewBox="0 0 20 20"
																					 fill="currentColor"
																				>
																				  	<path fillRule="evenodd"
																						  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																						  clipRule="evenodd"
																					/>
																				</svg>
																			</span>
																		)}
																	</div>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="price"
								   className="block text-sm font-medium text-gray-700">Valeur de l'objet</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									 style={{ minWidth: '30px' }}
								>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-euro" />
											</span>
								</div>
								<input type="number" id="price" name="price" required
									   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
									   placeholder="15" onChange={(e) => inputChange(e)} />
							</div>
							<div className="validation-message">
								{errorMessage.price}
							</div>
						</div>
						<div className="mt-4">
							<div className="w-full">
								<Listbox
									as="div"
									className="space-y-1"
									value={selectedMethod}
									onChange={setSelectedMethod}
								>
									{(method) => (
										<>
											<Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
												Type d'échange
											</Listbox.Label>
											<div className="relative">
                								<span className="inline-block w-full rounded-md shadow-sm">
                  									<Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-light bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
														<span className="block truncate">{selectedMethod || 'Type d\'échange'}</span>
														<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
															<svg className="h-5 w-5 text-gray-400"
																 viewBox="0 0 20 20"
																 fill="none"
																 stroke="currentColor"
															>
																<path d="M7 7l3-3 3 3m0 6l-3 3-3-3"
																	  strokeWidth="1.5"
																	  strokeLinecap="round"
																	  strokeLinejoin="round"
																/>
															</svg>
														</span>
                  									</Listbox.Button>
                								</span>

												<Transition
													show={method.open}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
													style={{ zIndex: '100000' }}
												>
													<Listbox.Options
														static
														className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
													>
														{methods.map((method) => (
															<Listbox.Option key={method} value={method}>
																{({ selected, active }) => (
																	<div
																		className={`${
																			active
																				? "text-white bg-primary"
																				: "text-gray-900"
																		} cursor-default select-none relative py-2 pl-8 pr-4`}
																	>
																		<span
																			className={`${
																				selected ? "roboto-bold" : "font-normal"
																			} block truncate`}
																		>
																		  {method}
																		</span>
																		{selected && (
																			<span
																				className={`${
																					active ? "text-white" : "text-primary"
																				} absolute inset-y-0 left-0 flex items-center pl-1.5`}
																			>
																				<svg className="h-5 w-5"
																					 xmlns="http://www.w3.org/2000/svg"
																					 viewBox="0 0 20 20"
																					 fill="currentColor"
																				>
																				  	<path fillRule="evenodd"
																						  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																						  clipRule="evenodd"
																					/>
																				</svg>
																			</span>
																		)}
																	</div>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="target"
								   className="block text-sm font-medium text-gray-700">Objet voulu en échange</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="flex justify-center absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									 style={{ minWidth: '30px' }}
								>
											<span className="text-gray-500 sm:text-sm">
												<i className="gg-gift" />
											</span>
								</div>
								<input type="text" id="target" name="target" required
									   className="focus:ring-secondary focus:border-secondary block w-full pl-12 pr-7 sm:text-sm border-gray-light rounded-md"
									   placeholder="Hoodie pour Rémi" onChange={(e) => inputChange(e)} />
							</div>
							<div className="validation-message">
								{errorMessage.target}
							</div>
						</div>
						<div className="grid grid-cols-6 gap-4 mt-6">
							<Link to="/offers"
								className="col-start-1 col-end-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red hover:bg-red-dark">
								<div className="flex items-center">
											<span className="mr-2 sm:text-sm">
												<i className="gg-close-o bg-white text-red" />
											</span>
									Annuler
								</div>
							</Link>
							<button className="col-end-7 col-span-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark"
								onClick={uploadPictures}>
								<div className="flex items-center">
									<span className="mr-2 sm:text-sm">
										<i className="gg-check-o bg-white text-secondary" />
									</span>
									Ajouter l'offre
								</div>
							</button>
						</div>
					</form>
				</div>

			</main>
		</div>
	)

}

function mapStateToProps(state) {
	const { sign } = state
	return {
		sign
	};
}

const connectedNewOffer = connect(mapStateToProps)(NewOffer);
export { connectedNewOffer as NewOffer };
