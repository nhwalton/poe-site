import Preact, { h, Component } from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';

import analytics from '../../components/analytics'

import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import 'react-hint/css/index.css';
import defaultResponse from './passives.json';
import useIfMounted from '../../components/ifMounted';

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
      <li style="list-style-type:none;">
        {trial.name}
      </li>
    );
};

const Gems = ({ gemDetails }) => {
    return (
        <div>
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

const Passives = () => {

  const [response, setResponse] = useState(defaultResponse);
  const [build, setBuild] = useState('');

  const localBuildResponse = localStorage.getItem("buildResponse")
  const localBuild = localStorage.getItem("build")

  if (localBuildResponse != null && localBuildResponse != "") {
    console.log("build in local storage")
    useEffect(() => {
      ifMounted(() => setResponse(JSON.parse(localBuildResponse)));
    }, [localBuildResponse])
  }

  const ifMounted = useIfMounted();

  const handleClick = async () => {
    const newResponse = await fetchBuildPassives(build);
    if (typeof newResponse == "string") {
      alert(newResponse)
      // localStorage.setItem("build", "")
    } else {
      ifMounted(() => setResponse(newResponse))
      console.log(newResponse)
      localStorage.setItem("buildResponse", JSON.stringify(newResponse))
      localStorage.setItem("build", build)
      if (build != "") {
        analytics.track('click', {
          category: 'build',
          label: build,
          value: ''
        })
      };
    }
  };

  const resetPassives = () => {
    ifMounted(() => setResponse(defaultResponse))
    localStorage.setItem("build", "")
  }

  const onInputChange = event => ifMounted(() => setBuild(event.target.value));

  async function fetchBuildPassives(build) {
    const response = await fetch('/api/gems?pastebin='.concat(build));
    const json = await response.json();
    return json
  }

  const renderTooltip = (target) => {
    const vendor = target.dataset.vendor
    const mission = target.dataset.mission
    const gemName = target.dataset.name
    const level = target.dataset.level
    return (
        <div class="mdc-card elevated">
          <h2>{gemName}</h2>
          <span>Vendor: {vendor}</span>
          <span>Required Mission: {mission}</span>
          <span>Level to: {level}</span>
        </div>
    );
  };

  return(
      <div class="contentWrapper">
          <ReactHint
              position="right"
              autoPosition
              events
              onRenderContent = {e => renderTooltip(e)}
          />
          <div class="titleWrapper">
            <h1>Passive and Trial Locations</h1>
            <div id={style.pobInput}>
                <div class={style.formGroup}>
                    <input
                      id="build"
                      class={style.formField}
                      type="text"
                      placeholder="http://pastebin.com/XYZ"
                      onChange={e => onInputChange(e)}
                      value={localBuild}
                      />
                </div>
                <Button class={style.buildButton} raised ripple onClick={() => handleClick()}>Submit</Button>
                <Button class={style.buildButton} raised ripple onClick={() => resetPassives()}>Reset</Button>
            </div>
          </div>
          <div id={style.acts}>
              {response.map(data => (
              <ActCard data={data} />
              ))}
          </div>
      </div>
  );
}

export default Passives;