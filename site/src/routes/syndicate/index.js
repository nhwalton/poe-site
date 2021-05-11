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

const RowCell = (props) => {
	let cellTitle = props.cellData.title;
	let localClass = localStorage.getItem("syn-".concat(cellTitle));
	let scarabs = props.scarabs;
	let useName;
	let challenge = "";

	let useColor = localStorage.getItem("currentColor")

	if (props.cellData.challenge && props.challenges == true) {
		challenge = "challenge"
	}

	if (localClass != null && (props.cellData.scarab != true || (props.cellData.scarab == true && props.useScarabPricing != true))) {
		// console.log(cellTitle, "using Local Class")
		useName = localClass
	} else if (scarabs != '' && props.cellData.scarab == true && props.useScarabPricing == true) {
		// console.log(cellTitle, "using pricing class")
		let index = scarabs.findIndex(element => element.name == props.cellData.text)
		useName = scarabs[index].color
	} else {
		// console.log(cellTitle, "using json class")
		useName = props.cellData.class
	}

	const [className, newClassName] = useState(useName);

	const ifMounted = useIfMounted();

	newClassName(useName);
	// if (className != props.cellData.class && localClass != null && props.useScarabPricing != true) {
	// 	console.log("if", cellTitle, useName)
	// 	newClassName(useName)
	// } else if (props.useScarabPricing == true) {
	// 	console.log("else", cellTitle, useName)
	// 	newClassName(useName)
	// }

	const handleClick = () => {
		if ((className != "start" && props.cellData.scarab != true) || (props.cellData.scarab == true && props.useScarabPricing != true)) {
			// console.log(props.cellData.scarab, props.useScarabPricing)
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
			className = {`${style[className]} ${style[useColor]} ${style.cellRatioBox} ${style[challenge]}`}
			>
			<div class={style.cellRatioBoxInside}>
				<div class={style.cellCentering}>
					<CellText />
				</div>
			</div>
			
		</div>
    );
};

const TableRow = (props) => {
    return (
		<div class={style.rowWrapper}>
			{props.row.map(function(cell) {
				return(
				<RowCell cellData={cell} cellRow={props.rowName} scarabs={props.scarabs} challenges={props.challenges}  useScarabPricing={props.useScarabPricing}/>
				)
			})}
		</div>
    );
};

const Syndicate = (props) => {

	const display = props.display

	let initialJson = JSON.parse(JSON.stringify(defaultJson));
	const [syndicate, setSyndicate] = useState(initialJson);

	const ifMounted = useIfMounted();

	const [scarabs, setScarabs] = useState('');

	const [scarabPricing, setScarabPricing] = useState(true);

	const [scarabButton, setScarabButton] = useState("Auto Scarabs")

	let initColor = localStorage.getItem("currentColor");

	const [useColor, setUseColor] = useState(initColor)

	if (useColor == null) {
		setUseColor('default')
		localStorage.setItem("currentColor",'default');
	}

	const cycleColor = () => {
		const currentToggle = useColor
		const colorOptions = ['default','accessible']
		const isThisColor = (color) => color == currentToggle;
		const toggleIndex = colorOptions.findIndex(isThisColor)
		// console.log("color state was:",currentToggle)
		if (toggleIndex == (colorOptions.length - 1)) {
			const newColor = colorOptions[0]
			setUseColor(newColor);
			localStorage.setItem("currentColor", newColor)
			// console.log("new color state is:",newColor)
		} else {
			const newIndex = toggleIndex + 1
			const newColor = colorOptions[newIndex]
			setUseColor(newColor);
			localStorage.setItem("currentColor", newColor)
			// console.log("new color state is:",newColor)
		}
	}

	// const [challenges, setChallenges] = useState(false);

	async function fetchScarabs() {
		const response = await fetch('/api/scarabs');
		return response.json();
	};
	
	useEffect(() => {
		fetchScarabs().then(result => setScarabs(result))
	}, []);

	useEffect(() => {
		const localScarab = JSON.parse(localStorage.getItem("scarabPricing"));
		
		if (localScarab != null) {
			console.log("localScarab",localScarab)
			setScarabPricing(localScarab)
		}
		if (localScarab == true) {
			setScarabPricing(true)
			setScarabButton("Auto Scarabs")
		} else {
			setScarabButton("Manual Scarabs")
		}
	}, []);

	const resetColors = () => {
		let resetJson = JSON.parse(JSON.stringify(defaultJson));
		ifMounted(() => setSyndicate(resetJson));
		for (var key in localStorage) {
			if (key.indexOf("syn") == 0) {
				console.log(key)
				localStorage.removeItem(key);
			}
		}
		// localStorage.clear();
	}

	const toggleScarabs = () => {
		const currentToggle = scarabPricing
		console.log("scarab unlock state was:",scarabPricing)
		if (currentToggle == true) {
			setScarabPricing(false);
			setScarabButton("Manual Scarabs")
			localStorage.setItem("scarabPricing", false)
		} else {
			setScarabPricing(true);
			setScarabButton("Auto Scarabs")
			localStorage.setItem("scarabPricing", true)
		}
	}

	// const toggleChallenges = () => {
	// 	const currentToggle = challenges
	// 	if (currentToggle == true) {
	// 		setChallenges(false);
	// 	} else {
	// 		setChallenges(true);
	// 	}
	// }

	let toggleDiv = `${style.additionalInfo}`
	if (display == "tiny") {
		console.log(true)
		toggleDiv = `${style.additionalInfo} ${style.tiny}`
	}

	return (
		<div class={`${style.syndicate} page ${display}`}>
			<div class={`titleWrapper ${display}`}>
				<h1>Syndicate Cheat Sheet 3.14</h1>
				<div class={style.buttons}>
					{/* <Button raised ripped onClick={() => toggleChallenges()}>Challenges</Button> */}
					<Button raised ripped onClick={() => cycleColor()}>Color Mode</Button>
					<Button raised ripped onClick={() => toggleScarabs()}>{scarabButton}</Button>
					<Button raised ripple onClick={() => resetColors()}>Reset</Button>
				</div>
			</div>
			<div class={style.tableCenter}>
				<div class={style.tableWrapper}>
					{Object.keys(syndicate).map(function(key) {
						return (
							// <TableRow row={syndicate[key]} rowName={key} scarabs={scarabs} challenges={challenges}/>
							<TableRow row={syndicate[key]} rowName={key} scarabs={scarabs} useScarabPricing={scarabPricing}/>
							)
						}
					)
					}
				</div>
			</div>
			<div class={toggleDiv}>
				<div class={`titleWrapper ${display}`}>
					<h1>Color Ratings - Relative Return</h1>
				</div>
				<div class={`${style.colorGuide}`}>
						<div className = {`${style.green} ${style.legend} ${style[useColor]}`}>
							<div className = {`${style.legendText}`}>
								Great
							</div>
						</div>
						<div className = {`${style.yellow} ${style.legend} ${style[useColor]}`}>
						<div className = {`${style.legendText}`}>
								Good
							</div>
						</div>
						<div className = {`${style.gray} ${style.legend} ${style[useColor]}`}>
						<div className = {`${style.legendText}`}>
								Okay
							</div>
						</div>
						<div className = {`${style.red} ${style.legend} ${style[useColor]}`}>
						<div className = {`${style.legendText}`}>
								Poor
							</div>
						</div>
					</div>
				<div class={`titleWrapper ${display}`}>
					<h1>Additional Info</h1>
				</div>
				<div class={style.info}>
				<p>The above table is a customizable Syndicate Cheat Sheet for POE 3.14 and shows the possible rewards for running a Syndicate safehouse (Transportation, Fortification, Research and Intervention) with a given member in a certain safehouse. For example, when running an Intervention safehouse while Cameria is present, one of the safehouse reward chests will contain Sulphite Scarabs. Each Syndicate member has tiers of rewards based on their rank -- Sergeant, Lieutenant, or Captain -- when you run their safehouse, though there is a fourth tier achievable if the Mastermind is run while a member is Captain. The default color associated with each member assumes they are ran at their highest rank (Captain) as certain members are less valuable at lower ranks. For a more detailed list of rewards, visit the <a href="https://pathofexile.gamepedia.com/Immortal_Syndicate">Path of Exile Wiki</a>. </p>
				<p>Starting cell colors are based around Softcore Trade League and you can change the color of any reward by simply clicking on it's cell. It is important to note that the default ratings are only a starting point and each player will value certain combinations over others. Some of the default values are based on worth to the player OR the relative worth when selling the member's crafting bench to other players. With this in mind, Solo Self Found and Hardcore players will find less value in certain rewards due to not being in Softcore Trade League.</p>
				<p>A common strategy for making chaos from Syndicate is to only run Research and Intervention. If you are looking for the easiest setup to sell rewards, the Auto Priced Scarab feature will be useful as it checks current scarab pricing and rates them based on price with the top three most expensive being green, the next three yellow, and the rest gray. Again, because we are assuming each member is rank Captain, the pricing only takes Gilded Scarabs into account. </p>
				</div>
			</div>
		</div>
	);
}

export default Syndicate;
