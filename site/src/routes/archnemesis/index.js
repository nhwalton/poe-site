import { h, Component, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Canvas } from 'reaflow';

import analytics from '../../components/analytics';

import Button from 'preact-material-components/Button';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';
import useIfMounted from '../../components/ifMounted';

console.clear();

const nodes = [
	{
	  id: '1',
	  text: '1'
	},
	{
	  id: '2',
	  text: '2'
	}
  ];
  
const edges = [
	{
		id: '1-2',
		from: '1',
		to: '2'
	}
	];

const initialJson = JSON.parse(JSON.stringify(defaultJson));

const ModifierRecipe = (props) => {
	const modifier = props.modifier
	const recipe = props.recipe
	
	let parentObject = {
		'tier': 0,
		'title': modifier['title'],
		'children': []
	}

	let modList = []
	
	console.log(parentObject)

	const getRecipe = function(modifier, parentObject) {
		let recipeLength = initialJson['modifiers'][modifier]['recipe'].length
		let modObject = {
			'title': modifier,
			'tier': parentObject['tier'] + 1,
			'children': []
		}
		if (recipeLength > 0) {
			parentObject['children'].push(modObject)
			initialJson['modifiers'][modifier]['recipe'].map( modifier => {
				getRecipe(modifier, modObject)
			})
		} else {
			delete modObject['children']
			parentObject['children'].push(modObject)
		}
	}
	
	recipe.map(function(modifier) {
		getRecipe(modifier, parentObject)
	})
	
	modList.push(parentObject)
	console.log(modList)

	return (
		<div>
			<Canvas
				nodes={nodes}
				edges={edges}
			/>
		</div>
	);
};

const StrategyModifier = (props) => {
	const modifier = initialJson['modifiers'][props.modifier]
	// console.log(modifier)
	// console.log(props.modifier)
	// console.log(initialJson['modifiers'][props.modifier], 'modifier')
	return (
		<div className={`${style.strategyModifier}`}>
			<img src={modifier['image']}></img>
			<span>{modifier['title']}</span>
			<ModifierRecipe recipe={modifier['recipe']} modifier={modifier}/>
		</div>
	);
};

const StrategyCard = (props) => {
	// console.log(props, 'props')
	// console.log(props.strategy, 'props.strategy')
	return (
		<div>
			<h2>{props.strategy['title']}</h2>
			<div className={`${style.recipe}`}>
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
		<div class={`${style.archnemesis} page ${display}`}>
			<div class={`titleWrapper ${display}`}>
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
