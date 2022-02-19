import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/MenuRounded';
import Exalted from '../../assets/header/Exalted_Orb.png';
import Cameria from '../../assets/header/Cameria_the_Coldblooded.png';
import Passive from '../../assets/header/Book_of_Skill.png';
// import Fossil from '../../assets/header/Bloodstained_Fossil.png';
// import Blight from '../../assets/header/Fireball_Tower.png';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    const title = <span className="pageTitle">poesyn.xyz</span>
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
      <List>
          <ListItem button key="Home" variant="nav" component="a" href="/">
                <img src={Exalted} alt="home icon"/>
            <ListItemText primary="Home" variant="nav"/>
          </ListItem>
          <ListItem button key="Syndicate" variant="nav" component="a" href="/syndicate">
                <img src={Cameria} alt="syndicate icon" />
            <ListItemText primary="Syndicate" variant="nav"/>
          </ListItem>
          <ListItem button key="Archnemesis" variant="nav" component="a" href="/archnemesis" >
                <img src={Passive} alt="archnemesis icon" />
            <ListItemText primary="Archnemesis"variant="nav"/>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="menuBar">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>

          <Button onClick={toggleDrawer(anchor, true)} variant="menu"><MenuIcon fontSize="large" variant="hamburger"/></Button>
          <PageTitle />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            // variant="nav"
            PaperProps={{
                sx: {
                  backgroundColor: "#222",
                  color: "#e0e0e0",
                  paddingTop: "2em",
                  width: '12%'
                }
              }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
