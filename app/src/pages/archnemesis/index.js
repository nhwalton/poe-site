import { h, Component, createRef, useState, useEffect, Fragment } from 'react';
import { Canvas, Node, Icon } from 'reaflow';

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import './style.css';
import defaultJson from './table.json';

console.clear();

const nodes2 = [
	{
	  id: '1',
	  text: '1'
	},
	{
	  id: '2',
	  text: '2'
	}
  ];
  
const edges2 = [
	{
		id: '1-2',
		from: '1',
		to: '2'
	}
	];


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
	
	// console.log('strategy',props.strategy)
	
	function GetRecipe(recipeItem, parentObject) {
		let recipeLength = initialJson['modifiers'][recipeItem]['recipe'].length
		const parentId = parentObject['id']
		// const id = useEffect(() => Counter(), [])
		let modObject = {
			'text': initialJson['modifiers'][recipeItem]['title'],
			'children': [],
			'image': initialJson['modifiers'][recipeItem]['image'],
			'parentId': parentId,
			'id': id

			// 'id': id
		}
		if (recipeLength > 0) {
			parentObject['children'].push(modObject)
			initialJson['modifiers'][recipeItem]['recipe'].map( recipeItem => {
				GetRecipe(recipeItem, modObject)
			})
		} else {
			delete modObject['children']
			parentObject['children'].push(modObject)
		}
	}
	
	let id = 0

	function MapStrategy (props) {
		let strategy = []
		props.strategy['order'].map( modifier => {
			id += 1
			const recipe = initialJson['modifiers'][modifier]['recipe']
			const title = initialJson['modifiers'][modifier]['title']
			const image = initialJson['modifiers'][modifier]['image']
			let parentObject = {
				'text': title,
				'children': [],
				'image': image,
				'id': id
			}
		
			recipe.map(function(recipeItem) {
				GetRecipe(recipeItem, parentObject, id)
			})
			// modList.push(parentObject)
			strategy.push(parentObject)
		})
		return (strategy)
	}
	
	function crawlChildren(parent, results, links) {
		const parentId = parent.id
		if (Array.isArray(parent.children)) {parent.children.forEach( child => {
			id += 1
			child.id = id
			child.parentId = parentId
			const edge = {
				id: `${parentId}-${child.id}`,
				from: parentId,
				to: child.id
			}
			links.push(edge)
			if (Array.isArray(child.children)) { crawlChildren(child, results, links) }
			else {
				child.icon = {
					url: child.image,
					height: 50,
					width: 50
				  }
				results.push(child)
				// setResults(results)
			}
		parent.icon = {
				url: parent.image,
				height: 50,
				width: 50
			  }
		results.push(parent)
		setResults(results)
		setLinks(links)
	})}	
}

	const [strategy, setStrategy] = useState([])
	const [results, setResults] = useState([]);
	const [links, setLinks] = useState([]);

	useEffect(() => {
		console.log('strategy changed', strategy)}, [strategy]
	)

	useEffect(() => {
		// setStrategy(MapStrategy(props))
		const thisResults = []
		const thisLinks = []
		const thisStrategy = MapStrategy(props).forEach(parent => { crawlChildren(parent, thisResults, thisLinks) });
		setStrategy(thisStrategy)
		setResults(thisResults)
		setLinks(thisLinks)
	}, [props]);

	const nodes = [...new Set(results)];
	const edges = [...new Set(links)];
	console.log('nodes',nodes)
	// console.log('edges',edges)
	console.log(props)
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
			<div>
				<Canvas
					// fit={true}
					// height={500}
					// width={"75%"}
					// maxWidth={"75%"}
    				maxHeight={700}
					nodes={nodes}
					edges={edges}
					node={
						<Node icon={<Icon />} />
					}
				/>
			</div>
		</div>
	);
};

const Archnemesis = (props) => {
	const display = props.display

	const defaultModifier = {
		"title":"mirror-image",
		"order":
			["mirror-image"]
	}

	// let initialJson = JSON.parse(JSON.stringify(defaultJson));
	const [archnemesis, setArchnemesis] = useState(initialJson);
	const [strategy, setStrategy] = useState(defaultModifier);

	function onModifier(event) {
		console.log(event.target.value)
		const thisStrategy = {
			'title': event.target.value,
			'order': [event.target.value]
		}
		// console.log(thisStrategy)
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
		<div className={`archnemesis page ${display}`}>
			<div className={`titleWrapper ${display}`}>
				<h1>Archnemesis Recipes</h1>
			</div>
			<div className="formGroup gemGroup">
				<select
				id="modName"
				className="formField"
				onChange={e => onModifier(e)}
				>
					<option value="Mirror Image" selected disabled hidden> 
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
	);
}

export default Archnemesis;
