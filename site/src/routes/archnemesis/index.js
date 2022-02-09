import { h, Component, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import analytics from '../../components/analytics';

import Button from 'preact-material-components/Button';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';
import useIfMounted from '../../components/ifMounted';

const initialJson = JSON.parse(JSON.stringify(defaultJson));

const ModifierRecipe = (props) => {
	const modifier = props.modifier
	const modifiers = props.modifiers
	const baseModifiers = []
	const recipeModifiers = []
	// console.log(baseModifiers, 'baseModifiers')
	// console.log(modifiers, 'modifiers')

	console.log(modifier['title'])

	const getRecipe = function(modifier) {
		let recipeLength = initialJson['modifiers'][modifier]['recipe'].length
		if (recipeLength > 0) {
			console.log('****getting sub recipe for', modifier)
			recipeModifiers.push(modifier)
			initialJson['modifiers'][modifier]['recipe'].map( modifier => {
				getRecipe(modifier)
			})
		} else {
			console.log('******got base modifier', modifier)
			baseModifiers.push(modifier)
		}
	}

	modifiers.map(function(modifier) {
		console.log('**getting recipe for', modifier)
		getRecipe(modifier)
	})
	
	// modifiers.map(modifier => {
	// 	baseModifiers.push(getRecipe(modifier))
	// }

	console.log('Recipes', recipeModifiers)
	console.log('Base Modifiers', baseModifiers)
	console.log('*****')

	return (
		<div>
			{baseModifiers.map( modifier => {
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
	// console.log(modifier)
	// console.log(props.modifier)
	// console.log(initialJson['modifiers'][props.modifier], 'modifier')
	return (
		<div className={`${style.strategyModifier}`}>
			<img src={modifier['image']}></img>
			<span>{modifier['title']}</span>
			<ModifierRecipe modifiers={modifier['recipe']} modifier={modifier}/>
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
