import React from 'react';
import './EditBarFull.scss';

export default function EditBarFull(props) {
	const editBarActive = {
		transform: 'translateY(-1vh)'
	};

	const generateRadios = (format) => {
		const schemeNames = [ 'mono', 'contrast', 'triade', 'tetrade', 'analogic' ];
		const variationNames = [ 'default', 'pastel', 'soft', 'light', 'hard', 'pale' ];
		// Dropped fully-DRY version because it was difficult to read. I like this version _a lot_ more.
		if (format === 'colors') {
			return schemeNames.map((name, i) => {
				return (
					<label htmlFor={name} key={i}>
						{name}
						<input
							type="radio"
							name="colorScheme-selection"
							value={name}
							defaultChecked={props.colorScheme === name ? true : false}
							onClick={(e) => props.updatePaletteFeature(e, 'colorScheme')}
						/>
					</label>
				);
			});
		} else {
			return variationNames.map((name, i) => {
				return (
					<label htmlFor={name} key={i}>
						{name}
						<input
							type="radio"
							name="variation-selection"
							value={name}
							defaultChecked={props.variation === name ? true : false}
							onClick={(e) => props.updatePaletteFeature(e, 'variation')}
						/>
					</label>
				);
			});
		}
	};

	const colorSchemes = generateRadios('colors');
	const colorVariations = generateRadios('variations');

	return (
		<section className="edit-block" style={props.showFullEditBar ? editBarActive : null}>
			<form className="edits-form" onSubmit={(e) => props.updateColors(e, props.colors)}>
				<div className="hue-selection-container">
					<h4>Hue Selection:</h4>
					<div className="hue-selection-inputs">
						<label htmlFor="hue-selection">
							<input
								type="text"
								placeholder="default: random"
								autoComplete="off"
								name="hue-selection"
								value={props.hue}
								onChange={props.updateHue}
							/>
						</label>
						{props.hueLocked ? (
							<button onClick={props.toggleHueLock}>Unlock</button>
						) : (
							<button onClick={props.toggleHueLock}>Lock</button>
						)}
					</div>
				</div>
				<section className="radio-styles">
					<h4>Color schemes:</h4>
					{colorSchemes}
				</section>
				<section className="radio-styles">
					<h4>Color Variations:</h4>
					{colorVariations}
				</section>
				<button className="update-btn">
					<p>Update</p>
				</button>
			</form>
			<footer>
				<button className="close-btn" onClick={props.toggleFullEditBar}>
					Close
				</button>
			</footer>
		</section>
	);
}
