import { h, Component, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import analytics from '../../components/analytics';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';
import useIfMounted from '../../components/ifMounted';

const RowCell = (props) => {
	let cellTitle = props.cellData.title
	let localClass = localStorage.getItem("syn-".concat(cellTitle))
	let scarabs = props.scarabs
	let useName;

	if (localClass != null) {
		useName = localClass
	} else if (scarabs != '' && props.cellData.class == "scarab") {
		let index = scarabs.findIndex(element => element.name == props.cellData.text)
		useName = scarabs[index].color
	} else {
		useName = props.cellData.class
	}
	const [className, newClassName] = useState(useName);

	const ifMounted = useIfMounted();

	if (className != props.cellData.class && localClass == null && props.cellData.class != "scarab") {
		newClassName(props.cellData.class)
	}

	if (className == "scarab") {
		newClassName(useName)
	}

	const handleClick = () => {
		if (className != "start" && props.cellData.class != "scarab") {
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
			ifMounted(() => newClassName(newColor));
		};
	};

	const CellText = () => {
		let cellClass;
		let cellText;
		let cellStyle;
		if (props.cellData.image.length == 0) {
			cellClass = `${style.cellInfo} ${style.cellCentered}`
			cellStyle = ''
		} else {
			cellClass = style.cellInfo
			cellStyle = `background-image:url("../../assets/syndicate/${props.cellData.image}.png")`
		}
		if (props.cellRow == "headers") {
			cellText = `${style.cellText} ${style.header}`
		} else {
			cellText = style.cellText
		}
		return (
			<div class={cellClass} style={cellStyle}>
				<div class={cellText}>
					<p class={style.noSelect}>{props.cellData.text}</p>
				</div>
			</div>
			);
	}

    return (
		<div
			onClick = { () => handleClick(props) }
			data-title = {cellTitle}
			className = {`${style[className]} ${style.cellRatioBox}`}
			>
			<div class={style.cellRatioBoxInside}>
				<div class={style.cellCentering}>
					<CellText />
				</div>
			</div>
			
		</div>
    );
};

const TableRow = ({ row , rowName, scarabs }) => {
    return (
		<div class={style.rowWrapper}>
			{row.map(function(cell) {
				return(
				<RowCell cellData={cell} cellRow={rowName} scarabs={scarabs}/>
				)
			})}
		</div>
    );
};

const Syndicate = () => {

	let initialJson = JSON.parse(JSON.stringify(defaultJson));
	const [syndicate, setSyndicate] = useState(initialJson);

	const ifMounted = useIfMounted();

	const [scarabs, setScarabs] = useState('');

	async function fetchScarabs() {
		const response = await fetch('/api/scarabs');
		return response.json();
	};
	
	useEffect(() => {
		fetchScarabs().then(result => setScarabs(result))
	}, []);

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
			<div class={style.tableCenter}>
				<div class={style.tableWrapper}>
					{Object.keys(syndicate).map(function(key) {
						return (
							<TableRow row={syndicate[key]} rowName={key} scarabs={scarabs}/>
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
