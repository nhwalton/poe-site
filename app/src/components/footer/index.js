import './style.css';

const Footer = () => {
	return (
        <div className="footerWrapper">
            <div className="footerBar">
                <div>
                    <div className="siteMap">
                        <a href="/passives">Leveling Guide</a>
                        <a href="/syndicate">Syndicate Cheatsheet</a>
                        <a href="/archnemesis">Archnemesis</a>
                        <a href="/fossils">Fossil Locations</a>
                        <a href="/blight">Blight Towers</a>
                        <a href="/syndicate-overlay">Syndicate Overlay</a>
                    </div>
                    <span className="title">poesyn.xyz</span>
                    <span className="questions"><a className="homeLink" href="https://twitter.com/poesynxyz">Twitter</a></span>
                </div>
            </div>
        </div>
	);
}

export default Footer;