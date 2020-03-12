import style from './style';

const Footer = () => {
	return (
        <div class={style.footerWrapper}>
            <div class={style.footerBar}>
                <div class={style.siteMap}>
                    <a href="/passives">Leveling Guide</a>
                    <a href="/syndicate">Syndicate Cheatsheet</a>
                    <a href="/fossils">Fossil Locations</a>
                    <a href="/blight">Blight Towers</a>
                </div>
                <span class={style.title}>poesyn.xyz</span>
                <span class={style.questions}></span>
            </div>
        </div>
	);
}

export default Footer;