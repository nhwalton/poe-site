import { Button, Card, ListSubheader, MenuItem, Select, useMediaQuery } from '@mui/material';
import 'butterfly-dag/dist/index.css';
import React, { useEffect, useState } from 'react';
import ReactGA from "react-ga";
import CompactBoxTree from '../../components/butterfly';
import Node from '../../components/butterfly/node.js';
import { Modal } from "../../components/modal";
import { FullscreenProvider, useFullscreen } from '../../components/useFullscreen';
import './style.css';
import defaultJson from './table.json';

const initialJson = JSON.parse(JSON.stringify(defaultJson));

const StrategyCard = (props) => {

	let recipeLocation = ''

	if (initialJson['modifiers'][props.strategy.title] !== undefined) {
		recipeLocation = initialJson['modifiers']
	} else if (initialJson['strategies'][props.strategy.title] !== undefined) {
		recipeLocation = initialJson['strategies']
	} else {
		recipeLocation = JSON.parse(localStorage.getItem('localStrategies'))
	}

	const ModPicker = props.ModPicker
	const recipeModifiers = props.recipeModifiers
	const openModal = props.openModal

	const {
        fullscreenRef,
        enterFullscreen,
        exitFullscreen,
        fullscreenActive,
    } = useFullscreen();
	
	function GetRecipe(recipeItem, parentObject, edges, nodes) {
		id += 1;
		let recipeLength = initialJson['modifiers'][recipeItem]['recipe'].length
		const parentId = parentObject['id']
		const recipe = initialJson['modifiers'][recipeItem]['recipe']
		const title = initialJson['modifiers'][recipeItem]['title']
		const image = initialJson['modifiers'][recipeItem]['image']
		const rewards = initialJson['modifiers'][recipeItem]['rewards']
		const rewardMod = initialJson['modifiers'][recipeItem]['rewardMod']
		let modObject = {
			'id': `${recipeItem}-${id}`,
			'Class': Node,
			content:title,
			imageUrl: image,
			rewards: rewards,
			rewardMod: rewardMod,
			children: [],
			endpoints: [{
				id: '1',
				orientation: [0, -1],
				pos: [0.5, 0]
			}, {
				id: '2',
				orientation: [0, 1],
				pos: [0.5, 0]
			}]
		}
		let modEdge = {
			id: `${id}`,
			source: '2',
			target: '1',
			sourceNode: parentId,
			targetNode: `${recipeItem}-${id}`,
			type: 'endpoint'
		}

		if (parentObject['isRoot'] !== true) {
			delete modObject['rewardMod']
		}

		if (recipeLength > 0) {
			parentObject['children'].push(modObject)
			edges.push(modEdge)
			nodes.push(modObject)
			recipe.map( recipeItem => {
				const recipe = GetRecipe(recipeItem, modObject, edges, nodes)
				return(recipe)
			})
		} else {
			edges.push(modEdge)
			nodes.push(modObject)
			delete modObject['children']
			parentObject['children'].push(modObject)
		}
	}
	
	let id = 0

	function MapStrategy (props) {
		let strategy = []
		let nodes = []
		let edges = []
		props.strategy['order'].map( modifier => {
			id += 1
			const recipe = recipeLocation[modifier]['recipe']
			const title = recipeLocation[modifier]['title']
			// const description = recipeLocation[modifier]['description']
			const image = recipeLocation[modifier]['image']
			const rewards = recipeLocation[modifier]['rewards']
			const rewardMod = recipeLocation[modifier]['rewardMod']
			let parentObject = {
				isRoot: true,
				'id': `${title}-${id}`,
				content: title,
				imageUrl: image,
				// description: description,
				rewards: rewards,
				rewardMod: rewardMod,
				'Class': Node,
				endpoints: [{
					id: '1',
					orientation: [0, -1],
					pos: [0.5, 0]
				}, {
					id: '2',
					orientation: [0, 1],
					pos: [0.5, 0]
				}],
				children: []
			}
			
			recipe.map(function(recipeItem) {
				const recipe = GetRecipe(recipeItem, parentObject, edges, nodes)
				return(recipe)
			})
			nodes.push(parentObject)
			strategy.push(parentObject)
			return(null)
		})
		nodes = strategy[0]
		const data = {
			nodes: nodes,
			edges: edges
		}
		return (data)
	}

	const BoxTree = () => {
		const strategy = MapStrategy(props)
		return (
			<CompactBoxTree data={strategy}/>
		)
	}

	let modifierTitle = ''
	let modifierImage = ''
	modifierTitle = recipeLocation[props.strategy['title']]['title']
	modifierImage = recipeLocation[props.strategy['title']]['image']

	const fullscreenText = useMediaQuery('(min-width:1960px)') ? 'Enter fullscreen Mode' : 'Fullscreen';

	return (
		<React.Fragment>
			<div className="modifierHeader">
					<Button variant="archEnterFullscreen" type="button" onClick={enterFullscreen}>
						{fullscreenText}
					</Button>
				<div className="modifierInfo">
					<img src={modifierImage} alt={modifierTitle}></img>
					<h2 className="archTitle">{modifierTitle}</h2>
				</div>
				<div className="modifierPickers">
					<Button variant="customStrategies" type="button" onClick={openModal}>
						Custom Strategies
					</Button>
					<ModPicker recipeModifiers={recipeModifiers}/>
				</div>
			</div>
			<main ref={fullscreenRef}>
				<div>
					{fullscreenActive ? (
							<div className="treeCanvasFull">
								<div className="fullscreenModifiers">
									<Button variant="archExitFullscreen" type="button" onClick={exitFullscreen}>
										Exit fullscreen mode
									</Button>
									{/* <ModPicker recipeModifiers={recipeModifiers}/> */}
								</div>
								<BoxTree/>
							</div>
						) : (
							<Card variant="arch">
								<div className="treeCanvas"><BoxTree/></div>
							</Card>
						)}
				</div>
			</main>
		</React.Fragment>
	);
};

const Archnemesis = (props) => {

	const display = props.display
	
	
	const openModal = () => {
		setStrategyModal(true);
	};
	
	let localMod = JSON.parse(localStorage.getItem("selectedModifier"))
	let defaultModifier = null
	
	if (localMod !== null) {
		defaultModifier = localMod	
	} else {
		defaultModifier = {
			"title":"heralding-minions",
			"order":
				["heralding-minions"]
			}
	}

	if (localStorage.getItem('localStrategies') === null) {
		localStorage.setItem('localStrategies', JSON.stringify({}));
	  }
	
	const [strategyModal, setStrategyModal] = useState(false);
	const [strategy, setStrategy] = useState(defaultModifier);
	const [localStrategies, setLocalStrategies] = useState(JSON.parse(localStorage.getItem('localStrategies')));

	const hostName = window.location.hostname
	useEffect(() => {
		if (hostName !== 'localhost' | strategy !== defaultModifier) {
			const eventDetails = {
				category: 'archnemesis',
				action: 'modifierChange',
				label: strategy.title
			}
			ReactGA.event(eventDetails)
		}
	}, [strategy, hostName, defaultModifier]);

	function OnModifier(event) {
		const thisStrategy = {
			'title': event.target.value,
			'order': [event.target.value]
		}
		setStrategy(thisStrategy)
		localStorage.setItem("selectedModifier",JSON.stringify(thisStrategy))
	}

	const recipeModifiers = {}
	const strategyModifiers = {}

	Object.keys(initialJson['modifiers']).map(modifier => {
		const thisModifier = initialJson['modifiers'][modifier]
		if (thisModifier.recipe.length !== 0) {
			recipeModifiers[modifier] = thisModifier
		}
		return(null)
	})

	Object.keys(initialJson['strategies']).map(modifier => {
		const thisModifier = initialJson['strategies'][modifier]
		if (thisModifier.recipe.length !== 0) {
			strategyModifiers[modifier] = thisModifier
		}
		return(null)
	})

	const ModPicker = () => {
		return(
			<Select
			id="modName"
			className="formField"
			onChange={e => OnModifier(e)}
			value={defaultModifier.title}
			sx= {{
				backgroundColor: "#1a1a1a",
				color: "#e0e0e0",
			  }}
			>
				<ListSubheader>Custom Strategies</ListSubheader>
					{ localStrategies === {} ? (
						<MenuItem value="" disabled>
							<em>None</em>
						</MenuItem>
					) : (
						Object.keys(localStrategies).map(function(key) {
							let value = {
								"title": localStrategies[key]['title'],
								"icon": localStrategies[key]['icon']
							};
							return(
								<MenuItem className="modSelect" value={value.icon} key={key}>
									{value.title}
								</MenuItem>
								);
							})
					)}
				<ListSubheader>Challenges</ListSubheader>
					{Object.keys(strategyModifiers).map(function(key) {
						let value = {
							"title": strategyModifiers[key]['title'],
							"icon": strategyModifiers[key]['icon']
						};
						return(
							<MenuItem className="modSelect" value={value.icon} key={key}>
								{value.title}
							</MenuItem>
							);
						})}
				<ListSubheader>Recipes</ListSubheader>
					{Object.keys(recipeModifiers).sort().map(function(key) {
						let value = {
							"title": recipeModifiers[key]['title'],
							"icon": recipeModifiers[key]['icon']
						};
						return(
							<MenuItem className="modSelect" value={value.icon} key={key}>
								{value.title}
							</MenuItem>
						);
						})};
			</Select>
		)
	}

	return (
		<FullscreenProvider>
			{strategyModal ? <Modal
								setStrategyModal={setStrategyModal}
								setLocalStrategies={setLocalStrategies}
								strategyModifiers={strategyModifiers}
								setStrategy={setStrategy}
								initialJson={initialJson}
							/> : null}
			<div className={`archnemesis page ${display}`}>
				<div className={`titleWrapper archnemesis ${display}`}>
					<h1>Archnemesis</h1>
				</div>
				<div>
					<div>
						<StrategyCard strategy={strategy} ModPicker={ModPicker} openModal={openModal}/>
					</div>
				</div>
			</div>
		</FullscreenProvider>
	);
}

export default Archnemesis;
