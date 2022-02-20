import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FullscreenProvider, useFullscreen  } from '../../components/useFullscreen';
import CompactBoxTree from '../../components/butterfly';

import 'butterfly-dag/dist/index.css';
import './style.css';
import Node from '../../components/butterfly/node.js';

import defaultJson from './table.json';

const initialJson = JSON.parse(JSON.stringify(defaultJson));

const StrategyCard = (props) => {

	const ModPicker = props.ModPicker
	const recipeModifiers = props.recipeModifiers

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
		let modObject = {
			'id': `${recipeItem}-${id}`,
			'Class': Node,
			content:title,
			imageUrl: image,
			rewards: rewards,
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
			const recipe = initialJson['modifiers'][modifier]['recipe']
			const title = initialJson['modifiers'][modifier]['title']
			const image = initialJson['modifiers'][modifier]['image']
			const rewards = initialJson['modifiers'][modifier]['rewards']
			const rewardMod = initialJson['modifiers'][modifier]['rewardMod']
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

	const modifierTitle = initialJson['modifiers'][props.strategy['title']]['title']
	const modifierImage = initialJson['modifiers'][props.strategy['title']]['image']

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
									<ModPicker recipeModifiers={recipeModifiers}/>
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

	let defaultModifier = {
		"title":"heralding-minions",
		"order":
			["heralding-minions"]
	}

	let localMod = JSON.parse(localStorage.getItem("selectedModifier"))
	if (localMod) {
		defaultModifier = localMod
	}

	const [strategy, setStrategy] = useState(defaultModifier);

	function onModifier(event) {
		// const selectedMod = JSON.parse(event.target.value)
		const thisStrategy = {
			'title': event.target.value,
			'order': [event.target.value]
		}
		setStrategy(thisStrategy)
		localStorage.setItem("selectedModifier",JSON.stringify(thisStrategy))
	}

	const recipeModifiers = {}

	Object.keys(initialJson['modifiers']).map(modifier => {
		const thisModifier = initialJson['modifiers'][modifier]
		if (thisModifier.recipe.length !== 0) {
			recipeModifiers[modifier] = thisModifier
		}
		return(null)
	})

	const ModPicker = (props) => {
		const recipeModifiers = props.recipeModifiers
		return(
			<select
			id="modName"
			className="formField"
			onChange={e => onModifier(e)}
			value="Select Modifier"
			>
				<option	value="Select Modifier" disabled hidden> 
				Select Modifier
				</option>
				{/* <option value="Custom Strat" order={`["frenzied","hexer"]`} key={`Custom Strat`}>{`Custom Strat`}</option> */}
				{Object.keys(recipeModifiers).sort().map(function(key) {
					let value = {
						"title": recipeModifiers[key]['title'],
						"icon": recipeModifiers[key]['icon'],
						"order": [recipeModifiers[key]['icon']]
					};
					// const title = recipeModifiers[key]['title']
					// const value = recipeModifiers[key]['icon']
					return(
					<option value={value.icon} key={key}>{value.title}</option>
					);
				})};
			</select>
		)
	}

	return (
		<FullscreenProvider>
			<div className={`archnemesis page ${display}`}>
				<div className={`titleWrapper archnemesis ${display}`}>
					<h1>Archnemesis Recipes</h1>
				</div>
				<div>
					<div>
						<StrategyCard strategy={strategy} ModPicker={ModPicker} recipeModifiers={recipeModifiers}/>
					</div>
				</div>
			</div>
		</FullscreenProvider>
	);
}

export default Archnemesis;
