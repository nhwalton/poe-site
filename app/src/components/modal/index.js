import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
        console.log(newStrategyTitle, newStrategyOrder)
        const strategyIcon = newStrategyTitle.toLowerCase().replace(/\s/g, "-");
        const strategyRewardMod = newStrategyOrder.join(', ')
        const strategyRecipe = newStrategyOrder.map(modifier => {
            console.log(modifier)
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

        console.log('new',newStrategy);
    
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

    const options = Object.keys(initialJson['modifiers']).sort().map(function(key) {
        let value = {
            "title": initialJson['modifiers'][key]['title'],
            "icon": initialJson['modifiers'][key]['icon']
        };
        return(
            <MenuItem value={value.title} key={key}>
                {value.title}
            </MenuItem>
        );
    });

    const [newStrategyTitle, setNewStrategyTitle] = useState('');
    const [newStrategyOrder, setNewStrategyOrder] = useState(['arakaali-touched', 'arakaali-touched', 'arakaali-touched', 'arakaali-touched']);

    const handleChange = (e, index) => {
        console.log('setting',newStrategyOrder);
        let thisStrategyItem = e.target.value;
        setNewStrategyOrder(newStrategyOrder.map((value, i) => i != index ? value : thisStrategyItem));
    }

    const localStrats = JSON.parse(localStorage.getItem('localStrategies'));

    function deleteLocal(strategy) {
        // delete localStrats[strategy];
        // localStorage.setItem('localStrategies', JSON.stringify(localStrats));
        // setLocalStrategies(localStrats);
    }

    let stratsArr = []
    const strats = Object.keys(localStrats).map(function(key) {
        const title = localStrats[key]['title'];
        const children = localStrats[key]['recipe']
        console.log(key, localStrats[key])
        stratsArr.push(localStrats[key])
        return(
            <ListItem secondaryAction = {
                <IconButton edge="end" aria-label="delete" variant="delete">
                    <DeleteIcon onClick={deleteLocal(key)}/>
                </IconButton>
                }
            value="key" button >
                <ListItemText primary={title} secondary={children} variant="customStrat"/>
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
                            <input className="newStratItem" type="text" placeholder="Strategy Name" onChange={(e) => setNewStrategyTitle(e.target.value)}/>
                            {[...Array(4),].map((value, index) => (
                                <Select type="text" value='' className="newStratItem" placeholder="Strategy Name" key={index} onChange={(e) => handleChange(e, index)}>
                                    {options}
                                </Select>
                            ))}
                            <button className="newStratItem" onClick={() => appendModifier(newStrategyTitle, newStrategyOrder)}>Add Strategy</button>
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
                <button onClick={() => setStrategyModal(false)}>X</button>
            </Card>
        </div>
    </div>
  );
};