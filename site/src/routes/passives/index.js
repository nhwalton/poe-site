import Preact, { h, Component, useState, useEffect } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Passives extends Component {
	state = {
		response: require('./passives_with_gems.json')
    };
    
    // async componentDidMount() {
    //     const response = await fetch('http://localhost:5000/api/gems?pastebin=5N3ZSguA');
    //     const json = await response.json();
    //     console.log("component",json)
    //     this.setState({response: json})
    // }

    // const [response, setResponse] = require('./passives_with_gems.json');
    // // const [response, setResponse] = useState(0);

    // useEffect(() => {
    //     const newResponse = asyncCall(value);
    //     setResponse(newResponse);
    // }, [])

    async asyncCall() {
        let value = document.getElementById('build').value//'xaTuiHwH'
        const response = await fetch('http://localhost:5000/api/gems?pastebin='.concat(value));
        const json = await response.json();
        console.log("component",json)
        this.setState({response: json})
    }

    render({},{response}) {
        // let json = require('./passives.json')
        // console.log(json2)
        // console.log("json2",typeof json2)
        console.log("response", response)
        // let gems = getGems('http://localhost:5000/api/gems?pastebin=xaTuiHwH')
        return(
            <div class={`${style.passives} page`}>
                <h1>Passive and Trial Locations</h1>
                <span>xaTuiHwH</span>
                <input id="build"></input>
                <button type="submit" onClick={() => { this.asyncCall() }}>Build</button>
                <div id={style.acts}>
                    {response.map((data) => {
                        return(
                        <Card class={style.actCard}>
                        <h2>{data.act}</h2>
                        <h3>Passives</h3>
                        {/* <ul style="list-style-type:none;"> */}
                        {data.quests.map((quests) => {
                            return (
                                <li style="list-style-type:none;">
                                {quests.name}{quests.skillPoints}
                                </li>
                            )
                        })}
                        {/* </ul> */}
                        <h3>Trials</h3>
                        {data.trials.map((trials) => {
                            return (
                                <li class="passives" style="list-style-type:none;">
                                {trials.name}
                                </li>
                            )
                        })}
                        <h3>Gems</h3>
                        {data.gems.map((details) => {
                            return (
                                <div>
                                <li class="passives" style="list-style-type:none;">
                                Gem: {details.gem_name}
                                </li>
                                <li class="passives" style="list-style-type:none;">
                                Vendor: {details.vendor}
                                </li>
                                <li class="passives" style="list-style-type:none;">
                                Required Mission: {details.mission}
                                </li>
                                <br></br>
                                </div>
                            )
                        })}
                        </Card>
                        )
                    })}
                </div>
                {/* https://pastebin.com/raw/xaTuiHwH */}
			</div>
		);
	}
}