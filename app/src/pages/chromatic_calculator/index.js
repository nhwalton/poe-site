import React, { useEffect, useState } from 'react';
import ReactGA from "react-ga";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Alert, Collapse, IconButton } from '@mui/material';
import './style.css';
import defaultChroms from './defaultChroms.js'

const RecipeTable = (props) => {

    const rows = props.rows
    const display = props.display

    let thAlign = "center"
    let costWeight = "bold"

    if (rows === defaultChroms) {
        thAlign = "center"
        costWeight = "normal"
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          textAlign: "center",
          fontWeight: "bold",
          borderBottom: "none"
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
          borderColor: "#222",
          borderWidth: 2,
          borderRightWidth: "2",
          borderRightColor: "#222",
          borderRightStyle: "solid",
          padding: "0.33em",
        },
        '&:last-child tr': {
          border: 0,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        //   backgroundColor: theme.palette.action.hover,
            backgroundColor: "#292929",
        },
        '&:nth-of-type(even)': {
        //   backgroundColor: theme.palette.action.hover,
            backgroundColor: "#333",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          borderBottom: 0,
        },
        'td:last-child': {
          borderRight: 0,
        },
        'td:nth-of-type(1)': {
          fontWeight: costWeight,
        },
        'td': {
          textAlign: "center",
          color: "#fff",
        },
        'th': {
          textAlign: thAlign,
          color: "#fff",
          paddingLeft: "1em !important",
        }
      }));

    return (
        <div className="recipeTable">
            <TableContainer component={Paper} className="tableContainer">
                <Table sx={{ minWidth: 700, tableLayout: "fixed" }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell key="Recipe">Craft Type</StyledTableCell>
                        <StyledTableCell align="right" key="Average Cost">Average Cost</StyledTableCell>
                        <StyledTableCell align="right" key="Success Chance">Success Chance</StyledTableCell>
                        <StyledTableCell align="right" key="Average Attempts">Average Attempts</StyledTableCell>
                        <StyledTableCell align="right" key="Cost Per Try">Cost Per Try</StyledTableCell>
                        <StyledTableCell align="right" key="Standard Deviation">Standard Deviation</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => {
                        const cheapestClass = row.cheapest ? "cheapest" : ""
                        return(
                            <StyledTableRow key={`${row.recipe_name} header ${index}`} className={cheapestClass}>
                                <StyledTableCell component="th" scope="row" key={`${row.recipe_name} header ${index}`}>{row.recipe_name}</StyledTableCell>
                                <StyledTableCell align="right" key={`${row.recipe_name} avg_cost ${index}`}>{row.average_cost}</StyledTableCell>
                                <StyledTableCell align="right" key={`${row.recipe_name} chance ${index}`}>{row.chance}</StyledTableCell>
                                <StyledTableCell align="right" key={`${row.recipe_name} avg_tries ${index}`}>{row.average_tries}</StyledTableCell>
                                <StyledTableCell align="right" key={`${row.recipe_name} recipe_cost ${index}`}>{row.recipe_cost}</StyledTableCell>
                                <StyledTableCell align="right" key={`${row.recipe_name} std_dev ${index}`}>{row.std_dev}</StyledTableCell>
                            </StyledTableRow>
                        )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
      );
}

const ItemInfo = (props) => {

    const [desiredSocketAlert, setDesiredSocketsAlert] = useState(false);
    const [requirementsAlert, setRequirementsAlert] = useState(false);
    const [totalSocketsAlert, setTotalSocketsAlert] = useState(false);
    const [desiredTotalAlert, setDesiredTotalAlert] = useState(false);

    const [item, setItem] = useState({
        strength: null,
        dexterity: null,
        intelligence: null,
        red: null,
        green: null,
        blue: null,
        sockets: null
    });

    async function getChroms(item) {

        Object.keys(item).forEach(function(key) {
            if (key !== "sockets") {
                if(item[key] === null || isNaN(item[key])) {
                    item[key] = 0;
                }
            }
        });

        const desiredSocketCount = item['red'] + item['green'] + item['blue'];

        if (item['sockets'] > 6) {
            console.log('1')
            setDesiredSocketsAlert(false);
            setRequirementsAlert(false);
            setDesiredTotalAlert(false);
            setTotalSocketsAlert(true);
        } else if (item['strength'] === 0 && item['dexterity'] === 0 && item['intelligence'] === 0 ) {
            console.log('2')
            setTotalSocketsAlert(false);
            setDesiredSocketsAlert(false);
            setDesiredTotalAlert(false);
            setRequirementsAlert(true);
        } else if (desiredSocketCount > 6) {
            console.log('3')
            setTotalSocketsAlert(false);
            setRequirementsAlert(false);
            setDesiredTotalAlert(false);
            setDesiredSocketsAlert(true);
        } else if (item['sockets'] !== null && desiredSocketCount > item['sockets']) {
            console.log('4')
            setTotalSocketsAlert(false);
            setRequirementsAlert(false);
            setDesiredSocketsAlert(false);
            setDesiredTotalAlert(true);
        } else {
            if (item['sockets'] === null || item['sockets'] < desiredSocketCount || isNaN(item['sockets'])) {
                item['sockets'] = desiredSocketCount;
                const socketField = document.getElementById('sockets')
                socketField.value = item['sockets']
            }
            setTotalSocketsAlert(false);
            setRequirementsAlert(false);
            setDesiredSocketsAlert(false);
            const chrom = {
                strength: item.strength,
                dexterity: item.dexterity,
                intelligence: item.intelligence,
                red: item.red,
                green: item.green,
                blue: item.blue,
                sockets: item.sockets
            }
            const chrom_json = JSON.stringify(chrom);
            fetch('/api/chromatic_calculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: chrom_json
            })
            .then(res => res.json())
            .then(data => {
                props.setChroms(data);
            })
            .catch(err => console.error(err));
            };
        }

    return (
        <div className="itemInfo">
            <div className="itemInfoRow">
                <h4>Total Sockets</h4>
                <TextField
                    id="sockets"
                    className="formField item"
                    type="text"
                    placeholder="#"
                    onChange={(e) => setItem({ ...item, sockets: parseInt(e.target.value) })}
                    autoComplete="off"
                />
            </div>
            <div className="itemInfoRow">
                <h4>Requirements</h4>
                <TextField
                    id="strength"
                    className="formField item str"
                    type="text"
                    placeholder="str"
                    onChange={(e) => setItem({ ...item, strength: parseInt(e.target.value) })}
                    autoComplete="off"
                />
                <TextField
                    id="dexterity"
                    className="formField item dex"
                    type="text"
                    placeholder="dex"
                    onChange={(e) => setItem({ ...item, dexterity: parseInt(e.target.value) })}
                    autoComplete="off"
                />
                <TextField
                    id="intelligence"
                    className="formField item int"
                    type="text"
                    placeholder="int"
                    onChange={(e) => setItem({ ...item, intelligence: parseInt(e.target.value) })}
                    autoComplete="off"
                />
            </div>
            <div className="itemInfoRow">
                <h4>Desired Colors</h4>
                <TextField
                    id="red"
                    className="formField item str"
                    type="text"
                    placeholder="R"
                    onChange={(e) => setItem({ ...item, red: parseInt(e.target.value) })}
                    autoComplete="off"
                />
                <TextField
                    id="green"
                    className="formField item dex"
                    type="text"
                    placeholder="G"
                    onChange={(e) => setItem({ ...item, green: parseInt(e.target.value) })}
                    autoComplete="off"
                />
                <TextField
                    id="blue"
                    className="formField item int"
                    type="text"
                    placeholder="B"
                    onChange={(e) => setItem({ ...item, blue: parseInt(e.target.value) })}
                    autoComplete="off"
                />
            </div>
            <div>
                <Button variant="chromCalc" onClick={() => getChroms(item)}>Calculate</Button>
            </div>
            <div>
                <Collapse in={requirementsAlert}>
                    <Alert severity="error" onClose={() => {setRequirementsAlert(false);}}>At least one requirement should be greater than zero.</Alert>
                </Collapse>
                <Collapse in={desiredSocketAlert}>
                    <Alert severity="error" onClose={() => {setDesiredSocketsAlert(false);}}>Total desired colors cannot be greater than 6.</Alert>
                </Collapse>
                <Collapse in={totalSocketsAlert}>
                    <Alert severity="error" onClose={() => {setTotalSocketsAlert(false);}}>Total sockets cannot be greater than 6.</Alert>
                </Collapse>
                <Collapse in={desiredTotalAlert}>
                    <Alert severity="error" onClose={() => {setDesiredTotalAlert(false);}}>Desired sockets cannot be greater than total sockets.</Alert>
                </Collapse>
            </div>
        </div>
    )
}

const CalcInfo = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          textAlign: "center",
          fontWeight: "bold",
          borderBottom: "none"
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
          borderColor: "#222",
          borderWidth: 2,
          borderRightWidth: "2",
          borderRightColor: "#222",
          borderRightStyle: "solid",
          padding: "0.33em",
        },
        '&:last-child tr': {
          border: 0,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        //   backgroundColor: theme.palette.action.hover,
            backgroundColor: "#292929",
        },
        '&:nth-of-type(even)': {
        //   backgroundColor: theme.palette.action.hover,
            backgroundColor: "#333",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          borderBottom: 0,
        },
        'td:last-child': {
          borderRight: 0,
        },
        'td:nth-of-type(1)': {
          fontWeight: "normal",
        },
        'td': {
          textAlign: "center",
          color: "#fff",
        },
        'th': {
          textAlign: "left",
          color: "#fff",
          paddingLeft: "1em !important",
        }
      }));

      return (
        <TableContainer className="tableContainer calcInfo">
            <Table className="calcTable">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Item Type</StyledTableCell>
                    <StyledTableCell>Socket Type</StyledTableCell>
                    <StyledTableCell>Calculation</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell rowSpan={2}>Mono-requirement</StyledTableCell>
                        <StyledTableCell>on-color</StyledTableCell>
                        <StyledTableCell>0.9 * (R + 10) / (R + 20) </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>off-color</StyledTableCell>
                        <StyledTableCell>0.05 + 4.5 / (R + 20)</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell rowSpan={2}>Dual-requirement</StyledTableCell>
                        <StyledTableCell>on-color</StyledTableCell>
                        <StyledTableCell>0.9 * R1 / (R1 + R2)</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>off-color</StyledTableCell>
                        <StyledTableCell> 10% flat chance, regardless of requirements </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
      )
}

const Chromatic = (props) => {

	const display = props.display

    const [chroms, setChroms] = useState(defaultChroms);

    return (
        <React.Fragment>
            <div className="chromWrapper">
                <div className={`chromaticCalculator page ${display}`}>
                    <div className={`titleWrapper ${display}`}>
                        <h1>Chromatic Calculator</h1>
                    </div>
                    <Card variant="chrom">
                        <ItemInfo setChroms={setChroms}/>
                        <RecipeTable rows={chroms} display={display}/>
                        <div className="additionalInfo">
                            <p><i>
                                This page is a port of <a href="https://siveran.github.io/calc.html">Siveran's Chromatic Calculator</a>, which is distributed publicly under <a href="https://creativecommons.org/share-your-work/public-domain/cc0/">CC0</a>. All credit for the design, math, and calculations go to them.
                            </i></p>
                            <p><i>
                                The info below is taken from their calculator and shown here for reference.
                            </i></p>
                            <hr/>
                            <p>
                                <b>Note: </b>Chromatic orbs cannot reroll the same color permutation twice, so the chromatic success chance is always higher than the drop rate.
                            </p>
                            <CalcInfo/>
                            <br/>
                            <b><i>*The formulas and color chances given are not guaranteed to be correct.*</i></b>
                        </div>
                    </Card>
                    {/* <h2>Additional Info</h2> */}
                    {/* <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon variant="expand"/>
                    </ExpandMore>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Card variant="chrom">
                            <p><i>This page is a port of <a href="https://siveran.github.io/calc.html">Siveran's Chromatic Calculator</a>, which is distributed publicly under <a href="https://creativecommons.org/share-your-work/public-domain/cc0/">CC0</a>. All credit for the design, math, and calculations go to them. The info below is copied directly from their calculator and is only shown here as a reference.</i></p>
                            <hr/>
                            <p><b>Note: </b>Chromatic orbs cannot reroll the same color permutation twice, so the chromatic success chance is always higher than the drop rate.</p>
                            <p>For mono-requirement items, on-color: 0.9 * (R + 10) / (R + 20)<br />
                            For mono-requirement items, off-color: 0.05 + 4.5 / (R + 20)<br />
                            For dual-requirement items, on-color: 0.9 * R1 / (R1 + R2)<br />
                            For dual-requirement items, off-color: 10% flat chance, regardless of requirements<br />
                            The formulas and color chances given are not guaranteed to be right (but I tried!)
                            </p>
                        </Card>
                    </Collapse> */}
                </div>
            </div>
        </React.Fragment>
    )
}


export default Chromatic;