import { Component } from 'preact';
import { Router } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';

import analytics from './analytics';

import Header from './header';
import Footer from './footer';
import Home from '../routes/home';
import NotFound from '../routes/404';
import Passives from '../routes/passives';
import Syndicate from '../routes/syndicate';
import SyndicateOverlay from '../routes/syndicate';
import Fossils from '../routes/fossils';
import Blight from '../routes/blight';
import Archnemesis from '../routes/archnemesis';

// const [toggle, toggleHeaderFooter] = useState(false);

const App = () => {

	const [currentUrl, setUrl] = useState('/');
	const [toggle, toggleHeaderFooter] = useState(false);

	function shouldToggle(url) {
		if (url == '/syndicate-overlay') {
			toggleHeaderFooter(true);
		} else {
			toggleHeaderFooter(false);
		}
	}

	function handleRoute(e) {
		// console.log(e.url)
		setUrl(e.url)
		shouldToggle(e.url)
		analytics.page()
	};

	if (toggle == true) {
		return(
			<div id="app">
				<Router onChange={(e) => handleRoute(e)}>
					<SyndicateOverlay path="/syndicate-overlay" display="tiny"/>
					{/* <SyndicateOverlay path="/syndicate-overlay"/> */}
				</Router>
			</div>
		);
	} else {
		return (
			<div id="app">
				<Header selectedRoute={currentUrl} />
				<Router onChange={(e) => handleRoute(e)}>
					<Home path="/" />
					<Passives path="/passives" />
					<Syndicate path="/syndicate" />
					<SyndicateOverlay path="/syndicate-overlay" />
					<Fossils path="/fossils" />
					<Blight path="/blight" />
					<Archnemesis path="/archnemesis" />
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;



// export default class App extends Component {

// 	/** Gets fired when the route changes.
// 	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
// 	 *	@param {string} event.url	The newly routed URL
// 	 */
	
// 	handleRoute = e => {
// 		console.log(e)
// 		this.setState({
// 				currentUrl: e.url,
// 				toggleHeaderFooter: true
// 		});
// 		analytics.page()
// 	};
	
// 	render() {
// 		return (
// 			<div id="app">
// 				<Header selectedRoute={this.state.currentUrl} />
// 				<Router onChange={this.handleRoute}>
// 					<Home path="/" />
// 					<Passives path="/passives" />
// 					<Syndicate path="/syndicate" />
// 					<Fossils path="/fossils" />
// 					<Blight path="/blight" />
// 					<NotFound default />
// 				</Router>
// 				<Footer />
// 			</div>
// 		);
// 	}
// }
