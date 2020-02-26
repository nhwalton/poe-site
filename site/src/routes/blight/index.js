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
					<span class={`chip ${towerDetails.damageColor}`}>{towerDetails.damage}</span>
					<span class="chip purple">{towerDetails.action}</span>
					{/* <span class="chip blue">{towerDetails.baseRadius}</span> */}
				</div>
			</div>
		</div>
    );
  };

const TowerCard = ({ data }) => {
    return (
      <Card class={style.towerCard}>
        <h2>{data.name}</h2>
		<div class={style.towerContainer}>
			<img 
				class={style.tower}
                src={'../../assets/towers/' + data.name + '.png'}
                />
			<div class={style.tower}>
				<span class={`chip ${data.damageColor}`}>{data.damage}</span>
				<span class="chip purple">{data.action}</span>
				<span class="chip blue">Upgrade to {data.recommendedTier}</span>
				<span class="chip cyan">Place {data.recommendedPlacement}</span>
			</div>
		</div>
		{/* <p><b>Recommended Tier:</b> {data.recommendedTier}</p> */}
		{/* <p><b>Recommended Placement:</b> {data.recommendedPlacement}</p> */}
		<h3>Tier IV Upgrades</h3>
        {data.upgrades.map(towerDetails => (
          <UpgradedTower towerDetails={towerDetails} />
        ))}
		<h3>Notes</h3>
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
