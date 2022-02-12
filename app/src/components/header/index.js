import { Component } from 'react';
import { Route } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
// import '@mui/material/Switch/style.css';
// import '@mui/material/Dialog/style.css';
// import '@mui/material/Drawer/style.css';
// import '@mui/material/List/style.css';
// import '@mui/material/AppBar/style.css';
// import style from './style.css';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		Route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToPassives = this.linkTo('/passives');
	goToSyndicate = this.linkTo('/syndicate');
	goToFossils = this.linkTo('/fossils');
	goToBlight = this.linkTo('/blight');
	goToOverlay = this.linkTo('/syndicate-overlay');
	goToArchnemesis = this.linkTo('/archnemesis');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	render(props) {
		// console.log("route",props.selectedRoute);
		return (
			<div>
				<AppBar className="AppBar">
					<AppBar.Row>
						<AppBar.Section align-start>
							<AppBar.Icon menu onClick={this.openDrawer}>
								menu
							</AppBar.Icon>
							<AppBar.Title>poesyn.xyz</AppBar.Title>
						</AppBar.Section>
						{/* <AppBar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<AppBar.Icon>settings</AppBar.Icon>
						</AppBar.Section> */}
					</AppBar.Row>
				</AppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<img src="../../assets/header/Exalted_Orb.png" />
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/syndicate'} onClick={this.goToSyndicate}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/header/Cameria_the_Coldblooded.png" />
							Syndicate
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/archnemesis'} onClick={this.goToArchnemesis}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/header/Cameria_the_Coldblooded.png" />
							Archnemesis
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/passives'} onClick={this.goToPassives}>
							<img src="../../assets/header/Book_of_Skill.png" />
							Leveling
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/fossils'} onClick={this.goToFossils}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/header/Bloodstained Fossil.png" />
							Fossils
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/blight'} onClick={this.goToBlight}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/header/Fireball Tower.png" />
							Blight Towers
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/syndicate-overlay'} onClick={this.goToOverlay}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/header/POE_Overlay_Community_Fork.png" />
							Syndicate Overlay
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Settings</Dialog.Header>
					<Dialog.Body>
						<div>
							Enable dark theme <Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
