import { h, Component, createRef, useState, useEffect } from 'react';
import { Canvas } from 'reaflow';

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
		// <div>
		// 	<Canvas
		// 		nodes={nodes}
		// 		edges={edges}
		// 	/>
		// </div>
		<div>
            {recipe.map( modifier => {
                return (
                    <div>{modifier}</div>
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
	
	const strategy = []
	
	function GetRecipe(recipeItem, parentObject) {
		let recipeLength = initialJson['modifiers'][recipeItem]['recipe'].length
		// const id = useEffect(() => Counter(), [])
		let modObject = {
			'text': recipeItem,
			'children': []
			// 'id': id
		}
		if (recipeLength > 0) {
			parentObject['children'].push(modObject)
			initialJson['modifiers'][recipeItem]['recipe'].map( recipeItem => {
				GetRecipe(recipeItem, modObject)
			})
		} else {
			// delete modObject['children']
			parentObject['children'].push(modObject)
		}
	}

	let id = 0
	props.strategy['order'].map( modifier => {
		// const id = Counter()
		id += 1
		const recipe = initialJson['modifiers'][modifier]['recipe']
		const title = initialJson['modifiers'][modifier]['title']
		let parentObject = {
			'text': title,
			'children': [],
			'id': id
		}
	
		let modList = []
		recipe.map(function(recipeItem) {
			GetRecipe(recipeItem, parentObject)
		})
		modList.push(parentObject)
		strategy.push(modList)
	})

	function flatten(arr) {
		return arr.reduce(function (flat, toFlatten) {
			return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
		}, []);
	};

	function Flatten(arr) {
		console.log(arr)
		arr.forEach(parent => {
			const parentId = parent.id
			results.push(parent)
			if (Array.isArray) {parent.children.forEach( child => {
				id += 1
				child.id = id
				child.parentId = parentId
				const edge = {}
				edge.id = `${parentId}-${id}`
				edge.from = parentId
				edge.to = id
				edges.push(edge)
				results.push(child)
				if (Array.isArray(child.children)) { Flatten(child.children) }
			})}
		})
	}

	const results = [];
	const edges = [];
	
	useEffect(() => {
		const flattened = flatten(strategy)
		Flatten(flattened)
	}, []);

	console.log(results)
	console.log(edges)

	const nodes = results;

	return (
		<div>
			<h2>{props.strategy['title']}</h2>
			<div className="recipe">
				{props.strategy['order'].map( modifier => {
					return (
						<div>
							<StrategyModifier modifier={modifier}/>
						</div>
						);
					}
				)
				}
			</div>
		</div>
	);
};

const Archnemesis = (props) => {
	const display = props.display

	// let initialJson = JSON.parse(JSON.stringify(defaultJson));
	const [archnemesis, setArchnemesis] = useState(initialJson);
	return (
		<div className={`archnemesis page ${display}`}>
			<div className={`titleWrapper ${display}`}>
				<h1>Archnemesis Recipes</h1>
			</div>
			<div>
				<div>
					{Object.keys(initialJson['strategies']).map(function(key) {
						return (
							<StrategyCard strategy={initialJson['strategies'][key]}/>
								// <h2>{initialJson['strategies'][key]['title']}</h2>
							);
						}
					)
					}
				</div>
			</div>
		</div>
	);
}

export default Archnemesis;
