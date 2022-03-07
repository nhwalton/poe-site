import { Button, Card, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactGA from "react-ga";
import './style.css';
import defaultJson from './table.json';

const RowCell = (props) => {
	let cellTitle = props.cellData.title;
	let localClass = localStorage.getItem("syn-".concat(cellTitle));
	let scarabs = props.scarabs;
	let useName = "";
	let challenge = "";
	
	let useColor = localStorage.getItem("currentColor")
	
	if (props.cellData.challenge && props.challenges === true) {
		challenge = "challenge"
	}
	
	if (localClass !== null && (props.cellData.scarab !== true || (props.cellData.scarab === true && props.useScarabPricing !== true))) {
		useName = localClass
	} else if (scarabs !== '' && props.cellData.scarab === true && props.useScarabPricing === true) {
		let index = scarabs.findIndex(element => element.name === props.cellData.text)
		useName = scarabs[index].color
	} else {
		useName = props.cellData.class
	}

	const hostName = window.location.hostname

	useEffect(() => {
		if (useName !== props.cellData.class && props.cellData.scarab !== true && hostName !== 'localhost') {
			const eventDetails = {
				category: 'Syndicate',
				action: props.cellData.title.substr(1),
				label: useName,
			}
			ReactGA.event(eventDetails);
		}
	});

	const [className, newClassName] = useState(useName);
	useEffect(() => { newClassName(useName) }, [useName])

	function HandleClick() {
		if ((className !== "start" && props.cellData.scarab !== true) || (props.cellData.scarab === true && props.useScarabPricing !== true)) {
			let newColor = (className === "gray" ? "green" :
								(className === "green" ? "yellow" :
								(className === "yellow" ? "red" : "gray"
								)))
			if (newColor !== "") {};

			localStorage.setItem("syn-".concat(cellTitle), newColor)
			props.cellData.class = newColor
			newClassName(newColor);
		};
	};


	const CellText = () => {
		const styles = {
			cellInfo: {
				backgroundImage: `url(/images/syndicate/${props.cellData.image}.png)`
			}
		}
		let cellClass = "";
		let cellText = "";
		// let cellStyle = "";
		if (props.cellData.image.length === 0) {
			cellClass = "cellInfo cellCentered";
			styles.cellInfo.backgroundImage = ""
		} else {
			cellClass = "cellInfo";
			styles.cellInfo.backgroundImage = `url(/images/syndicate/${props.cellData.image}.png)`
		}
		if (props.cellRow === "headers") {
			cellText = "cellText header";
		} else {
			cellText = "cellText";
		}
		return (
			<div className={cellClass} style={styles.cellInfo}>
				<div className={cellText}>
					<p className="noSelect">{props.cellData.text}</p>
				</div>
			</div>
			);
	}
    return (
		<div
			onClick = { () => HandleClick(props) }
			data-title = {cellTitle}
			className={`${className} ${useColor} cellRatioBox ${challenge}`}
			>
			<div className="cellRatioBoxInside">
				<div className="cellCentering">
					<CellText />
				</div>
			</div>
		</div>
    );
};

const TableRow = (props) => {
    return (
		<div className="rowWrapper">
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
	const [scarabs, setScarabs] = useState('');
	const [scarabPricing, setScarabPricing] = useState(true);
	const [scarabButton, setScarabButton] = useState("Auto Scarabs")

	let initColor = localStorage.getItem("currentColor");

	const [useColor, setUseColor] = useState(initColor)

	if (useColor === null) {
		setUseColor('default')
		localStorage.setItem("currentColor",'default');
	}

	const cycleColor = () => {
		const currentToggle = useColor
		const colorOptions = ['default','accessible']
		const isThisColor = (color) => color === currentToggle;
		const toggleIndex = colorOptions.findIndex(isThisColor)
		if (toggleIndex === (colorOptions.length - 1)) {
			const newColor = colorOptions[0]
			setUseColor(newColor);
			localStorage.setItem("currentColor", newColor)
		} else {
			const newIndex = toggleIndex + 1
			const newColor = colorOptions[newIndex]
			setUseColor(newColor);
			localStorage.setItem("currentColor", newColor)
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
		
		if (localScarab !== null) {
			setScarabPricing(localScarab)
		}
		if (localScarab === true) {
			setScarabPricing(true)
			setScarabButton("Auto")
		} else {
			setScarabButton("Manual")
		}
	}, []);

	function ResetColors() {
		const resetJson = JSON.parse(JSON.stringify(defaultJson));
		setSyndicate(resetJson);
		for (var key in localStorage) {
			if (key.indexOf("syn") === 0) {
				localStorage.removeItem(key);
			}
		}
	}

	const toggleScarabs = () => {
		const currentToggle = scarabPricing
		if (currentToggle === true) {
			setScarabPricing(false);
			setScarabButton("Manual")
			localStorage.setItem("scarabPricing", false)
		} else {
			setScarabPricing(true);
			setScarabButton("Auto")
			localStorage.setItem("scarabPricing", true)
		}
	}

	// const toggleChallenges = () => {
	// 	const currentToggle = challenges
	// 	if (currentToggle === true) {
	// 		setChallenges(false);
	// 	} else {
	// 		setChallenges(true);
	// 	}
	// }

	let toggleDiv = "additionalInfo"
	if (display === "tiny") {
		toggleDiv = "additionalInfo tiny"
	}

	const TitleHeader = () => {
		const useTitle = useMediaQuery('(min-width:1500px)') ? 'Syndicate Cheat Sheet 3.17' : 'Syndicate Cheat Sheet';
		const title = <h1>{useTitle}</h1>
			return (
				title
			)
		}

	const infoVariant = useMediaQuery('(min-width:950px)') ? 'syn' : 'synNarrow';

	return (
		<div className={`syndicate page ${display}`}>
			<div className={`titleWrapper ${display}`}>
				<div className={`returnHome ${display}`}>
					<Button variant="syn"><a href="/">Return to Main Site</a></Button>
				</div>
				<TitleHeader />
				<div className="buttons">
					{/* <Button onClick={() => toggleChallenges()}>Challenges</Button> */}
					<Button variant="syn" onClick={() => cycleColor()}>Color Mode: {useColor}</Button>
					<Button variant="syn" onClick={() => toggleScarabs()}>Scarab Scoring: {scarabButton}</Button>
					<Button variant="syn" onClick={() => ResetColors()}>Reset</Button>
				</div>
			</div>
			<div className="tableCenter">
				<div className="tableWrapper syndicate">
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
			<div className={toggleDiv}>
				<div className={`${display}`}>
					<h2>Color Ratings - Relative Return</h2>
				</div>
				<div className="colorGuide">
						<div className={`${useColor} green legend`}>
							<div className="legendText">
								Great
							</div>
						</div>
						<div className={`${useColor} yellow legend`}>
							<div className="legendText">
								Good
							</div>
						</div>
						<div className={`${useColor} gray legend`}>
							<div className="lengendText">
								Okay
							</div>
						</div>
						<div className={`${useColor} red legend`}>
							<div className="lengendText">
								Poor
							</div>
						</div>
					</div>
				<div className={`${display}`}>
					<h2>Additional Info</h2>
				</div>
				<Card variant="infoVariant">
					{/* <div className="info"> */}
					<p>The above table is a customizable Syndicate Cheat Sheet for POE 3.17 and shows the possible rewards for running a Syndicate safehouse (Transportation, Fortification, Research and Intervention) with a given member in a certain safehouse. For example, when running an Intervention safehouse while Cameria is present, one of the safehouse reward chests will contain Sulphite Scarabs. Each Syndicate member has tiers of rewards based on their rank -- Sergeant, Lieutenant, or Captain -- when you run their safehouse, though there is a fourth tier achievable if the Mastermind is run while a member is Captain. The default color associated with each member assumes they are ran at their highest rank (Captain) as certain members are less valuable at lower ranks. For a more detailed list of rewards, visit the <a href="https://pathofexile.gamepedia.com/Immortal_Syndicate">Path of Exile Wiki</a>. </p>
					<p>Starting cell colors are based around Softcore Trade League and you can change the color of any reward by simply clicking on it's cell. It is important to note that the default ratings are only a starting point and each player will value certain combinations over others. Some of the default values are based on worth to the player OR the relative worth when selling the member's crafting bench to other players. With this in mind, Solo Self Found and Hardcore players will find less value in certain rewards due to not being in Softcore Trade League.</p>
					<p>A common strategy for making chaos from Syndicate is to only run Research and Intervention. If you are looking for the easiest setup to sell rewards, the Auto Priced Scarab feature will be useful as it checks current scarab pricing and rates them based on price with the top three most expensive being green, the next three yellow, and the rest gray. Again, because we are assuming each member is rank Captain, the pricing only takes Gilded Scarabs into account. </p>
					{/* </div> */}
				</Card>
			</div>
		</div>
	);
}

export default Syndicate;
