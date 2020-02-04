import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

const RowCell = ({ cellData }) => {
    return (
		<div class={
			[style.row,
				(cellData.class == "" ? "" :
					(cellData.class == "green" ? style.green :
						(cellData.class == "yellow" ? style.yellow : style.red)
					)
				)]
				.join(' ')}>
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
        syndicateJson: require('./table.json')
    };
	render({},{syndicateJson}) {
		return (
			<div class={`${style.syndicate} page`}>
				<h1>Syndicate route</h1>
				<div>
                    {syndicateJson.map(row => (
                    	<TableRow row={row} />
                    ))}
                </div>
			</div>
		);
	}
}
