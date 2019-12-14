import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../_redux/actions';
// import { createPalette, getProjects, createProject } from '../../_utilities/apiCalls';
// import { parseProjects } from '../../_utilities/helpers';
import ColorEditor from '../../components/ColorEditor/ColorEditor';
import './SavePopup.scss';

export default class SavePopup extends Component {
	state = {
		displayProjects: false,
		createNewProject: false,
		selectedProject: '',
		newProjectTitle: '',
		newProjectDesc: '',
		paletteTitle: '',
		error: ''
	};

	handleExit = () => {
		this.props.history.push('/');
	};

	handleRadio = (e) => {
		const { id } = e.target;
		this.setState({ selectedProject: id });
	};

	// handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (!this.state.paletteTitle) {
	// 		this.setState({ error: '*Required ' });
	// 		return;
	// 	}
	// 	this.setState({ error: '' });
	// 	if (this.state.displayProjects) {
	// 		const colors = this.retrieveFavorites();
	// 		const { selectedProject, paletteTitle } = this.state;
	// 		const user = this.props.userDetails;
	// 		try {
	// 			await createPalette(selectedProject, paletteTitle, colors);
	// 			const projectsData = await getProjects(user.id).catch(() => []);
	// 			const projects = parseProjects(projectsData);
	// 			this.props.reloadProjects(projects);
	// 		} catch ({ message }) {}
	// 	} else {
	// 		const colors = this.retrieveFavorites();
	// 		const user = this.props.userDetails;
	// 		const { newProjectTitle, newProjectDesc, paletteTitle } = this.state;
	// 		try {
	// 			const newProjectID = await createProject(user.id, newProjectTitle, newProjectDesc);
	// 			await createPalette(newProjectID, paletteTitle, colors);
	// 			const projectsData = await getProjects(user.id).catch(() => []);
	// 			const projects = parseProjects(projectsData);
	// 			this.props.reloadProjects(projects);
	// 		} catch ({ message }) {}
	// 	}
	// 	this.retrieveFavorites();
	// 	this.handleExit();
	// };

	retrieveFavorites = () => {
		const favorites = this.props.currentPalette.filter((color) => color.locked === true).map((favoriteColor) => {
			return favoriteColor.hex;
		});
		return favorites;
	};

	handleColor = (color, format, newColor) => {
		const paletteCopy = this.props.currentPalette.slice();
		const colorIndex = this.props.currentPalette.findIndex((paletteColor) => paletteColor.hex === color.hex);
		if (format === 'remove') {
			paletteCopy[colorIndex].locked = false;
			this.props.updateCurrentPalette(paletteCopy);
		} else if (format === 'update') {
			paletteCopy[colorIndex].hex = newColor;
			this.props.updateCurrentPalette(paletteCopy);
		}
	};

	displayProjects = () => {
		this.setState({ displayProjects: true, createNewProject: false });
	};

	createNewProject = () => {
		this.setState({ displayProjects: false, createNewProject: true });
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		// const colorOptions = this.props.currentPalette
		// 	.filter((palette) => palette.locked === true)
		// 	.map((palette, index) => {
		// 		return <ColorEditor palette={palette} handleColor={this.handleColor} key={palette.hex + index} />;
		// 	});

		const existingProjects = (
			<section className="query-param user-projects">
				<div className="query-title-container">
					<h3>Choose an Existing Project:</h3>
				</div>
				<section className="queries-section">
					{/* {this.props.userProjects.map((project) => {
						return (
							<article className="query-radio" key={project.projectId}>
								<input
									type="radio"
									name="user-project"
									value={project.projectTitle}
									id={project.projectId}
									onClick={(e) => this.handleRadio(e)}
								/>
								<label>{project.projectTitle}</label>
							</article>
						);
					})} */}
				</section>
			</section>
		);

		const newProject = (
			<section className="query-param new-project">
				<div className="query-title-container">
					<h3>Name Your Project:</h3>
				</div>
				<label htmlFor="newProjectTitle">Project Title:</label>
				<input type="text" name="newProjectTitle" onChange={(e) => this.handleChange(e)} />
				<label htmlFor="newProjectDesc">Project Description (optional):</label>
				<input type="text" name="newProjectDesc" onChange={(e) => this.handleChange(e)} />
			</section>
		);

		const { displayProjects, createNewProject } = this.state;
		return (
			<Fragment>
				<div className="screen" />
				<div className="SavePopup-container">
					<section className="SavePopup">
						<div className="exit-background">
							<button className="save-exit" onClick={this.handleExit}>
								X
							</button>
						</div>
						<div className="title-background">
							<h3 className="editor-title">Save Your Palette</h3>
						</div>
						<form className="palette-form">
							<header>
								<p className="error-message">{this.state.error}</p>
								<label htmlFor="palette-title">Palette Title:</label>
								<input
									type="text"
									maxLength="25"
									autoComplete="off"
									name="paletteTitle"
									onChange={(e) => this.handleChange(e)}
								/>
							</header>
							{/* <section className="palettes-section">{colorOptions}</section> */}
							<div className="query-buttons">
								<button type="button" onClick={this.displayProjects}>
									Save to an Existing Project
								</button>
								<button type="button" onClick={this.createNewProject}>
									Create New Project
								</button>
							</div>
						</form>
					</section>
					<section
						className="save-section"
						style={{
							transform: createNewProject || displayProjects ? 'translateY(110%)' : 'translateY(0%)'
						}}
					>
						<div className="query-inputs">
							{displayProjects && existingProjects}
							{createNewProject && newProject}
						</div>
						{(createNewProject || displayProjects) && (
							<button className="submit-btn" type="button" onClick={this.handleSubmit}>
								Submit
							</button>
						)}
					</section>
				</div>
			</Fragment>
		);
	}
}

// const mapStateToProps = store => ({
//   userDetails: store.userDetails,
//   currentPalette: store.currentPalette,
//   userProjects: store.userProjects
// });

// const mapDispatchToProps = dispatch => ({
//   updateCurrentPalette: palette =>
//     dispatch(actions.updateCurrentPalette(palette)),
//   reloadProjects: projects => dispatch(actions.reloadProjects(projects))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SavePopup);
