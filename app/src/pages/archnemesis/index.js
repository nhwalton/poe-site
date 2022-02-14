import { useRef, useState, useEffect } from 'react';
// import { Canvas, Node, Icon } from 'reaflow';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { FullscreenProvider, useFullscreen  } from '../../components/useFullscreen';
import CompactBoxTree from '../../components/butterfly';

import 'butterfly-dag/dist/index.css';
import './style.css';
import Node from '../../components/butterfly/node.js';

import defaultJson from './table.json';

console.clear();

const initialJson = JSON.parse(JSON.stringify(defaultJson));

const ModifierRecipe = (props) => {
	const title = props.modifier['title']
	const modifier = props.modifier
	const recipe = props.modifier['recipe']

	return (
		<div>
            {recipe.map( modifier => {
                return (
                    <p>{modifier}</p>
                );
                }
            )
            }
        </div>
	);
};

const StrategyModifier = (props) => {
	const modifier = initialJson['modifiers'][props.modifier]
	return (
		<div className="strategyModifier">
			<img src={modifier['image']}></img>
			<span>{modifier['title']}</span>
			<ModifierRecipe modifier={modifier}/>
		</div>
	);
};

const StrategyCard = (props) => {

	const {
        fullscreenRef,
        enterFullscreen,
        exitFullscreen,
        fullscreenActive,
    } = useFullscreen();
	
	function GetRecipe(recipeItem, parentObject, edges) {
		id += 1;
		let recipeLength = initialJson['modifiers'][recipeItem]['recipe'].length
		const parentId = parentObject['id']
		// const id = useEffect(() => Counter(), [])
		let modObject = {
			'id': `{recipeItem}-${id}`,
			'Class': Node,
			content:initialJson['modifiers'][recipeItem]['title'],
			// 'text': initialJson['modifiers'][recipeItem]['title'],
			imageUrl: initialJson['modifiers'][recipeItem]['image'],
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
			targetNode: `{recipeItem}-${id}`,
			type: 'endpoint'
		}

		if (recipeLength > 0) {
			parentObject['children'].push(modObject)
			edges.push(modEdge)
			initialJson['modifiers'][recipeItem]['recipe'].map( recipeItem => {
				GetRecipe(recipeItem, modObject, edges)
			})
		} else {
			edges.push(modEdge)
			delete modObject['children']
			parentObject['children'].push(modObject)
		}
	}
	
	let id = 0

	function MapStrategy (props) {
		let strategy = []
		let edges = []
		props.strategy['order'].map( modifier => {
			id += 1
			const recipe = initialJson['modifiers'][modifier]['recipe']
			const title = initialJson['modifiers'][modifier]['title']
			const image = initialJson['modifiers'][modifier]['image']
			let parentObject = {
				isRoot: true,
				id: 'Root',
				content: title,
				imageUrl: image,
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
				// 'text': title,
				children: [],
				// 'image': image,
				// 'id': id
			}
			let parentEdge = {
				id: `${id}`,
				source: '2',
				target: '1',
				sourceNode: 'Root',
				type: 'endpoint'
			}
			recipe.map(function(recipeItem) {
				GetRecipe(recipeItem, parentObject, edges)
			})
			// modList.push(parentObject)
			edges.push(parentEdge)
			strategy.push(parentObject)
		})
		const data = {
			nodes: strategy[0],
			edges: edges
		}
		return (data)
	}
	
// 	function crawlChildren(parent, results, links) {
// 		const parentId = parent.id
// 		if (Array.isArray(parent.children)) {parent.children.forEach( child => {
// 			id += 1
// 			child.id = id
// 			child.parentId = parentId
// 			const edge = {
// 				id: `${parentId}-${child.id}`,
// 				from: parentId,
// 				to: child.id
// 			}
// 			links.push(edge)
// 			if (Array.isArray(child.children)) { crawlChildren(child, results, links) }
// 			else {
// 				child.icon = {
// 					url: child.image,
// 					height: 50,
// 					width: 50
// 				  }
// 				results.push(child)
// 				// setResults(results)
// 			}
// 		parent.icon = {
// 				url: parent.image,
// 				height: 50,
// 				width: 50
// 			  }
// 		results.push(parent)
// 		setResults(results)
// 		setLinks(links)
// 	})}	
// }

	const [strategy, setStrategy] = useState({})
	// const [results, setResults] = useState([]);
	// const [links, setLinks] = useState([]);

	// useEffect(() => {
	// 	console.log('strategy changed', strategy)}, [strategy]
	// )

	// useEffect(() => {
	// 	// setStrategy(MapStrategy(props))
	// 	const thisResults = []
	// 	const thisLinks = []
	// 	const thisStrategy = MapStrategy(props).forEach(parent => { crawlChildren(parent, thisResults, thisLinks) });
	// 	setStrategy(thisStrategy)
	// 	setResults(thisResults)
	// 	setLinks(thisLinks)
	// }, [props]);

	// useEffect(() => {
	// 	setStrategy(MapStrategy(props))
	// }, [props]);

	const BoxTree = () => {
		const strategy = MapStrategy(props)
		return (
			<CompactBoxTree data={strategy}/>
		)
	}

	// const nodes = [...new Set(results)];
	// const edges = [...new Set(links)];
	// console.log('nodes',nodes)
	// console.log('edges',edges)
	// console.log(props)
	const modifierTitle = initialJson['modifiers'][props.strategy['title']]['title']

	return (
		<div>
			<img src={initialJson['modifiers'][props.strategy['title']]['image']}></img>
			<h2>{modifierTitle}</h2>
			
			{/* <div className="recipe">
				{props.strategy['order'].map( modifier => {
					return (
						<div>
							<StrategyModifier modifier={modifier}/>
						</div>
						);
					}
				)
				}
			</div> */}
			<main ref={fullscreenRef}>
                {fullscreenActive ? (
					<Button variant="syn" type="button" onClick={exitFullscreen}>
							Exit fullscreen mode
					</Button>
					) : (
					<Button variant="syn" type="button" onClick={enterFullscreen}>
						Enter fullscreen mode
					</Button>
                )}
			<div>
			{fullscreenActive ? (
				<div className="treeCanvas"><BoxTree/></div>
                ) : (
				<Card variant="arch">
					<div className="treeCanvas"><BoxTree/></div>
				</Card>
                )}
			</div>
			</main>
		</div>
	);
};

const Archnemesis = (props) => {
	const display = props.display

	const defaultModifier = {
		"title":"heralding-minions",
		"order":
			["heralding-minions"]
	}

	// let initialJson = JSON.parse(JSON.stringify(defaultJson));
	const [archnemesis, setArchnemesis] = useState(initialJson);
	const [strategy, setStrategy] = useState(defaultModifier);

	function onModifier(event) {
		const thisStrategy = {
			'title': event.target.value,
			'order': [event.target.value]
		}
		setStrategy(thisStrategy)
	}

	const recipeModifiers = {}

	Object.keys(initialJson['modifiers']).map(modifier => {
		const thisModifier = initialJson['modifiers'][modifier]
		if (thisModifier.recipe.length !== 0) {
			recipeModifiers[modifier] = thisModifier
		}
	})

	return (
		<FullscreenProvider>
			<div className={`archnemesis page ${display}`}>
				<div className={`titleWrapper ${display}`}>
					<h1>Archnemesis Recipes</h1>
						<div className="formGroup">
							<select
							id="modName"
							className="formField"
							defaultValue="Heralding Minions"
							onChange={e => onModifier(e)}
							>
								<option selected disabled hidden> 
								Modifier
								</option>
								{Object.keys(recipeModifiers).map(function(key) {
									const title = recipeModifiers[key]['title']
									const value = recipeModifiers[key]['icon']
									return(
									<option value={value}>{title}</option>
									);
								})};
							</select>
						</div>
				</div>
				<div>
					<div>
						{/* {Object.keys(initialJson['strategies']).map(function(key) {
							return (
								<StrategyCard strategy={initialJson['strategies'][key]}/>
									// <h2>{initialJson['strategies'][key]['title']}</h2>
								);
							}
						)
						} */}
						<StrategyCard strategy={strategy}/>
					</div>
				</div>
			</div>
		</FullscreenProvider>
	);
}

export default Archnemesis;
