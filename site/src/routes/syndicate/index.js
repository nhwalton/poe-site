import { h, Component, createRef } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';

//move format over to Blake's to have access to setState
//try including syndicateJson in export default Passives = (syndicateJson) =>

const handleClick = (e) => {
	// const cellIndex = defaultJson.find(x => x.title === e.currentTarget.dataset.title)
	console.log(cellIndex)
	console.log(e.currentTarget.className)
	e.currentTarget.className = (e.currentTarget.className == style.row ? style.green :
								(e.currentTarget.className == style.green ? style.yellow :
								(e.currentTarget.className == style.yellow ? style.red :
								style.row
								)))
};

const updateState = () => {

}

const RowCell = ({ cellData , rowName }) => {
	// console.log(defaultJson)
	const cellTitle = cellData.title
	const defaultClass = 
							(cellData.class == "" ? style.row :
							(cellData.class == "green" ? style.green :
							(cellData.class == "yellow" ? style.yellow : style.red)
							))
    return (
		<div
			onClick = { e => handleClick(e) }
			data-title = {cellTitle}
			className = {defaultClass}
					>
			<img
				style="max-width:100%;"
				src={'../../assets/syndicate/' + cellData.image + '.png'}
				/>
		</div>
    );
};

const TableRow = ({ row , rowName }) => {
	console.log(rowName)
    return (
		<div class={style.rowWrapper}>
			{row.map(function(cell) {
				return(
				<RowCell cellData={cell} rowName={rowName}/>
				)
			}
			)
			}
		</div>
    );
};

export default class Syndicate extends Component {
	
	state = {
        syndicateJson: defaultJson
	};

	// resetColors() {
	// 	console.log("reset")
	// 	this.setState({syndicateJson: defaultJson})
	// }

	render({},{syndicateJson}) {
		return (
			<div class={`${style.syndicate} page`}>
				<h1>Syndicate route</h1>
				{/* <Button onClick={() => this.resetColors()}>Reset</Button> */}
				<div>
                    {Object.keys(syndicateJson).map(function(key) {
						return (
							<TableRow row={syndicateJson[key]} rowName={key}/>
						)
					}
					
					)
					// 	row => (
                    // 	<TableRow row={row} />
					// ))
					}
                </div>
			</div>
		);
	}
}
