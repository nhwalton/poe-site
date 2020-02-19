import style from './style';

const Footer = () => {
	return (
        <div class={style.footerWrapper}>
            <div class={style.footerBar}>
                <div class={style.siteMap}>
                    <a href="/passives">Leveling Guide</a>
                    <a href="/syndicate">Syndicate Cheatsheet</a>
                    <a href="/fossils">Fossil Locations</a>
                </div>
                <span class={style.title}>poesyn.xyz</span>
                <span class={style.questions}>Placeholder</span>
            </div>
            {/* <div class={style.gggAttrib}>
                <span>All <a href="https://www.pathofexile.com/">Path of Exile</a> related images and artwork used on this site are the property of <a href="http://www.grindinggear.com/">Grinding Gear Games </a></span>
            </div> */}
        </div>
	);
}

export default Footer;