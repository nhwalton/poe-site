import { h, Component, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';

// const handleClick = (e, props) => {
// 	console.log(props.cellData)
// 	let newColor = (props.cellData.class == "row" ? "green" :
// 								(props.cellData.class == "green" ? "yellow" :
// 								(props.cellData.class == "yellow" ? "red" : "row"
// 								)))
// 	newClassName(newColor)
// 	// return(props.cellData.class)
// };

const RowCell = (props) => {
	let cellTitle = props.cellData.title
	let localClass = localStorage.getItem(cellTitle)
	
	if (localClass != null) {
		console.log(cellTitle, localClass)
		var useName = localClass
	} else {
		var useName = props.cellData.class
	}

	const [className, newClassName] = useState(useName);

	if (className != props.cellData.class && localClass == null) {
		newClassName(props.cellData.class)
	}

	// if (localStorage.getItem(cellTitle) != null) {
	// 	newClassName(localStorage.getItem(cellTitle))
	// }

	// if (className != localStorage.getItem(cellTitle) && localStorage.getItem(cellTitle) != null) {
	// 	newClassName(localStorage.getItem(cellTitle))
	// }

	const handleClick = () => {
		let newColor = (className == "row" ? "green" :
							(className == "green" ? "yellow" :
							(className == "yellow" ? "red" : "row"
							)))
		localStorage.setItem(cellTitle, newColor)
		props.cellData.class = newColor
		console.log(newColor)
		newClassName(newColor)};

    return (
		<div
			onClick = { () => handleClick(props) }
			data-title = {cellTitle}
			className = {style[className]}
					>
			<img
				style="max-width:100%;"
				src={'../../assets/syndicate/' + props.cellData.image + '.png'}
				/>
		</div>
    );
};

const TableRow = ({ row , rowName }) => {
	// console.log(rowName)
    return (
		<div class={style.rowWrapper}>
			{row.map(function(cell) {
				return(
				<RowCell cellData={cell} rowName={rowName}/>
				)
			}
			)
			}
		</div>
    );
};

const Syndicate = () => {

	let initialJson = JSON.parse(JSON.stringify(defaultJson));

	const [syndicate, setSyndicate] = useState(initialJson);

	// console.log(defaultJson.headers)

	const resetColors = () => {
		let resetJson = JSON.parse(JSON.stringify(defaultJson));
		setSyndicate(resetJson);
		localStorage.clear();
	}

	const getState = () => {
	}

	return (
		<div class={`${style.syndicate} page`}>
			{console.log("render body")}
			{console.log(syndicate)}
			<h1>Syndicate route</h1>
			<Button onClick={() => resetColors()}>Reset</Button>
			<Button onClick={() => getState()}>Check State</Button>
			<div>
				{Object.keys(syndicate).map(function(key) {
					return (
						<TableRow row={syndicate[key]} rowName={key}/>
						)
					}
				  )
				}
			</div>
		</div>
	);
}

export default Syndicate;
