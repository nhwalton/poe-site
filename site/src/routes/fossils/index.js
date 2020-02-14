import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import fossilLocations from './table.json';

const Fossil = ({ fossilDetails }) => {
    return (
        <div class={style.fossilContainer}>
			<img 
				class={style.fossil}
                data-name={fossilDetails.fossil_name}
                src={'../../assets/fossils/' + fossilDetails.fossil_name + ' Fossil.png'}
                />
			<div class={style.fossil}>
				<span class={style.fossilName}>{fossilDetails.fossil_name}</span>
				<span class={style.fossilEffect}>{fossilDetails.fossil_effect}</span>
				<span class={style.fossilEffect}>{fossilDetails.fossil_effect2}</span>
			</div>
		</div>
    );
  };

const ZoneCard = ({ fossils, zoneName }) => {
    return (
      <Card class={style.zoneCard}>
        <h2>{zoneName}</h2>
        {fossils.map(fossil => (
          <Fossil fossilDetails={fossil} />
        ))}
      </Card>
    );
  };

const Fossils = () => {
	return (
		<div class={`${style.fossils} page`}>
			<div class="titleWrapper">
				<h1>Fossil Locations</h1>
			</div>
			<div id={style.zones}>
				{Object.keys(fossilLocations).map(function(key) {
					return(
						<ZoneCard fossils={fossilLocations[key]} zoneName={key} />
						)
					}
					)
				}
			</div>
		</div>
	);
}

export default Fossils;
