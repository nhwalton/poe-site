import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { Alert, Box, Button, Card, Collapse, Drawer, FormControl, FormControlLabel, FormGroup, Switch, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import ReactGA from "react-ga";
import { Background } from "react-imgix";
import './style.css';
import defaultJson from './table.json';
import defaultJsonMastermind from './tableMastermind.json';

const RowCell = (props) => {
	let cellTitle = props.cellData.title;
	let localClass = localStorage.getItem(cellTitle);
	let scarabs = props.scarabs;
	let useName = "";
	let challenge = "";
	
	let useColor = 	(localStorage.getItem("accessibilityMode") === 'true') ? 'accessible' : 'default';
	
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
				action: props.cellData.title,
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

			localStorage.setItem(cellTitle, newColor)
			props.cellData.class = newColor
			newClassName(newColor);
		};
	};


	const CellText = () => {
		const styles = {
			cellInfo: {
				backgroundSize:'contain',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center top',
			}
		}
		const backgroundSource = (props.cellData.image.length === 0) ? '' : `https://poesynx.imgix.net/syndicate/${props.cellData.image}`;
		let cellClass = "cellInfo";
		let cellText = "";
		if (props.cellRow === "headers") {
			cellText = "cellText header";
		} else {
			cellText = "cellText";
		}
		return (
			<Background
				className={cellClass}
				src={backgroundSource}
				style={styles.cellInfo}
				imgixParams={{
					fit:"fill",
					fm:"webp",
				}}
				htmlAttributes={{
					style: {
						backgroundSize:'auto',
					}
				}}
				>
					<div className={cellText}>
						<p className="noSelect">{props.cellData.text}</p>
					</div>
			</Background>
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
	let mastermindJson = JSON.parse(JSON.stringify(defaultJsonMastermind));
	let initAccessibility = (localStorage.getItem("accessibilityMode") === 'true') ? true : false;
	let initMastermind = (localStorage.getItem("mastermindMode") === 'true') ? true : false;

	const [mastermindMode, setMastermindMode] = useState(initMastermind)
	const useJson = (mastermindMode === false) ? initialJson : mastermindJson;

	const [syndicate, setSyndicate] = useState(useJson);
	const [scarabs, setScarabs] = useState('');
	const [scarabPricing, setScarabPricing] = useState(true);
	const [accessibilityMode, setAccessibilityMode] = useState(initAccessibility);
	const [scarabError, setScarabError] = useState(false);

	if (accessibilityMode === null) {
		setAccessibilityMode(false)
		localStorage.setItem("accessibilityMode",false);
	}

	if (mastermindMode === null) {
		setMastermindMode(false)
		localStorage.setItem("mastermindMode",false);
	}

	const toggleAccessibility = () => {
		const currentMode = accessibilityMode
		if (currentMode === true) {
			setAccessibilityMode(false);
			localStorage.setItem("accessibilityMode",false)
		} else {
			setAccessibilityMode(true);
			localStorage.setItem("accessibilityMode",true)
		}
	}

	const toggleMastermind = () => {
		const currentMode = mastermindMode
		if (currentMode === true) {
			setMastermindMode(false);
			setSyndicate(initialJson);
			localStorage.setItem("mastermindMode",false)
		} else {
			setMastermindMode(true);
			setSyndicate(mastermindJson);
			localStorage.setItem("mastermindMode",true)
		}
	}

	// const [challenges, setChallenges] = useState(false);

	async function fetchScarabs(mastermindMode) {
		let scarab_type = mastermindMode ? "winged" : "gilded";
		const response = await fetch('/api/scarabs?tier=' + scarab_type);
		return response.json();
	};
	
	useEffect(() => {
		fetchScarabs(mastermindMode).then(result => {
			if (result !== 'Error') {
				setScarabs(result)
			}
			else {
				setScarabs('')
				setScarabPricing(false)
				if (localStorage.getItem("scarabPricing") !== 'false') {
					setScarabError(true)
					localStorage.setItem("scarabPricing", false)
					if (window.location.hostname !== 'localhost') {
					const eventDetails = {
						category: 'Error',
						action: 'Syndicate-Fetch-Scarabs',
						label: 'None',
					}
					ReactGA.event(eventDetails);
					}
				}
			}
		})
	}, [scarabPricing, mastermindMode]);

	useEffect(() => {
		const localScarab = JSON.parse(localStorage.getItem("scarabPricing"));
		
		if (localScarab !== null) {
			setScarabPricing(localScarab)
		}
		if (localScarab === true) {
			setScarabPricing(true)
		}
	}, []);

	function ResetColors() {
		const resetJson = useJson;
		setSyndicate(resetJson);
		const keyPrefix = (mastermindMode === true) ? "mastermind-" : "individual-";
		for (var key in localStorage) {
			console.log(keyPrefix, key, key.indexOf(keyPrefix));
			if (key.indexOf(keyPrefix) === 0) {
				localStorage.removeItem(key);
			}
		}
	}

	const toggleScarabs = () => {
		const currentToggle = scarabPricing
		if (currentToggle === true) {
			setScarabPricing(false);
			localStorage.setItem("scarabPricing", false)
		} else {
			setScarabPricing(true);
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

	const [settingsDrawer, setSettingsDrawer] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
		  event &&
		  event.type === 'keydown' &&
		  (event.key === 'Tab' || event.key === 'Shift')
		) {
		  return;
		}
	
		setSettingsDrawer({ ...settingsDrawer, [anchor]: open });
	  };

	const SettingsButton = () => {
		return(
			<React.Fragment>
				<a className="noDecoration" href="#additionalInfo">
					<Button className={`headerIcon ${display}`}>
						<HelpCenterRoundedIcon className="helpButton" fontSize="large"/>
					</Button>
				</a>
				<Button className="headerIcon" onClick={toggleDrawer('right', true, settingsDrawer, setSettingsDrawer)}>
					<SettingsIcon className="settingsIcon" fontSize="large"/>
				</Button>
			</React.Fragment>
		)
	}

	const TitleHeader = () => {
		const useTitle = useMediaQuery('(min-width:1500px)') ? 'Syndicate Cheat Sheet 3.17' : 'Syndicate Cheat Sheet';
		const title = <h1>{useTitle}</h1>
			return (
				title
			)
		}

	useEffect(() => {
		if (display !== "tiny") {
			const headerBarRight = document.getElementsByClassName('headerBarRight')[0]
			render(<SettingsButton />, headerBarRight)
		} else {
			const buttons = document.getElementsByClassName('buttons')[0]
			render(<SettingsButton />, buttons)
		}
	})
	
	let useColor = 	(localStorage.getItem("accessibilityMode") === 'true') ? 'accessible' : 'default';

	return (
		<div className={`syndicate page ${display}`}>
			<Drawer
				anchor={'right'}
				open={settingsDrawer['right']}
				onClose={toggleDrawer('right', false)}
				onOpen={toggleDrawer('right', true)}
				PaperProps={{
					sx: {
						backgroundColor: "#1a1a1a",
						color: "#e0e0e0",
						borderLeft: "2px solid var(--colorMain)",
						padding: "2em",
					}
					}}
			>
				<Box
					sx={{ width: "100%" }}
					role="presentation"
					// onClick={toggleDrawer('right', false)}
					onKeyDown={toggleDrawer('right', false)}
					variant="nav"
				>
					<div className="buttons">
						<Button variant="syn" onClick={() => ResetColors()}>Reset Rankings</Button>
						<hr />
						<FormControl component="fieldset" variant="standard">
							<FormGroup>
								<Collapse in={scarabError} sx={{width:"100%"}}>
									<Alert variant="scarabError" severity="error" onClose={() => {setScarabError(false);}}>Error fetching scarabs.</Alert>
								</Collapse>
								<FormControlLabel
									control={
										<Switch checked={scarabPricing} onChange={() => toggleScarabs()} name="toggleScarabs" />
									}
									label="Auto Price Scarabs"
								/>
								<FormControlLabel
									control={
										<Switch checked={mastermindMode} onChange={() => toggleMastermind()} name="toggleMastermind" />
									}
									label="Mastermind Rewards"
								/>
								<hr />
								<FormControlLabel
									control={
										<Switch checked={accessibilityMode} onChange={() => toggleAccessibility()} name="toggleAccessibility" />
									}
									label="Accessible Mode"
								/>
							</FormGroup>
						</FormControl>
					</div>
				</Box>
			</Drawer>
			<div className={`titleWrapper ${display}`}>
				<div className={`returnHome ${display}`}>
					<Button variant="syn"><a href="/">Return to Main Site</a></Button>
				</div>
				<TitleHeader />
				<div className="buttons">
					{/* <Button onClick={() => toggleChallenges()}>Challenges</Button> */}
					{/* <Button variant="syn" onClick={() => toggleMastermind()}>Safehouse: {mastermindMode}</Button>
					<Button variant="syn" onClick={() => toggleScarabs()}>Scarab Scoring: {scarabButton}</Button>
					<Button variant="syn" onClick={() => ResetColors()}>Reset</Button> */}
					{/* <Collapse in={scarabError} sx={{width:"100%"}}>
						<Alert variant="scarabError" severity="error" onClose={() => {setScarabError(false);}}>Failed to scarab fetch pricing.</Alert>
					</Collapse> */}
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
					<h2 id="additionalInfo">Additional Info</h2>
				</div>
				<Card variant="infoVariant">
					{/* <div className="info"> */}
					<p>The above table is a customizable Syndicate Cheat Sheet for the Betrayal league mechanic in POE 3.17. When in individual mode, it shows the possible rewards for running a Syndicate safehouse (Transportation, Fortification, Research and Intervention) with a given member in that safehouse.</p>
					<p>For example, when running an Intervention safehouse while Cameria is present, one of the safehouse reward chests will contain Sulphite Scarabs. Each Syndicate member has tiers of rewards based on their rank: Sergeant, Lieutenant, or Captain. The default color associated with each member assumes they are ran at their highest rank (Captain) as certain members are less valuable at lower ranks. When you run their safehouse, there is a potential fourth tier achievable if the Mastermind is run while a member is Captain (Rank 3). For a more detailed list of rewards, visit the <a href="https://pathofexile.gamepedia.com/Immortal_Syndicate">Path of Exile Wiki</a>. </p>
					<p>The Mastermind mode is meant for more advanced use cases and represents the relative value of selling/trading your Syndicate member's rewards/crafts. For more information on this use case and how to maximize profit, check out <a href="https://www.youtube.com/watch?v=u9EodNVlf6Q">Daykun's 3.17 Youtube Guide</a>.</p>
					<p>Starting cell colors are based around Softcore Trade League and you can change the color of any reward by simply clicking on it's cell. It is important to note that the default ratings are only a starting point and each player will value certain combinations over others. Some of the default values are based on worth to the player OR the relative worth when selling the member's rewards to other players. With this in mind, Solo Self Found and Hardcore players will find less value in certain rewards due to not being in Softcore Trade League.</p>
					<p>A common, low effort strategy for making chaos from Syndicate is to only run Research and Intervention to sell scarabs. If you are looking for the easiest setup to sell rewards, the Auto Priced Scarab feature (on by default) will be useful as it checks current scarab pricing and rates them based on price with the top three most expensive being green, the next three yellow, and the rest gray. Again, because we are assuming each member is rank Captain, the pricing only takes Gilded Scarabs into account. </p>
					
					{/* </div> */}
				</Card>
			</div>
		</div>
	);
}

export default Syndicate;
