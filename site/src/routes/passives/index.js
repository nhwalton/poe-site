import Preact, { h, Component } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';

import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultResponse from './passives.json';
import gemNames from './gems.txt';
import classNames from './classes.txt';

const Quests = ({ quest }) => {
    return (
        <div class={style.singleItem}>
            {quest.name}
            <div class={style.itemDetails}>
               <span class="pill blue">{quest.skillPoints}</span>
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
            <span class="pill blue">Level {trial.level}</span>
            <span class="pill red">{trial.lab}</span>
            <span class="pill green">{trial.trap}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div class={style.singleItem}>
        {trial.name}
        <div class={style.itemDetails}>
            <span class="pill red">{trial.lab}</span>
            <span class="pill green">{trial.trap}</span>
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
              <span class="pill blue">{gemDetails.gem_name}</span>
              <span class="pill red">Level to {gemDetails.level}</span>
              <span class="pill orange">{gemDetails.mission}</span>
              <span class="pill green">{gemDetails.vendor}</span>
            </div>
        </div>
    );
  };

const ActCard = ({ data }) => {

    const ThisTrial = ({ trials }) => {
      if (trials.length > 0) {
          return (
            <div>
              <hr></hr>
              <h3>Trials</h3>
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
              <h3>Passives</h3>
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
            <hr></hr>
            <h3>Gems</h3>
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
  // const [addedGems, setAddedGems] = useState([]);
  const [singleGemName, setSingleGemName] = useState('');
  const [singleGemClass, setSingleGemClass] = useState('');

  const localBuildResponse = localStorage.getItem("buildResponse")
  const localBuild = localStorage.getItem("build")
  // const localGems = localStorage.getItem("addedGems")

  const gemNamesArr = gemNames.split(',')
  const classNamesArr = classNames.split(',')

  useEffect(() => {
    if (localBuildResponse != null && localBuildResponse != "") {
      setResponse(JSON.parse(localBuildResponse));
      setBuild(localBuild);
    }
  }, [localBuildResponse]);

  const handlePOB = useCallback(async () => {
      console.log(666)
      const newResponse = await fetchBuildPassives(build);
      if (typeof newResponse == "string") {
        alert(newResponse)
        localStorage.setItem("build", "")
      } else {
        setResponse(newResponse);
        localStorage.setItem("buildResponse", JSON.stringify(newResponse));
        localStorage.setItem("build", build);
        if (build != "") {
          analytics.track('click', {
            category: 'build',
            label: build,
            value: ''
          })
        }
      }
  },[build]);

  const handleGem = async () => {
    const singleGem = await getSingleGem(singleGemName, singleGemClass);
    const addedGems = addedGems;
    const thisAct = singleGem['act'];
    const index = response.findIndex(element => element.act == thisAct);
    const newResponse = [...response];
    newResponse[index]['gems'].push(singleGem);
    setResponse(newResponse);
    localStorage.setItem("buildResponse", JSON.stringify(newResponse))
  }

  const resetPassives = () => {
    setResponse(defaultResponse);
    localStorage.setItem("build", "");
  }

  const onBuildChange = event => setBuild(event.target.value);
  const onGemAdd = event => setBuild(event.target.value);
  const onGemName = event => setSingleGemName(event.target.value);
  const onGemClass = event => setSingleGemClass(event.target.value);

  async function fetchBuildPassives(build) {
    const response = await fetch('/api/gems?pastebin='.concat(build));
    return await response.json();
  }

  async function getSingleGem(gemName, className) {
    const response = await fetch('/api/singleGem?gemName=' + gemName + '&className=' + className);
    return await response.json();
  }

  return(
      <div class={`${style.passives} page`}>
          <div class="titleWrapper">
            <h1>Leveling Guide</h1>
            <div class={style.inputWrapper}>
              <div id={style.pobInput}>
                  <div class={style.formGroup}>
                      <input
                        id="build"
                        class={style.formField}
                        type="text"
                        placeholder="http://pastebin.com/XYZ"
                        onChange={e => onBuildChange(e)}
                        value={localBuild}
                        />
                  </div>
                  <Button class={style.buildButton} raised ripple onClick={() => handlePOB()}>Submit</Button>
                  <Button class={style.buildButton} raised ripple onClick={() => resetPassives()}>Reset</Button>
              </div>
              <div id={style.pobInput}>
                  <div class={` ${style.formGroup} ${style.gemGroup} `}>
                      <select
                        id="gemName"
                        class={style.formField}
                        type="text"
                        placeholder="Gem Name"
                        onChange={e => onGemName(e)}
                        value={singleGemName}
                        >
                          {gemNamesArr.map(gemName => (
                            <option value={gemName}>{gemName}</option>
                            )
                          )};
                      </select>
                      <select
                        id="gemClass"
                        class={style.formField}
                        type="text"
                        placeholder="Class"
                        onChange={e => onGemClass(e)}
                        value={singleGemClass}
                        >
                          {classNamesArr.map(className => (
                            <option value={className}>{className}</option>
                            )
                          )};
                      </select>
                  </div>
                  <Button class={style.buildButton} raised ripple onClick={() => handleGem()}>Add Gem</Button>
                  {/* <Button class={style.buildButton} raised ripple onClick={() => resetPassives()}>Reset</Button> */}
              </div>
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