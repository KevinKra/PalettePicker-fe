import React, { Fragment } from 'react';
import './PaletteEditor.scss';

export default function PaletteEditor(props) {
	const handleExit = () => {
		props.history.goBack();
	};
	return (
		<Fragment>
			<div className="screen" />
			<section className="PaletteEditor">
				<button className="editor-exit" onClick={handleExit}>
					X
				</button>
				<form className="editor-form" action="">
					<h3 className="editor-title">Title</h3>
					<label htmlFor="">Label 1</label>
					<input type="text" />
					<label htmlFor="">Label 2</label>
					<input type="text" />
				</form>
			</section>
		</Fragment>
	);
}
