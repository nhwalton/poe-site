import React from 'react';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Appbar from './components/appbar';
import Footer from './components/footer';

import Home from './pages/home/';
import Syndicate from './pages/syndicate/';
import Archnemesis from './pages/archnemesis/';

import { CustomTheme } from "./customTheme";

function App() {

  const theme = {};

  const [currentUrl, setUrl] = useState('/');
	const [toggle, toggleHeaderFooter] = useState(false);

  function shouldToggle(url) {
		if (url === '/syndicate-overlay') {
			toggleHeaderFooter(true);
		} else {
			toggleHeaderFooter(false);
		}
	}

	function handleRoute(e) {
		// console.log(e.url)
		setUrl(e.url)
		shouldToggle(e.url)
	};

  return (
    <ThemeProvider theme={CustomTheme}>
      <div className="App">

        <Appbar/>

        <Router onChange={(e) => handleRoute(e)}>
          <Routes>
            <Route path="/syndicate" element={<Syndicate />}>
            </Route>
            <Route path="/archnemesis" element={<Archnemesis />}>
            </Route>
            <Route exact path="/" element={<Home />}>
            </Route>
          </Routes>
        </Router>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
