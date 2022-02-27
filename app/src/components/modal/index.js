import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Card, Collapse, FormControl, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { useRef, useState } from "react";
import './index.css';

export const Modal = ({setStrategyModal, setLocalStrategies, setStrategy, initialJson}) => {
  // close the modal when clicking outside the modal.
    const modalRef = useRef();

    const closeModal = (e) => {
    if (e.target === modalRef.current) {
        setStrategyModal(false);
    }
    };

    function appendModifier(newStrategyTitle, newStrategyOrder) {
        if (newStrategyTitle === '') {
            setTitleAlert(true);
        } else if (newStrategyOrder.indexOf('Select a Modifier') !== -1) {
            setModAlert(true);
        } else {
            const strategyIcon = newStrategyTitle.toLowerCase().replace(/\s/g, "-");
            const strategyRewardMod = newStrategyOrder.join(', ')
            const strategyRecipe = newStrategyOrder.map(modifier => {
                return( modifier.toLowerCase().replace(/\s/g, "-") );
            });

            const newStrategy = {
                "title": newStrategyTitle,
                "icon": strategyIcon,
                "image":"images/modifiers/archnemesis-league.png",
                "description":"",
                "recipe": strategyRecipe,
                "rewards":[],
                "rewardMod": strategyRewardMod
            }
        
            const localStrats = JSON.parse(localStorage.getItem('localStrategies'));
            const thisStrategy = {
                'title': newStrategy.icon,
                'order': [newStrategy.icon]
            }
            localStrats[thisStrategy['title']] = newStrategy
            localStorage.setItem("selectedModifier",JSON.stringify(thisStrategy))
            localStorage.setItem('localStrategies', JSON.stringify(localStrats));

            setStrategy(thisStrategy)
            setLocalStrategies(localStrats);
            setStrategyModal(false);
        }
    }

    const options = Object.keys(initialJson['modifiers']).sort().map(function(key) {
        let value = {
            "title": initialJson['modifiers'][key]['title'],
            "icon": initialJson['modifiers'][key]['icon']
        };
        return(
            <MenuItem className="modSelect" value={value.title} key={key}>
                {value.title}
            </MenuItem>
        );
    });

    const [newStrategyTitle, setNewStrategyTitle] = useState('');
    const [newStrategyOrder, setNewStrategyOrder] = useState(['Select a Modifier', 'Select a Modifier', 'Select a Modifier', 'Select a Modifier']);
    const [titleAlert, setTitleAlert] = useState(false);
    const [modAlert, setModAlert] = useState(false);

    const handleChange = (e, index) => {
        let thisStrategyItem = e.target.value;
        setNewStrategyOrder(newStrategyOrder.map((value, i) => i !== index ? value : thisStrategyItem));
    }

    const localStrats = JSON.parse(localStorage.getItem('localStrategies'));

    function deleteLocal(key) {
        const revertModifier = {
			"title":"heralding-minions",
			"order":
				["heralding-minions"]
			}
        const currentStrats = JSON.parse(localStorage.getItem('localStrategies'));
        delete currentStrats[key];
        if (Object.keys(currentStrats).length === 0) {
            setStrategy(revertModifier)
            localStorage.setItem("selectedModifier",JSON.stringify(revertModifier))
        } else {
            const nextStrat = currentStrats[Object.keys(currentStrats)[0]];
            const setStrat = {
                "title":nextStrat.icon,
                "order":
                    [nextStrat.icon]
            }
            setStrategy(setStrat);
            localStorage.setItem("selectedModifier",JSON.stringify(setStrat));
        }
        localStorage.setItem('localStrategies', JSON.stringify(currentStrats));
        setLocalStrategies(currentStrats);
        return(null);
    }

    let stratsArr = []
    const strats = Object.keys(localStrats).map(function(key) {
        const title = localStrats[key]['title'];
        const children = localStrats[key]['rewardMod']
        stratsArr.push(localStrats[key])
        return(
            <ListItem variant="localMod" secondaryAction = {
                <IconButton edge="end" aria-label="delete" variant="delete">
                    <DeleteIcon onClick={() => deleteLocal(key)}/>
                </IconButton>
                }
            value={key} >
                <ListItemText
                    primary={title}
                    secondary={children}
                    secondaryTypographyProps={{ sx: { color: "#999" } }}
                    variant="customStrat"/>
          </ListItem>
        );
    });
  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
            <Card variant="modal">
                <div className="modalContainer">
                    <div className="modalLeft">
                        <h2>New Strategy</h2>
                        <div className="newStrategy">
                            <FormControl sx={{ m: 0, minWidth: "100%" }} required>
                                <TextField className="newStratItem" type="text" placeholder="Strategy Name" onChange={(e) => setNewStrategyTitle(e.target.value)}/>
                            </FormControl>
                                {[...Array(4),].map((value, index) => (
                                    <FormControl sx={{ m: 0, minWidth: "100%" }}>
                                        <Select
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            value={newStrategyOrder[index]}
                                            className="newStratItem"
                                            key={index}
                                            onChange={(e) => handleChange(e, index)}>
                                                <MenuItem value={'Select a Modifier'} disabled hidden>
                                                    Select a Modifier
                                                </MenuItem>
                                                {options}
                                        </Select>
                                    </FormControl>
                                ))}
                                <div>
                                    <Collapse in={titleAlert}>
                                        <Alert severity="error" onClose={() => {setTitleAlert(false);}}>Please title your strategy.</Alert>
                                    </Collapse>
                                    <Collapse in={modAlert}>
                                        <Alert severity="error" onClose={() => {setModAlert(false);}}>Please select all four modifiers.</Alert>
                                    </Collapse>
                                </div>
                                <Button variant="addStrategy" className="newStratItem" onClick={() => appendModifier(newStrategyTitle, newStrategyOrder)}>Add Strategy</Button>
                        </div>
                    </div>
                    <div className="modalRight">
                        <h2>Custom Strategies</h2>
                        <div className="localList">
                            <List type="test" className="localSelect" value={[]}>
                                {strats}
                            </List>
                        </div>
                    </div>
                </div>
                <div className="closeIcon">
                <IconButton edge="end" aria-label="delete" variant="delete">
                    <CloseIcon onClick={() => setStrategyModal(false)}></CloseIcon>
                </IconButton>
                </div>
            </Card>
        </div>
    </div>
  );
};