import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import defaultResponse from './passives.json';
import gems from './gems';
import classes from './classes';
import ReactGA from "react-ga";
import './style.css';

const Quests = ({ quest }) => {
    return (
        <div className="singleItem">
            {quest.name}
            <div className="itemDetails">
               <span className="pill blue">{quest.skillPoints}</span>
            </div>
        </div>
    );
};

const Trials = ({ trial }) => {
  if (trial.level) {
    return (
      <div className="singleItem">
        {trial.name}
        <div className="itemDetails">
            <span className="pill blue">Level {trial.level}</span>
            <span className="pill red">{trial.lab}</span>
            <span className="pill green">{trial.trap}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="singleItem">
        {trial.name}
        <div className="itemDetails">
            <span className="pill red">{trial.lab}</span>
            <span className="pill green">{trial.trap}</span>
        </div>
      </div>
    );
  }
};

const Gems = ({ gemDetails }) => {
    const gem_name = gemDetails.gem_name.replace(/_/g, ' ');;
    return (
        <div className="singleGem">
            <img 
                src={'/images/gems/gemname.png'.replace('gemname', gem_name.replace(/ /g, '_'))}
                style={{maxWidth:"100%"}}
                />
            <div className="itemDetails">
              <span className="pill blue">{gem_name}</span>
              { gemDetails.level !== 'N/A' ? <span className="pill red">Level to {gemDetails.level}</span> : null }
              <span className="pill orange">{gemDetails.mission}</span>
              <span className="pill green">{gemDetails.vendor}</span>
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
              <div className="itemsWrapper">
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
              <div className="itemsWrapper">
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
            <div className="gemsWrapper">
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
      <Card variant="passives">
        <h2>{data.act}</h2>
        <ThisPassive passives={data.quests}/>
        <ThisTrial trials={data.trials}/>
        <ThisGem gems={data.gems} />
      </Card>
    );
  };

const Passives = () => {

  const gemNames = gems.replace(/\n/g,'').split(',');
  const classNames = classes.replace(/\n/g,'').split(',');

  const [response, setResponse] = useState(defaultResponse);
  const [build, setBuild] = useState('');
  // const [addedGems, setAddedGems] = useState([]);
  const [singleGemName, setSingleGemName] = useState(gemNames[0]);
  const [singleGemClass, setSingleGemClass] = useState(classNames[0]);

  const localBuildResponse = localStorage.getItem("buildResponse")
  const localBuild = localStorage.getItem("build")

  useEffect(() => {
    if (localBuildResponse !== null && localBuildResponse !== "") {
      setResponse(JSON.parse(localBuildResponse));
      setBuild(localBuild);
    }
  }, [localBuildResponse, localBuild]);

  const handlePOB = useCallback(async () => {
      const newResponse = await fetchBuildPassives(build);
      if (typeof newResponse == "string") {
        alert(newResponse)
        localStorage.setItem("build", "")
      } else {
        setResponse(newResponse);
        localStorage.setItem("buildResponse", JSON.stringify(newResponse));
        localStorage.setItem("build", build);
        if (build !== "") {
          const eventDetails = {
            category: 'leveling',
            action: 'importBuild',
            label: build
          }
          ReactGA.event(eventDetails)
        }
      }
  },[build]);

  const handleGem = async () => {
    const singleGem = await getSingleGem(singleGemName, singleGemClass);
    singleGem['gem_name'] = singleGem['gem_name'].replace(/_/g, ' ');
    // const addedGems = addedGems;
    const thisAct = singleGem['act'];
    const index = response.findIndex(element => element.act === thisAct);
    const newResponse = [...response];
    newResponse[index]['gems'].push(singleGem);
    setResponse(newResponse);
    localStorage.setItem("buildResponse", JSON.stringify(newResponse))
  }

  const resetPassives = () => {
    const resetResponse = JSON.parse(JSON.stringify(defaultResponse))
    setResponse(resetResponse);
    localStorage.setItem("build","");
    localStorage.removeItem("buildResponse");
    document.getElementById("build").value = "";
  }

  const onBuildChange = event => setBuild(event.target.value);
  // const onGemAdd = event => setBuild(event.target.value);
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

  console.log(gemNames)

  return(
      <div className="passives page">
          <div className="titleWrapper">
            <h1>Leveling Guide</h1>
            <div className="inputWrapper">
              <div id="pobInput">
                  <div className="formGroup">
                      <TextField
                        id="build"
                        className="formField"
                        type="text"
                        placeholder="http://pastebin.com/XYZ"
                        onChange={e => onBuildChange(e)}
                        value={localBuild}
                        />
                  </div>
                  <Button variant="passives" className="buildButton" raised ripple onClick={() => handlePOB()}>Submit</Button>
                  <Button variant="passives" className="buildButton" raised ripple onClick={() => resetPassives()}>Reset</Button>
              </div>
              <div id="pobInput">
                  {/* <div className="formGroup gemGroup"> */}
                      <Select
                        id="gemName"
                        className="formField"
                        value={singleGemName}
                        onChange={e => onGemName(e)}
                        sx= {{
                          backgroundColor: "#1a1a1a",
                          color: "#e0e0e0",
                          }}
                        >
                          {gemNames.map(function(gemName) {
                            const newName = gemName.replace(/_/g, ' ');
                            const otherName = gemName
                            return(
                              <MenuItem value={otherName} key={otherName}>{newName}</MenuItem>
                            )
                          }
                          )};
                      </Select>
                      <Select
                        id="gemClass"
                        className="formField"
                        value={singleGemClass}
                        onChange={e => onGemClass(e)}
                        sx= {{
                          backgroundColor: "#1a1a1a",
                          color: "#e0e0e0",
                          }}
                        >
                          {classNames.map(className => (
                            <MenuItem value={className} key={className}>{className}</MenuItem>
                          )
                          )};
                      </Select>
                  {/* </div> */}
                  <Button variant="passives" className="buildButton" raised ripple onClick={() => handleGem()}>Add Gem</Button>
                  {/* <Button className="buildButton" raised ripple onClick={() => resetPassives()}>Reset</Button> */}
              </div>
            </div>
          </div>
          <div id="acts">
              {response.map(data => (
                <ActCard data={data} />
              ))}
          </div>
      </div>
  );
}

export default Passives;