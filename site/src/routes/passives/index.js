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
        <div class={style.singleItem}>
            {quest.name}
            <div class={style.itemDetails}>
               <span class={style.chip + ' ' + style.blue}>{quest.skillPoints}</span>
            </div>
        </div>
    );
};

const Trials = ({ trial }) => {
  if (trial.level) {
    return (
      <div class={style.singleItem}>
        {trial.name}
        <div class={style.itemDetails}>
            <span class={style.chip + ' ' + style.blue}>Level {trial.level}</span>
            <span class={style.chip + ' ' + style.red}>{trial.lab}</span>
            <span class={style.chip + ' ' + style.green}>{trial.trap}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div class={style.singleItem}>
        {trial.name}
        <div class={style.itemDetails}>
            <span class={style.chip + ' ' + style.red}>{trial.lab}</span>
            <span class={style.chip + ' ' + style.green}>{trial.trap}</span>
        </div>
      </div>
    );
  }
};

const Gems = ({ gemDetails }) => {
    return (
        <div class={style.singleGem}>
            <img 
                src={'../../assets/gems/' + gemDetails.gem_name + '.png'}
                style="max-width:100%;"
                />
            <div class={style.itemDetails}>
              <span class={style.chip + ' ' + style.blue}>{gemDetails.gem_name}</span>
              <span class={style.chip + ' ' + style.red}>Level {gemDetails.level}</span>
              <span class={style.chip + ' ' + style.orange}>{gemDetails.mission}</span>
              <span class={style.chip + ' ' + style.green}>{gemDetails.vendor}</span>
            </div>
        </div>
    );
  };

const ActCard = ({ data }) => {

    const ThisTrial = ({ trials }) => {
      if (trials.length > 0) {
          return (
            <div>
              <h2>Trials</h2>
              <div class={style.itemsWrapper}>
                {trials.map(trial => (
                  <Trials trial={trial} />
                ))}
              </div>
            </div>
          );
      } else {
        return (null);
      }
    };

    const ThisPassive = ({ passives }) => {
      if (passives.length > 0) {
          return (
            <div>
              <h2>Passives</h2>
              <div class={style.itemsWrapper}>
                  {data.quests.map(quest => (
                    <Quests quest={quest} />
                  ))}
              </div>
            </div>
          );
      } else {
        return (null);
      }
    }

    const ThisGem = ({ gems }) => {
      if (gems.length > 0) {
        return (
          <div>
            <h2>Gems</h2>
            <div class={style.gemsWrapper}>
                {data.gems.map(details => (
                  <Gems gemDetails={details} />
                ))}
            </div>
          </div>
        );
      } else {
        return(null);
      }
    }

    return (
      <Card class={style.actCard}>
        <h1>{data.act}</h1>
        <ThisPassive passives={data.quests}/>
        <ThisTrial trials={data.trials}/>
        <ThisGem gems={data.gems} />
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
      localStorage.setItem("build", "")
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

  // const renderTooltip = (target) => {
  //   const vendor = target.dataset.vendor
  //   const mission = target.dataset.mission
  //   const gemName = target.dataset.name
  //   const level = target.dataset.level
  //   return (
  //       <div class="mdc-card elevated">
  //         <h2>{gemName}</h2>
  //         <span>Vendor: {vendor}</span>
  //         <span>Required Mission: {mission}</span>
  //         <span>Level to: {level}</span>
  //       </div>
  //   );
  // };

  return(
      <div class={`${style.passives} page`}>
          {/* <ReactHint
              position="right"
              autoPosition
              events
              onRenderContent = {e => renderTooltip(e)}
          /> */}
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