import './style.css';

const Footer = () => {
	return (
        <div class={style.footerWrapper}>
            <div class={style.footerBar}>
                <div class={style.siteMap}>
                    <a href="/passives">Leveling Guide</a>
                    <a href="/syndicate">Syndicate Cheatsheet</a>
                    <a href="/archnemesis">Archnemesis</a>
                    <a href="/fossils">Fossil Locations</a>
                    <a href="/blight">Blight Towers</a>
                    <a href="/syndicate-overlay">Syndicate Overlay</a>
                </div>
                <span class={style.title}>poesyn.xyz</span>
                <span class={style.questions}><a class={style.homeLink} href="https://twitter.com/poesynxyz">Twitter</a></span>
            </div>
        </div>
	);
}

export default Footer;