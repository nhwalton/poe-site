import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import towersInfo from './towers.json';

const UpgradedTower = ({ towerDetails }) => {
    return (
		<div>
			<h4>{towerDetails.name}</h4>
			<div class={style.towerContainer}>
				<img 
					class={style.tower}
					src={'../../assets/towers/' + towerDetails.name + '.png'}
					/>
				<div class={style.tower}>
					<span class={`pill ${towerDetails.damageColor}`}>{towerDetails.damage}</span>
					<span class="pill purple">{towerDetails.action}</span>
					{/* <span class="chip blue">{towerDetails.baseRadius}</span> */}
				</div>
			</div>
		</div>
    );
  };

const TowerCard = ({ data }) => {
    return (
      <Card class={style.towerCard} style={`border-color:${data.borderColor}`}>
        <h1>{data.name}</h1>
		<div class={style.towerContainer}>
			<img 
				class={style.tower}
                src={'../../assets/towers/' + data.name + '.png'}
                />
			<div class={style.tower}>
				<span class={`pill ${data.damageColor}`}>{data.damage}</span>
				<span class="pill purple">{data.action}</span>
				<span class="pill blue">Upgrade to {data.recommendedTier}</span>
				<span class="pill cyan">Place {data.recommendedPlacement}</span>
			</div>
		</div>
		<hr></hr>
		<h2>Tier IV Upgrades</h2>
        {data.upgrades.map(towerDetails => (
          <UpgradedTower towerDetails={towerDetails} />
        ))}
		<hr></hr>
		<h2>Notes</h2>
		<span>{data.notes}</span>
      </Card>
    );
  };

const Towers = () => {
	return (
		<div class={`${style.towers} page`}>
			<div class="titleWrapper">
				<h1>Blight Towers</h1>
			</div>
			<div id={style.towers}>
				{towersInfo.map(data => (
						<TowerCard data={data} />
						)
					)
				}
			</div>
		</div>
	);
}

export default Towers;
