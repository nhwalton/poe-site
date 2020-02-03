import Preact, { h, Component, useState, useEffect } from 'preact';

import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

const Quests = ({ quest }) => {
    return (
        <li style="list-style-type:none;">
        {quest.name}
        {quest.skillPoints}
        </li>
    );
};

const Trials = ({ trial }) => {
    return (
      <li class="passives" style="list-style-type:none;">
        {trial.name}
      </li>
    );
};

const Gems = ({ gemDetails }) => {
    return (
        <div>
            <li class="passives" style="list-style-type:none;" >
            <img src={'../../assets/gems/' + gemDetails.gem_name + '.png'}/> {gemDetails.gem_name}
            </li>
            <li class="passives" style="list-style-type:none;">
            Vendor: {gemDetails.vendor}
            </li>
            <li class="passives" style="list-style-type:none;">
            Required Mission: {gemDetails.mission}
            </li>
            <br></br>
        </div>
    );
  };

const ActCard = ({ data }) => {
    return (
      <Card class={style.actCard}>
        <h2>{data.act}</h2>
        <h3>Passives</h3>
        {data.quests.map(quest => (
          <Quests quest={quest} />
        ))}
        <h3>Trials</h3>
        {data.trials.map(trial => (
          <Trials trial={trial} />
        ))}
        <h3>Gems</h3>
        {data.gems.map(details => (
          <Gems gemDetails={details} />
        ))}
      </Card>
    );
  };

export default class Passives extends Component {
	state = {
        response: require('./passives_with_gems.json')
    };

    async asyncCall() {
        let value = document.getElementById('build').value//'xaTuiHwH'
        const response = await fetch('http://localhost:5000/api/gems?pastebin='.concat(value));
        const json = await response.json();
        console.log("component",json)
        this.setState({response: json})
    }

    render({},{response}) {
        console.log("response", response)
        return(
            <div class={`${style.passives} page`}>
                <h1>Passive and Trial Locations</h1>
                <div id={style.pobInput}>
                    <TextField id="build" label="Pastebin" outlined helperText="Enter POB Pastebin" value=""/>
                    <Button class={style.buildButton} raised ripple onClick={() => { this.asyncCall() }}>Build</Button>
                </div>
                <div id={style.acts}>
                    {response.map(data => (
                    <ActCard data={data} />
                    ))}
                </div>
                {/* https://pastebin.com/raw/xaTuiHwH */}
			</div>
		);
	}
}