import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import { CustomTheme } from "./customTheme";
import Archnemesis from './pages/archnemesis/';
import Home from './pages/home/';
import Syndicate from './pages/syndicate/';
import Passives from './pages/passives/';
import Chromatic from './pages/chromatic_calculator/';

ReactGA.initialize("UA-158247637-1", {
		// debug: true,
	  });

function App() {

	const MyRoutes = (props) => {
		const display = props.display
		return (
			<Routes>
				<Route path="/syndicate" element={<Syndicate />}>
				</Route>
				<Route path="/syndicate-overlay" element={<Syndicate display={display}/>}>
				</Route>
				<Route path="/archnemesis" element={<Archnemesis />}>
				</Route>
				<Route exact path="/passives" element={<Passives />}>
				</Route>
				<Route exact path="/chromatic" element={<Chromatic />}>
				</Route>
				<Route exact path="/" element={<Home />}>
				</Route>
			</Routes>
		)
		}

	const MyLayout = () => {
		const currentPath = useLocation().pathname;
		const hostName = window.location.hostname;
		useEffect(() => {
			if (hostName !== 'localhost') {
				ReactGA.set({ page: currentPath });
				ReactGA.pageview(currentPath);
			}
		}, [currentPath, hostName]);
		if (currentPath === '/syndicate-overlay') {
			return (
				<MyRoutes display="tiny"/>
			)
		} else {
				return(
				<React.Fragment>
					<Header/>
						<MyRoutes />
					<Footer />
				</React.Fragment>
				);
		}
	}

	return (
				<ThemeProvider theme={CustomTheme}>
					<div className="App">
						<Router>
							<MyLayout />
						</Router>
					</div>
				</ThemeProvider>
			);
}

export default App;
