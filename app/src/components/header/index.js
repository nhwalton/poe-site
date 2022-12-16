import { useState } from 'react';
import MenuIcon from '@mui/icons-material/MenuRounded';
import SettingsIcon from '@mui/icons-material/Settings';
// import { Box, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Button, ListGroup, Nav, Offcanvas, Image } from 'react-bootstrap';
import * as React from 'react';
import Passives from '../../assets/header/Book_of_Skill.png';
import Cameria from '../../assets/header/Cameria_the_Coldblooded.png';
import Exalted from '../../assets/header/Exalted_Orb.png';
import Chromatic from '../../assets/header/Chromatic_Orb.png';
import ExileGuide from '../../assets/header/Victario_Book.png';
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

    let pages = [
        {
            // title: "Exile Guide",
            // url: "cheatsheet"},{
            title: "Syndicate",
            url: "syndicate"},{
            title: "Leveling",
            url: "passives"},{
            title: "Chromatic",
            url: "chromatic"
        },
    ]
    let page = window.location.pathname.split("/")[1];

    const [show, setShow] = useState(false);

    function OffCanvasExample({ name, ...props }) {
        // const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
            <>
                {/* <Button onClick={handleShow} variant="menu"><MenuIcon fontSize="large" variant="hamburger"/></Button> */}
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header closeButton closeVariant="white" >
                        <PageTitle />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1">
                            <Nav.Link button className="ps-2" key="Home" as="a" href="/">
                                <Image fluid className="me-4" src={Exalted} alt="home"/>
                                Home
                            </Nav.Link>
                            {/* <Nav.Link button className="ps-2" key="Exile Guide" as="a" href="/cheatsheet" >
                                <Image fluid className="me-4" src={ExileGuide} alt="cheatsheet" />
                                Exile Guide
                            </Nav.Link> */}
                            <Nav.Link button className="ps-2" key="Syndicate" as="a" href="/syndicate">
                                <Image fluid className="me-4" src={Cameria} alt="syndicate" />
                                Syndicate
                            </Nav.Link>
                            <Nav.Link button className="ps-2" key="Passives" as="a" href="/passives" >
                                <Image fluid className="me-4" src={Passives} alt="Leveling" />
                                Leveling
                            </Nav.Link>
                            <Nav.Link button className="ps-2" key="Chromatic Calculator" as="a" href="/chromatic" >
                                <Image fluid className="me-4" src={Chromatic} alt="Chromatic Calculator" />
                                Chromatic Calculator
                            </Nav.Link>
                            <Nav.Link button className="ps-2 bottom" key="Syndicate-Overlay" as="a" href="/syndicate-overlay" >
                                <Image fluid className="me-4" src={poeOverlay} alt="syndicate-overlay" />
                                Syndicate-Overlay
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

  return (
    <div className="menuBar">
        <React.Fragment key="headerBar">
            <div className="headerBar">
                <div className="headerBarLeft">
                    <Button onClick={() => setShow(true)} variant="menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    </Button>
                    <PageTitle />
                </div>
                <div className="headerBarCenter">
                    {pages.map((thisPage) => {
                        if (thisPage.url === page) {
                          return(<Button variant="headerBar active" component="a" href={`/${thisPage.url}`}>{thisPage.title}</Button>)
                      } else {
                          return(<Button variant="headerBar" component="a" href={`/${thisPage.url}`}>{thisPage.title}</Button>)
                      }
                    })}
                </div>
                <div className="headerBarRight">
                </div>
            </div>
            <OffCanvasExample
                placement="start"
                name="Menu"
                setShow = {setShow}
                show = {show}
            />
            {/* <Drawer
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
            </Drawer> */}
        </React.Fragment>
    </div>
  );
}
