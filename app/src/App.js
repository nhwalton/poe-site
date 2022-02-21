import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import ReactGA from "react-ga";

import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home/';
import Syndicate from './pages/syndicate/';
import Archnemesis from './pages/archnemesis/';

import { CustomTheme } from "./customTheme";

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
