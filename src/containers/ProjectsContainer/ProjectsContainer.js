import React, { Component } from 'react';
import Project from '../../components/Project/Project';
import { TransitionGroup } from 'react-transition-group';
import * as actions from '../../_redux/actions/index';
import { deleteProject, deletePalette } from '../../_utilities/apiCalls';
import { connect } from 'react-redux';
import './ProjectsContainer.scss';

export class ProjectsContainer extends Component {
	state = {
		user: { userId: '123ddEad2199E', username: 'Elliot' },
		error: ''
	};

	componentDidMount() {
		const { userDetails } = this.props;
		this.setState({ userId: userDetails.id, username: userDetails.username });
	}

	removeProject = async (id) => {
		try {
			const { userDetails, removeUserProject } = this.props;
			await deleteProject(userDetails.id, id);
			removeUserProject(id);
		} catch ({ message }) {
			this.setState({ error: message });
		}
	};

	removePalette = async (projectId, paletteId) => {
		await deletePalette(projectId, paletteId);
		this.props.removePalette(projectId, paletteId);
	};

	render() {
		const projects = this.props.userProjects.map((project, index) => (
			<Project
				title={project.projectTitle}
				project={project}
				index={index}
				palettes={project.palettes}
				key={project.projectId}
				id={project.projectId}
				removeProject={this.removeProject}
				removePalette={this.removePalette}
			/>
		));
		const textMessage = this.props.userProjects.length ? (
			<p>Here are your projects!</p>
		) : (
			<p>Once you save a Palette you'll see it here!</p>
		);
		return (
			<section className={this.props.userProjects.length ? 'ProjectsContainer' : 'ProjectsContainer collapse'}>
				<header className="header">
					<h4 className="header-message">{textMessage}</h4>
				</header>
				<TransitionGroup>{projects}</TransitionGroup>
			</section>
		);
	}
}

const mapStateToProps = (store) => ({
	userProjects: store.userProjects,
	userDetails: store.userDetails
});

const mapDispatchToProps = (dispatch) => ({
	addUserProjects: (projects) => dispatch(actions.addUserProjects(projects)),
	removeUserProject: (id) => dispatch(actions.removeUserProject(id)),
	removePalette: (projectId, paletteId) => dispatch(actions.removePalette(projectId, paletteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
