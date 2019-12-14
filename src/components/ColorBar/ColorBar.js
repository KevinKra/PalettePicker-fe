import React from 'react';
import './ColorBar.scss';

export default function ColorBar(props) {
	const colorBarStyle = {
		backgroundColor: `${props.color.hex}`
	};
	const defaultStyle = {
		transform: 'translateY(-150%)',
		animation: `move 0.7s ease-in ${props.number / 8}s forwards`
	};
	const lockedBarStyle = {
		backgroundColor: `${props.color.hex}`,
		borderBottom: '5px solid black'
	};
	const lockedStyle = {
		visibility: 'visible',
		height: '15%',
		opacity: 1
	};
	return (
		<div
			className="color-block"
			onClick={
				props.color.locked ? (
					() => props.handleLockStatus(props.color, false)
				) : (
					() => props.handleLockStatus(props.color, true)
				)
			}
			style={defaultStyle}
		>
			<div
				className={`color-bar color-${props.number + 1}`}
				style={props.color.locked ? lockedBarStyle : colorBarStyle}
			>
				<p className={props.vRotate && 'color-bar-text-vertical'}>{props.color.hex.toUpperCase()}</p>
			</div>
			<button className="lock-button" style={props.color.locked ? lockedStyle : null}>
				{props.color.locked ? <i className="fas fa-2x fa-lock" /> : <i className="fas fa-2x fa-unlock-alt" />}
			</button>
		</div>
	);
}
