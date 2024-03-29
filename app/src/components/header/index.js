import MenuIcon from '@mui/icons-material/MenuRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import * as React from 'react';
import Archnemesis from '../../assets/header/Archnemesis_League_Icon.png';
import Passives from '../../assets/header/Book_of_Skill.png';
import Cameria from '../../assets/header/Cameria_the_Coldblooded.png';
import Exalted from '../../assets/header/Exalted_Orb.png';
import Chromatic from '../../assets/header/Chromatic_Orb.png';
import poeOverlay from '../../assets/header/POE_Overlay_Community_Fork.png';
import './style.css';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const PageTitle = () => { 
    const title = <span id="pageTitle" className="pageTitle"><a href="/">poesyn.xyz</a></span>
		const useTitle = useMediaQuery('(min-width:1500px)') ? title : null;
		return (
			useTitle
		)
	}

  const list = (anchor) => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      variant="nav"
    >
      <List variant="nav">
          <ListItem button key="Home" variant="nav" component="a" href="/">
                <img src={Exalted} alt="home"/>
            <ListItemText primary="Home" variant="nav"/>
          </ListItem>
          <ListItem button key="Syndicate" variant="nav" component="a" href="/syndicate">
                <img src={Cameria} alt="syndicate" />
            <ListItemText primary="Syndicate" variant="nav"/>
          </ListItem>
          <ListItem button key="Archnemesis" variant="nav" component="a" href="/archnemesis" >
                <img src={Archnemesis} alt="archnemesis" />
            <ListItemText primary="Archnemesis" variant="nav"/>
          </ListItem>
          <ListItem button key="Passives" variant="nav" component="a" href="/passives" >
                <img src={Passives} alt="Leveling" />
            <ListItemText primary="Leveling" variant="nav"/>
          </ListItem>
          <ListItem button key="Chromatic Calculator" variant="nav" component="a" href="/chromatic" >
                <img src={Chromatic} alt="Chromatic Calculator" />
            <ListItemText primary="Chromatic Calculator" variant="nav"/>
          </ListItem>
          <ListItem button key="Syndicate-Overlay" variant="navBottom" component="a" href="/syndicate-overlay" >
                <img src={poeOverlay} alt="syndicate-overlay" />
            <ListItemText primary="Syndicate-Overlay" variant="nav"/>
          </ListItem>
      </List>
    </Box>
  );

  let pages = [
    {
      title: "Syndicate",
      url: "syndicate"},{
      title: "Archnemesis",
      url: "archnemesis"},{
      title: "Leveling",
      url: "passives"},{
      title: "Chromatic",
      url: "chromatic"
    },
  ]
  let page = window.location.pathname.split("/")[1];

  return (
    <div className="menuBar">
        <React.Fragment key="headerBar">
          <div className="headerBar">
            <div className="headerBarLeft">
              <Button onClick={toggleDrawer('left', true)} variant="menu"><MenuIcon fontSize="large" variant="hamburger"/></Button>
              <PageTitle />
            </div>
            <div className="headerBarCenter">
              {pages.map((thisPage) => {
                  if (thisPage.url === page) {
                    return(<Button disableRipple variant="headerBarActive" component="a" href={`/${thisPage.url}`}>{thisPage.title}</Button>)
                } else {
                    return(<Button disableRipple variant="headerBar" component="a" href={`/${thisPage.url}`}>{thisPage.title}</Button>)
                }
              })}
              {/* <Button disableRipple variant="headerBar" component="a" href="/archnemesis">Archnemesis</Button> */}
            </div>
            <div className="headerBarRight">
            </div>
          </div>

          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
            // variant="nav"
            PaperProps={{
                sx: {
                  backgroundColor: "#1a1a1a",
                  color: "#e0e0e0",
                  borderRight: "2px solid var(--colorMain)",
                }
              }}
          >
            <span className="navTitle">poesyn.xyz</span>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
