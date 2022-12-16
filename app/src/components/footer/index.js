import './style.css';

const Footer = () => {
	return (
        <div className="footerWrapper">
            <div className="footerBar">
                <div>
                    <div className="siteMap">
                        <a href="/chromatic">Chromatic Calculator</a>
                        <a href="/passives">Leveling Guide</a>
                        <a href="/syndicate">Syndicate Cheatsheet</a>
                        <a href="/syndicate-overlay">Syndicate Overlay</a>
                        {/* <a href="/passives">Leveling Guide</a>
                        <a href="/fossils">Fossil Locations</a>
                        <a href="/blight">Blight Towers</a> */}
                    </div>
                    <span className="title">poesyn.xyz</span>
                    <div className="questions">
                        <span><a className="homeLink" href="https://twitter.com/poesynxyz">Twitter</a></span>
                        <span><a className="homeLink" href="https://reddit.com/u/arxv/">Reddit</a></span>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Footer;