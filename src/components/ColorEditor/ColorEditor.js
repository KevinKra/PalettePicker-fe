import React, { Component } from 'react';
import './ColorEditor.scss';

export default class ColorEditor extends Component {
	state = {
		color: '',
		updated: false
	};

	componentDidMount() {
		this.setState({ color: this.props.palette.hex });
	}

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({ color: value, updated: true });
	};

	handleUpdate = () => {
		this.props.handleColor(this.props.palette, 'update', this.state.color);
		this.setState({ updated: false });
	};

	render() {
		return (
			<article className="ColorEditor" key={this.props.palette.hex}>
				<section className="palette-inputs">
					<div
						className="palette-color"
						style={{
							backgroundColor: this.state.color
						}}
					/>
					<input
						type="text"
						placeholder="#XXXXXX"
						className="color-input"
						value={this.state.color}
						onChange={(e) => this.handleChange(e)}
					/>
				</section>
				<section className="palette-btns">
					<button className="update-btn" type="button" onClick={this.handleUpdate}>
						Update Color
					</button>
					<button
						className="remove-btn"
						type="button"
						onClick={() => this.props.handleColor(this.props.palette, 'remove')}
					>
						<i className="fas fa-lg fa-trash" />
					</button>
				</section>
			</article>
		);
	}
}
