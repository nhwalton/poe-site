import { Component } from 'preact';
import { Router } from 'preact-router';

import analytics from './analytics'

import Header from './header';
import Footer from './footer';
import Home from '../routes/home';
import NotFound from '../routes/404';
import Passives from '../routes/passives';
import Syndicate from '../routes/syndicate';
import Fossils from '../routes/fossils';
import Blight from '../routes/blight';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
		analytics.page()
	};

	render() {
		return (
			<div id="app">
				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Passives path="/passives" />
					<Syndicate path="/syndicate" />
					<Fossils path="/fossils" />
					<Blight path="/blight" />
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}
