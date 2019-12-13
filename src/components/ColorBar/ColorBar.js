import React, { Component } from 'react';
import './ColorBar.css';

export default class ColorBar extends Component {
	render() {
		const colorBarStyle = {
			backgroundColor: `${this.props.color.hex}`
		};
		const defaultStyle = {
			transform: 'translateY(-150%)',
			animation: `move 0.7s ease-in ${this.props.number / 8}s forwards`
		};
		const lockedBarStyle = {
			backgroundColor: `${this.props.color.hex}`,
			borderBottom: '5px solid black'
		};
		const lockedStyle = {
			visibility: 'visible',
			height: '15%',
			opacity: 1
		};
		return (
			<div className="color-block" style={defaultStyle}>
				<div
					className={`color-bar color-${this.props.number + 1}`}
					style={this.props.color.locked ? lockedBarStyle : colorBarStyle}
				>
					<p className={this.props.vRotate && 'color-bar-text-vertical'}>
						{this.props.color.hex.toUpperCase()}
					</p>
				</div>
				<button
					className="lock-button"
					onClick={
						this.props.color.locked ? (
							() => this.props.togglePaletteLock(this.props.color, false)
						) : (
							() => this.props.togglePaletteLock(this.props.color, true)
						)
					}
					style={this.props.color.locked ? lockedStyle : null}
				>
					{this.props.color.locked ? (
						<i className="fas fa-2x fa-lock" />
					) : (
						<i className="fas fa-2x fa-unlock-alt" />
					)}
				</button>
			</div>
		);
	}
}
