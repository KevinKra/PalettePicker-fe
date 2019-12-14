import React, { Component } from 'react';
import ColorScheme from 'color-scheme';
import ColorBar from '../../components/ColorBar/ColorBar';
import EditBarFull from '../../components/EditBarFull/EditBarFull';
import EditBarPartial from '../../components/EditBarPartial/EditBarPartial';
import * as helpers from '../../_utilities/helpers';
import { withRouter } from 'react-router-dom';
import * as actions from '../../_redux/actions';
import { connect } from 'react-redux';
import './PalettePicker.css';

export class PalettePicker extends Component {
	state = {
		hue: '',
		hueLocked: false,
		colorScheme: 'mono',
		variation: 'light',
		colors: [],
		showFullEditBar: false
	};

	componentDidMount() {
		this.generateColors();
	}

	componentDidUpdate() {
		this.props.updateCurrentPalette(this.state.colors);
	}

	saveDialogOpen = () => {
		this.props.history.push('save-palette');
	};

	toggleHueLock = () => {
		const { hueLocked } = this.state;
		this.setState({ hueLocked: !hueLocked });
	};

	toggleFullEditBar = () => {
		const { showFullEditBar } = this.state;
		this.setState({ showFullEditBar: !showFullEditBar });
	};

	updatePaletteFeature = (e, feature) => {
		const { value } = e.target;
		this.setState({ [feature]: value });
	};

	updateHue = (e) => {
		const { value } = e.target;
		this.setState({ hue: value });
	};

	updateColors = (e, previousColors) => {
		e.preventDefault();
		this.generateColors(previousColors);
	};

	handleLockStatus = (targetColor, lockStatus) => {
		const colorIndex = this.state.colors.findIndex((color) => {
			return targetColor === color;
		});
		const colors = this.state.colors.slice();
		colors[colorIndex].locked = lockStatus;
		this.setState({ colors });
	};

	buildPalettes = (colors) =>
		colors.map((color) => {
			return { hex: '#' + color, locked: false };
		});

	renderPalettes = (previousPalettes, newPalettes, currentPalettes, hueToUse) => {
		if (previousPalettes.length !== newPalettes.length) {
			this.setState({ colors: newPalettes, hue: hueToUse });
		} else {
			// iterate through currentPalettes, if one is locked, splice newPalettes[i] and inject current.
			// output will now consist of newPalette selection composed with previously locked palettes.
			currentPalettes.forEach((palette, i) => {
				if (palette.locked === true) newPalettes.splice(i, 1, palette);
			});
			this.setState({ colors: newPalettes, hue: hueToUse });
		}
	};

	generateColors = async (previousColors = []) => {
		const { hue, hueLocked, colorScheme, variation, colors } = this.state;
		const { pColorScheme = 'mono' } = this.props;
		const hueToUse = !hueLocked ? helpers.generateRandomHue() : hue;
		const schemeToUse = colorScheme ? colorScheme : pColorScheme;
		const scheme = new ColorScheme();
		scheme.from_hue(hueToUse).scheme(schemeToUse).variation(variation);
		const palettes = this.buildPalettes(scheme.colors());
		this.renderPalettes(previousColors, palettes, colors, hueToUse);
	};

	render() {
		const { hueLocked, showFullEditBar, hue, colorScheme, variation, colors, vRotate } = this.state;

		const palettes = colors.map((color, i) => {
			return (
				<ColorBar color={color} vRotate={vRotate} number={i} handleLockStatus={this.handleLockStatus} key={i} />
			);
		});

		return (
			<section className="PalettePicker">
				<EditBarPartial
					toggleHueLock={this.toggleHueLock}
					updateColors={this.updateColors}
					hueLocked={hueLocked}
					showFullEditBar={showFullEditBar}
					hue={hue}
					colorScheme={colorScheme}
					variation={variation}
					colors={colors}
				/>
				<EditBarFull
					toggleHueLock={this.toggleHueLock}
					updatePaletteFeature={this.updatePaletteFeature}
					updateColors={this.updateColors}
					updateHue={this.updateHue}
					toggleFullEditBar={this.toggleFullEditBar}
					showFullEditBar={showFullEditBar}
					colorScheme={colorScheme}
					variation={variation}
					hue={hue}
					hueLocked={hueLocked}
					colors={colors}
				/>
				<div className="colors-section">{palettes}</div>
				<div className="button-bar">
					<button className="primary-btn" onClick={this.toggleFullEditBar}>
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
