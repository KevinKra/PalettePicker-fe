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

	toggleLock = () => {
		this.state.hueLocked ? this.setState({ hueLocked: false }) : this.setState({ hueLocked: true });
	};

	toggleEditBarFull = () => {
		const { editable } = this.state;
		this.setState({ editable: !editable });
	};

	togglePaletteLock = (targetColor, lockStatus) => {
		const { colors } = this.state;
		const index = colors.findIndex((color) => targetColor === color);
		colors.slice()[index].locked = lockStatus;
		this.setState({ colors });
	};

	updatePaletteFeature = (e, feature) => {
		const { value } = e.target;
		this.setState({ [feature]: value });
	};

	updateColors = (e, previousColors) => {
		e.preventDefault();
		this.generateColors(previousColors);
	};

	paletteGenerator = (previousColors, newColors, hue) => {
		if (previousColors.length !== newColors.length) {
			this.setState({ colors: newColors, hue });
		} else {
			previousColors.forEach((color, i) => {
				if (color.locked === true) newColors.splice(i, 1, color);
			});
			this.setState({ colors: newColors, hue });
		}
	};

	generateColors = async (previousColors = []) => {
		const { hue, hueLocked, colorScheme, variation } = this.state;
		const { propColorScheme = 'triade' } = this.props;

		const hueToUse = !hueLocked ? helpers.generateRandomHue() : hue;
		const colorSchemeToUse = colorScheme || propColorScheme;

		const scheme = new ColorScheme();
		scheme.from_hue(hueToUse).scheme(colorSchemeToUse).variation(variation);

		const newColors = scheme.colors().map((color) => {
			return { hex: '#' + color, locked: false };
		});

		this.paletteGenerator(previousColors, newColors, hueToUse);
	};

	render() {
		const { editable, hue, hueLocked, colorScheme, variation, colors } = this.state;
		const palettes = this.state.colors.map((color, i) => {
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
					editable={editable}
					hue={hue}
					hueLocked={hueLocked}
					colorScheme={colorScheme}
					variation={variation}
					colors={colors}
					updateColors={this.updateColors}
					toggleLock={this.toggleLock}
				/>
				<EditBarFull
					editable={editable}
					hue={hue}
					hueLocked={hueLocked}
					colors={colors}
					updatePaletteFeature={this.updatePaletteFeature}
					updateColors={this.updateColors}
					toggleLock={this.toggleLock}
					updateVariation={this.updateVariation}
				/>
				<div className="colors-section">{palettes}</div>
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
