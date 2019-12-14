import React, { Component } from 'react';
import './ColorBar.scss';

export default class ColorBar extends Component {
	render() {
		const { togglePaletteLock, color, number, vRotate } = this.props;

		const colorBarStyle = {
			backgroundColor: `${color.hex}`
		};
		const defaultStyle = {
			transform: 'translateY(-150%)',
			animation: `move 0.7s ease-in ${number / 8}s forwards`
		};
		const lockedBarStyle = {
			backgroundColor: `${color.hex}`,
			borderBottom: '5px solid black'
		};
		const lockedStyle = {
			visibility: 'visible',
			height: '15%',
			opacity: 1
		};
		return (
			<section
				className="color-block"
				style={defaultStyle}
				onClick={color.locked ? () => togglePaletteLock(color, false) : () => togglePaletteLock(color, true)}
			>
				<div className={`color-bar color-${number + 1}`} style={color.locked ? lockedBarStyle : colorBarStyle}>
					<p className={vRotate && 'color-bar-text-vertical'}>{color.hex.toUpperCase()}</p>
				</div>
				<button className="lock-button" style={color.locked ? lockedStyle : null}>
					{color.locked ? <i className="fas fa-2x fa-lock" /> : <i className="fas fa-2x fa-unlock-alt" />}
				</button>
			</section>
		);
	}
}
