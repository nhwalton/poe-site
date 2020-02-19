import { h, Component } from 'preact';
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
					<h1>Welcome to PoeSyn.xyz!!!</h1>
				</div>
				<div class={style.subtext}>
					<span >Here's somehelpful text explaining what the site is?</span>
				</div>
				<div class={style.homeWrapper}>
					<Card>
						<div class={style.cardBody}>
							<h2>Leveling Guide</h2>
							<p>The leveling guide has all passive missions and lab locations to make sure you don't miss anything at league start. Additionally, if you are following a build, you are able to enter the POB Pastebin and track which gems you need to pick up and where.
							</p>
							<a class={style.moduleLink} href="/passives"><Button raised ripple>Leveling Guide</Button></a>
						</div>
					</Card>
					<Card>
						<div class={style.cardBody}>
							<h2>Syndicate Cheatsheet</h2>
							<p>The Syndicate cheatsheet shows all Immortal Syndicate members and their safehouse rewards based on their location. The relative value of each reward is denoted in varying colors and can be changed by clicking on a cell.
							</p>
							<a class={style.moduleLink} href="/syndicate"><Button raised ripple>Syndicate Cheat Sheet</Button></a>
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
