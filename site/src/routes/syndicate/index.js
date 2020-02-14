import { h, Component, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import analytics from '../../components/analytics'

import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';
import useIfMounted from '../../components/ifMounted';

const RowCell = (props) => {
	let cellTitle = props.cellData.title
	let localClass = localStorage.getItem("syn-".concat(cellTitle))
	
	if (localClass != null) {
		// console.log(cellTitle, localClass)
		var useName = localClass
	} else {
		var useName = props.cellData.class
	}

	const [className, newClassName] = useState(useName);

	const ifMounted = useIfMounted();

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
		let newColor = (className == "gray" ? "green" :
							(className == "green" ? "yellow" :
							(className == "yellow" ? "red" : "gray"
							)))
		if (newColor != "") {
			analytics.track('syn', {
				category: cellTitle,
				label: newColor,
				value: ''
			})
			};

		localStorage.setItem("syn-".concat(cellTitle), newColor)
		props.cellData.class = newColor
		// console.log(newColor)
		ifMounted(() => newClassName(newColor));
	}

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

	const ifMounted = useIfMounted();

	const resetColors = () => {
		let resetJson = JSON.parse(JSON.stringify(defaultJson));
		ifMounted(() => setSyndicate(resetJson));
		for (var key in localStorage) {
			if (key.indexOf("syn") == 0) {
				localStorage.removeItem(key);
				console.log("removed ", key)
			}
		}
		localStorage.clear();
	}

	return (
		<div class={`${style.syndicate} page`}>
			<div class="titleWrapper">
				<h1>Syndicate Cheat Sheet</h1>
				<div>
					<Button raised ripple onClick={() => resetColors()}>Reset</Button>
				</div>
			</div>
			<div class={style.tableWrapper}>
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
		</div>
	);
}

export default Syndicate;
