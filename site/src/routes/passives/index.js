import Preact, { h, Component, useState, useEffect } from 'preact';

import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import 'react-hint/css/index.css';
import defaultResponse from './passives_with_gems.json';

import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory({createElement: h, Component})

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
        <div style="width:20%;">
            <img 
                data-rh data-vendor={gemDetails.vendor}
                data-mission={gemDetails.mission}
                data-name={gemDetails.gem_name}
                data-level={gemDetails.level}
                src={'../../assets/gems/' + gemDetails.gem_name + '.png'}
                style="max-width:100%;"
                />
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
        <div class={style.gemWrapper}>
        {data.gems.map(details => (
          <Gems gemDetails={details} />
        ))}
        </div>
      </Card>
    );
  };

export default class Passives extends Component {
	  state = {
        response: defaultResponse
    };

    async asyncCall() {
        let value = document.getElementById('build').value//'xaTuiHwH'
        const response = await fetch('http://localhost:5000/api/gems?pastebin='.concat(value));
        const json = await response.json();
        // console.log("component",json)
        this.setState({response: json})
    }

    renderTooltip = (target) => {
        const vendor = target.dataset.vendor
        const mission = target.dataset.mission
        const gemName = target.dataset.name
        const level = target.dataset.level
        return (
            <div class="mdc-card elevated">
            <h2>{gemName}</h2>
            <span>Level to: {level}</span>
            <span>Vendor: {vendor}</span>
            <span>Required Mission: {mission}</span>
            </div>
        );
    };

    render({},{response}) {
        // console.log("response", response)
        return(
            <div class={`${style.passives} page`}>
                <ReactHint
                    position="right"
                    autoPosition
                    events
                    onRenderContent = {this.renderTooltip}
                />
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
			</div>
		);
	}
}