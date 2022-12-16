import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import './style.css';

import PoeSyn from '../../assets/header/poe_syn.png';

// const ExpandMore = styled((props) => {
// 	const { expand, ...other } = props;
// 	return <IconButton variant="expand" {...other} />;
//   })(({ theme, expand }) => ({
// 	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
// 	margin: 'auto',
// 	transition: theme.transitions.create('transform', {
// 	  duration: theme.transitions.duration.shortest,
// 	}),
//   }));

const Home = () => {
	// const [expanded, setExpanded] = useState(false);
	// const handleExpandClick = () => {
	// 	setExpanded(!expanded);
	//   };
	
	const PageModuleButton = (props) => { 
		const variant = useMediaQuery('(min-width:650px)') ? 'home' : 'homeWide';
		return (
			<Button variant={variant}><a className="moduleLink" href={props.href}>{props.text}</a></Button>
		)
	}

	return (
		<div className="home page">
			<div className="homeWrapper">
				<Card variant="home">
					<div className="homeHeader" style={{backgroundImage:"url(/images/leaguelogo.png)"}}>
						<img src={PoeSyn} alt="poesyn" />
						<h1 className="homeTitle">poesyn.xyz</h1>
					</div>
					<div className="homeContent">
						<div className="subtext">
							<p >PoeSyn.xyz is a collection of tools to aide Exiles in their journeys through Wraeclast.</p>
							<p >Path of Exile's leagues feature complex mechanics and the tools below are designed to help navigate particularly burdensome ones.</p>
						</div>
						<div className="homeSection">
							<h2>Syndicate Cheatsheet 3.19</h2>
							<p>The Syndicate cheatsheet is updated for Path of Exile 3.19 and shows all Immortal Syndicate members and their safehouse rewards based on their location.</p>

							<p>The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell. Scarab are priced automaticall by default, though you can toggle them on the top to set manual values. Auto scarab rankings are updated every 6 hours from <a className="homeLink" href="https://poe.ninja">Poe Ninja</a>.</p>
							<p>An "overlay" version of the page can be found in the menu for use with tools like <a className="homeLink" href="https://github.com/PoE-Overlay-Community/PoE-Overlay-Community-Fork">POE-Overlay</a>.</p>
							{/* <Button variant="home"><a className="moduleLink" href="/syndicate">Syndicate Cheat Sheet</a></Button> */}
							<PageModuleButton href="/syndicate" text="Syndicate Cheat Sheet" />
						</div>
						<div className="homeSection">
							<h2>Chromatic Calculator</h2>
							<p>A port of <a href="https://siveran.github.io/calc.html">Siveran's Chromatic Calculator</a>, this tool allows you copy and paste an item from in-game or from the trade site to view the odds of obtaining certain socket colors given the item's requirements. </p>
							<p>Note: Item paste only supports items copied from the game or trade site as Path of Building does not provide attribute requirements on copy. If copying from game, please remember to remove all gems from the item as they will affect the reported requirements.</p>
							<PageModuleButton href="/chromatic" text="Chromatic Calculator" />
						</div>
						<div className="homeSection">
							<h2>Leveling Guide</h2>
							<p>This leveling guide utilizes Path of Building to import all of the required gems for your build and helps track when they are available. Additionally, all passive skill points and lab trial locations are noted to help ensure you do not miss and key items while leveling.</p>
							<PageModuleButton href="/passives" text="Leveling Guide" />
						</div>
						<div className="homeSection">
							<h4>Notice of Non-Affiliation</h4>
								<p>This site is fan-made and the creators are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Grinding Gear Games, or any of its subsidiaries or its affiliates.
								The official Path of Exile website can be found at <a className="homeLink" href="https://www.pathofexile.com">https://www.pathofexile.com</a>.
								The names Grinding Gear Games and Path of Exile as well as related names, marks, emblems and images found on this site are registered trademarks of their respective owners and the site owner does not claim ownership of any derivative works utilizing such items found on the site. The use of any trade name or trademark is for clarifying purposes only and does not imply any association with the trademark holder of their product brand.</p>
						</div>
						{/* <div className="homeSection">
							<h2>Change Log</h2>
							<ExpandMore
								expand={expanded}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon variant="expand"/>
							</ExpandMore>
							<Collapse in={expanded} timeout="auto" unmountOnExit>
								<ul>
									<h3>3.17 Siege of the Atlas</h3>
									<p>Caught up on changes related to the removal of Prophecy, Perandus and Sextants.</p>
									<h3>3.14 Ultimatum</h3>
									<p>Added a new color mode for better visibility for those with color blindness.</p>
									<h3>3.12 Heist</h3>
									<p>Added the ability to toggle Scarab pricing on the Syndicate Cheatsheet. If you don't want prices to be auto-fetched from POE Ninja, simply click the button up top to switch functionality.</p>
									<h3>3.11 Harvest</h3>
									<p>Added an overlay friendly version for use with tools like <a href="https://github.com/PoE-Overlay-Community/PoE-Overlay-Community-Fork">POE Overlay</a>. It is accessible from the main menu or the site map in the footer. To use with POE Overlay, open your setting and add a hotkey for opening an external site and use the url <a href="http://poesyn.xyz/syndicate-overlay">http://poesyn.xyz/syndicate-overlay</a>.</p>
									<h3>3.10 Delirium</h3>
									<p>Updated the Syndicate Cheat Sheet to reflect changes to member rewards. Added new skill gems.</p>
								</ul>
							</Collapse>
						</div> */}
					</div>
				</Card>				
			</div>
		</div>
	);
}

export default Home;