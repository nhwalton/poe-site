import { h, Component, createRef } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import defaultJson from './table.json';

const handleClick = (e) => {
	console.log(e.currentTarget.className)
	e.currentTarget.className = (e.currentTarget.className == style.row ? style.green :
								(e.currentTarget.className == style.green ? style.yellow :
								(e.currentTarget.className == style.yellow ? style.red :
								style.row
	)))
};

const RowCell = ({ cellData }) => {
	const defaultClass = (cellData.class == "" ? style.row :
							(cellData.class == "green" ? style.green :
								(cellData.class == "yellow" ? style.yellow : style.red)
							))
    return (
		<div
			onClick = { e => handleClick(e) }
			data-default = {defaultClass}
			className = {cellData.class == "" ? style.row :
						(cellData.class == "green" ? style.green :
							(cellData.class == "yellow" ? style.yellow : style.red)
						)}
					>
			<img
				style="max-width:100%;"
				src={'../../assets/syndicate/' + cellData.image + '.png'}
				/>
		</div>
    );
};

const TableRow = ({ row }) => {
    return (
		<div class={style.rowWrapper}>
			{row.cells.map(cell => (
			<RowCell cellData={cell} />
			))}
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
                    {syndicateJson.map(row => (
                    	<TableRow row={row} />
                    ))}
                </div>
			</div>
		);
	}
}
