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
							<p>The leveling guide has all passive missions and lab locations to make sure you don't miss anything while leveling your character. Additionally, if you are following a build, you are able to enter the POB Pastebin and track which gems you need to pick up and where. If there are gems you know you want to pick up that aren't in your end game POB, you can select a gem and class and manually add it to the guide.</p><p>Note: With the release of Delirium and the sparsity of the patch notes around new gems, new gem availability may be off a bit.
							</p>
							<a class={style.moduleLink} href="/passives"><Button raised ripple>Leveling Guide</Button></a>
						</div>
					</Card>
					<Card>
						<div class={style.cardBody}>
							<h2>Syndicate Cheatsheet</h2>
							<p>The Syndicate cheatsheet shows all Immortal Syndicate members and their safehouse rewards based on their location. The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell. Scarab rankings are updated every 6 hours from <a class={style.homeLink} href="https://poe.ninja">Poe Ninja</a>.
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
			</div>
		);
	}
}
