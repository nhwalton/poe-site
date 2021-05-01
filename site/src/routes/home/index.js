import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={`${style.home} page`}>
				<div class="titleWrapper">
					<h1>Welcome to PoeSyn.xyz!</h1>
				</div>
				<div class={style.subtext}>
					<span >PoeSyn.xyz is a collection of tools to aide Exiles in their journeys through Wraeclast. If you have any comments or suggestions, let me know on <a class={style.homeLink} href="https://twitter.com/poesynxyz">Twitter</a>.</span>
				</div>
				<div class={style.homeWrapper}>
					<Card>
						<div class={style.cardBody}>
							<h2>Leveling Guide</h2>
							<p>The leveling guide has all passive missions and lab locations to make sure you don't miss anything while leveling your character. Additionally, if you are following a build, you are able to enter the POB Pastebin and track which gems you need to pick up and where. If there are gems you know you want to pick up that aren't in your end game POB, you can select a gem and class and manually add it to the guide.
							<br></br>
							<br></br>
							Note: With the release of new content, some gems and availability may not be present. If you have issues, let me know on <a class={style.homeLink} href="https://twitter.com/poesynxyz">Twitter</a> and I will try to get missing gems updated when I get the time.
							</p>
							<a class={style.moduleLink} href="/passives"><Button raised ripple>Leveling Guide</Button></a>
						</div>
					</Card>
					<Card>
						<div class={style.cardBody}>
							<h2>Syndicate Cheatsheet 3.14</h2>
							<p>The Syndicate cheatsheet is updated for Path of Exile 3.12 and shows all Immortal Syndicate members and their safehouse rewards based on their location.
							<br></br>
							<br></br>
							The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell. Scarab are priced automaticall by default, though you can toggle them to set manual values. Auto scarab rankings are updated every 6 hours from <a class={style.homeLink} href="https://poe.ninja">Poe Ninja</a>. Use the toggle at the top to change between manual and auto ranking.
							</p>
							<a class={style.moduleLink} href="/syndicate"><Button raised ripple>Syndicate Cheat Sheet</Button></a>
						</div>
					</Card>
					<Card>
						<div class={style.cardBody}>
							<h2>Blight Towers</h2>
							<p>The Blight Towers cheatsheet offers suggested upgrade tiers and placement for towers during Blight encounters and in Blighted Maps. There are also notes referencing alternative use cases when towers can be used outside their usual recommendation.
							</p>
							<a class={style.moduleLink} href="/blight"><Button raised ripple>Blight Towers</Button></a>
						</div>
					</Card>
					<Card>
						<div class={style.cardBody}>
							<h2>Fossil Locations</h2>
							<p>The Fossil cheatsheet notes fossil availability in Delve based on the Delve zone/biome as well as the modifier for each type of fossil.
							</p>
							<a class={style.moduleLink} href="/fossils"><Button raised ripple>Fossil Locations</Button></a>
						</div>
					</Card>
					
				</div>
				<div class="titleWrapper">
					<h1>Change Log</h1>
				</div>
				<div>
					<h3>3.12 Heist</h3>
					<p>Added the ability to toggle Scarab pricing on the Syndicate Cheatsheet. If you don't want prices to be auto-fetched from POE Ninja, simply click the button up top to switch functionality.</p>
					<h3>3.11 Harvest</h3>
					<p>Added an overlay friendly version for use with tools like <a href="https://github.com/PoE-Overlay-Community/PoE-Overlay-Community-Fork">POE Overlay</a>. It is accessible from the main menu or the site map in the footer. To use with POE Overlay, open your setting and add a hotkey for opening an external site and use the url <a href="http://poesyn.xyz/syndicate-overlay">http://poesyn.xyz/syndicate-overlay</a>.</p>
					<h3>3.10 Delirium</h3>
					<p>Updated the Syndicate Cheat Sheet to reflect changes to member rewards. Added new skill gems.</p>
				</div>
			</div>
		);
	}
}
