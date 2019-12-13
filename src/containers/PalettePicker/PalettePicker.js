import React, { Component } from 'react';
import ColorScheme from 'color-scheme';
import ColorBar from '../../components/ColorBar/ColorBar';
import EditBarFull from '../../components/EditBarFull/EditBarFull';
import EditBarPartial from '../../components/EditBarPartial/EditBarPartial';
import { withRouter } from 'react-router-dom';
import * as actions from '../../_redux/actions';
import * as helpers from '../../helpers';
import { connect } from 'react-redux';
import './PalettePicker.scss';

class PalettePicker extends Component {
	state = {
		hue: '',
		hueLocked: false,
		colorScheme: 'triade',
		variation: 'pastel',
		colors: [],
		editable: false
	};

	componentDidMount() {
		this.generateColors();
	}

	componentDidUpdate() {
		this.props.updateCurrentPalette(this.state.colors);
	}

	saveDialogOpen = () => {
		this.props.history.push('palette/save');
	};

	// reworked
	toggleLock = () => {
		this.state.hueLocked ? this.setState({ hueLocked: false }) : this.setState({ hueLocked: true });
	};

	toggleEditBarFull = () => {
		const { editable } = this.state;
		this.setState({ editable: !editable });
	};

	updatePaletteFeature = (e, feature) => {
		const { value } = e.target;
		this.setState({ [feature]: value });
	};

	togglePaletteLock = (targetColor, lockStatus) => {
		const { colors } = this.state;
		const index = colors.findIndex((color) => targetColor === color);
		colors.slice()[index].locked = lockStatus;
		this.setState({ colors });
	};

	// vanilla
	updateColors = (e, previousColors) => {
		e.preventDefault();
		this.generateColors(previousColors);
	};

	generateColors = async (previousColors = []) => {
		// The possible values are 'mono', 'contrast', 'triade', 'tetrade', and 'analogic'
		const { hue, hueLocked, colorScheme, variation, colors } = this.state;
		const { propColorScheme = 'triade' } = this.props;

		const hueToUse = !hueLocked ? helpers.generateRandomHue() : hue;

		// const hueToUse = generatedHue || hue;
		const colorSchemeToUse = colorScheme || propColorScheme;

		// instantiate the ColorScheme package with our define state and props
		const scheme = new ColorScheme();
		scheme.from_hue(hueToUse).scheme(colorSchemeToUse).variation(variation);
		// generate array of objects to be used for palette board
		const generatedColors = scheme.colors().map((color) => {
			return { hex: '#' + color, locked: false };
		});
		// handling new palette generation
		if (previousColors.length !== generatedColors.length) {
			// if the previous/current palettes are a different size, generate an entirely new palette
			this.setState({ colors: generatedColors, hue: hueToUse });
		} else {
			// if the previous/current palettes are the same size, update the current palette
			colors.forEach((color, i) => {
				if (color.locked === true) generatedColors.splice(i, 1, color);
			});
			this.setState({ colors: generatedColors, hue: hueToUse });
		}
	};

	render() {
		const colors = this.state.colors.map((color, i) => {
			return (
				<ColorBar
					color={color}
					vRotate={this.props.vRotate}
					number={i}
					togglePaletteLock={this.togglePaletteLock}
					key={i}
				/>
			);
		});

		return (
			<section className="PalettePicker">
				<EditBarPartial
					editable={this.state.editable}
					hue={this.state.hue}
					hueLocked={this.state.hueLocked}
					colorScheme={this.state.colorScheme}
					variation={this.state.variation}
					colors={this.state.colors}
					updateColors={this.updateColors}
					toggleLock={this.toggleLock}
				/>
				<EditBarFull
					editable={this.state.editable}
					hue={this.state.hue}
					hueLocked={this.state.hueLocked}
					colors={this.state.colors}
					updatePaletteFeature={this.updatePaletteFeature}
					updateHue={this.updateHue}
					toggleLock={this.toggleLock}
					updateVariation={this.updateVariation}
					updateColorScheme={this.updateColorScheme}
				/>
				<div className="colors-section">{colors}</div>
				<div className="button-bar">
					<button className="primary-btn" onClick={this.toggleEditBarFull}>
						Edit
					</button>
					<button className="primary-btn" onClick={this.saveDialogOpen}>
						Save
					</button>
				</div>
			</section>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	createNewProject: (project) => dispatch(actions.createNewProject(project)),
	updateExistingProject: (project) => dispatch(actions.updateExistingProject(project)),
	updateCurrentPalette: (palette) => dispatch(actions.updateCurrentPalette(palette))
});

export default connect(null, mapDispatchToProps)(withRouter(PalettePicker));
