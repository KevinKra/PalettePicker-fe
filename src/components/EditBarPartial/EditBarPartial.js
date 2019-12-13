import React from 'react';
import './EditBarPartial.scss';

export default function EditBarPartial(props) {
	return (
		<section className={`${!props.editable ? 'PhraseBlock pb-active' : 'PhraseBlock pb-inactive'}`}>
			<header className="phrase-background">
				<h2>Choose a color!</h2>
			</header>
			<section className="phrase-block-content">
				<button
					className={props.hueLocked ? 'phrase-button locked-btn' : 'phrase-button'}
					onClick={(e) => props.updateColors(e, props.colors)}
				>
					Refresh Colors
				</button>
				<div className="current-format">
					<div className="format-hue">
						<p>{props.hue || props.hue}</p>
						{props.hueLocked ? (
							<i className="fas fa-sm fa-lock" onClick={props.toggleLock} />
						) : (
							<i className="fas fa-sm fa-unlock-alt" onClick={props.toggleLock} />
						)}
					</div>
					<p>{props.colorScheme}</p>
					<p>{props.variation}</p>
				</div>
			</section>
		</section>
	);
}
