import React from 'react';
import './EditBarFull.css';

export default function EditBarFull(props) {
	const editBarActive = {
		transform: 'translateY(-9%)'
	};

	const generateRadios = (type) => {
		const schemeNames = [ 'mono', 'contrast', 'triade', 'tetrade', 'analogic' ];
		const variationNames = [ 'default', 'pastel', 'soft', 'light', 'hard', 'pale' ];
		const radioName = type == 'colorsScheme' ? 'colorScheme-selection' : 'variation-selection';
		const radioMethod =
			type == 'colorScheme'
				? (e) => props.updatePaletteFeature(e, 'colorScheme')
				: (e) => props.updatePaletteFeature(e, 'variation');
		return (type == 'colorScheme' ? schemeNames : variationNames).map((name) => {
			return (
				<label htmlFor={name}>
					{name}
					<input
						type="radio"
						name={radioName}
						value={name}
						defaultChecked={props.colorScheme === name ? true : false}
						onClick={radioMethod}
					/>
				</label>
			);
		});
	};

	const colorSchemes = generateRadios('colorScheme');
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
		</section>
	);
}
