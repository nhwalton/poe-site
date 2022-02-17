import { Component, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
// import '@mui/material/Card/style.css';
// import '@mui/material/Button/style.css';
import './style.css';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton variant="expand" {...other} />;
  })(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	margin: 'auto',
	transition: theme.transitions.create('transform', {
	  duration: theme.transitions.duration.shortest,
	}),
  }));

const Home = () => {
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	  };

	return (
		<div className="home page">
			<div className="homeWrapper">
				<Card variant="home">
					<div className="titleWrapper">
					</div>
						<h1 className="homeTitle">poesyn.xyz</h1>
					<div className="subtext">
							<p >PoeSyn.xyz is a collection of tools to aide Exiles in their journeys through Wraeclast.</p>
							<p >Path of Exile's leagues feature complex mechanics and the tools below are designed to help navigate particularly burdensome ones.</p>
					</div>
					<div className="homeSection">
						<h2>Syndicate Cheatsheet 3.17</h2>
						<p>The Syndicate cheatsheet is updated for Path of Exile 3.17 and shows all Immortal Syndicate members and their safehouse rewards based on their location.</p>

						<p>The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell. Scarab are priced automaticall by default, though you can toggle them on the top to set manual values. Auto scarab rankings are updated every 6 hours from <a className="homeLink" href="https://poe.ninja">Poe Ninja</a>.</p>
						<Button variant="home"><a className="moduleLink" href="/syndicate">Syndicate Cheat Sheet</a></Button>
					</div>
					<div className="homeSection">
						<h2>Archnemesis Recipes</h2>
						<p>The Archnemesis Recipes display all craftable modifier recipes including sub-recipes required for complex modifiers.</p>
						
						<p>A fullscreen mode is available for navigating the tree of larger recipes and each item can be collapsed to remove it from view.</p>
						
						<p>Note: This page was designed for desktop use only and will not work well on mobile devices.</p>
						<Button variant="home"><a className="moduleLink" href="/archnemesis">Archnemesis Recipes</a></Button>
					</div>
					<div className="homeSection">
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
					</div>
				</Card>
				<Card variant="home">
				</Card>
				
			</div>
		</div>
	);
}

export default Home;

// export default class Home extends Component {
// 	render() {

// 		const [expanded, setExpanded] = useState(false);
// 		const handleExpandClick = () => {
// 			setExpanded(!expanded);
// 		  };

// 		return (
// 			<div className="home page">
// 				<div className="titleWrapper">
// 					<h1 className="homeTitle">poesyn.xyz</h1>
// 				</div>
// 				<div className="subtext">
// 					<span >PoeSyn.xyz is a collection of tools to aide Exiles in their journeys through Wraeclast. If you have any comments or suggestions, let me know on <a className="homeLink" href="https://twitter.com/poesynxyz">Twitter</a>.</span>
// 				</div>
// 				<div className="homeWrapper">
// 					<Card variant="home">
// 						<div className="cardBody">
// 							<h2>Syndicate Cheatsheet 3.17</h2>
// 							<p>The Syndicate cheatsheet is updated for Path of Exile 3.17 and shows all Immortal Syndicate members and their safehouse rewards based on their location.
// 							<br></br>
// 							<br></br>
// 							The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell. Scarab are priced automaticall by default, though you can toggle them to set manual values. Auto scarab rankings are updated every 6 hours from <a className="homeLink" href="https://poe.ninja">Poe Ninja</a>. Use the toggle at the top to change between manual and auto ranking.
// 							</p>
// 							<a className="moduleLink" href="#"><Button variant="bold">Syndicate Cheat Sheet</Button></a>
// 						</div>
// 					</Card>
// 					<Card variant="home">
// 						<div className="cardBody">
// 							<h2>Change Log</h2>
// 							<ExpandMore
// 								expand={expanded}
// 								onClick={handleExpandClick}
// 								aria-expanded={expanded}
// 								aria-label="show more"
// 							>
// 								<ExpandMoreIcon />
// 							</ExpandMore>
// 							<Collapse in={expanded} timeout="auto" unmountOnExit>
// 								<ul>
// 									<h3>3.17 Siege of the Atlas</h3>
// 									<p>Caught up on changes related to the removal of Prophecy, Perandus and Sextants.</p>
// 									<h3>3.14 Ultimatum</h3>
// 									<p>Added a new color mode for better visibility for those with color blindness.</p>
// 									<h3>3.12 Heist</h3>
// 									<p>Added the ability to toggle Scarab pricing on the Syndicate Cheatsheet. If you don't want prices to be auto-fetched from POE Ninja, simply click the button up top to switch functionality.</p>
// 									<h3>3.11 Harvest</h3>
// 									<p>Added an overlay friendly version for use with tools like <a href="https://github.com/PoE-Overlay-Community/PoE-Overlay-Community-Fork">POE Overlay</a>. It is accessible from the main menu or the site map in the footer. To use with POE Overlay, open your setting and add a hotkey for opening an external site and use the url <a href="http://poesyn.xyz/syndicate-overlay">http://poesyn.xyz/syndicate-overlay</a>.</p>
// 									<h3>3.10 Delirium</h3>
// 									<p>Updated the Syndicate Cheat Sheet to reflect changes to member rewards. Added new skill gems.</p>
// 								</ul>
// 							</Collapse>
// 						</div>
// 					</Card>
					
// 				</div>
// 				<div className="titleWrapper">
// 					<h1>Change Log</h1>
// 				</div>
// 			</div>
// 		);
// 	}
// }
