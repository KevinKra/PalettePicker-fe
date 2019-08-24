import React, { Component } from "react";
import Project from "../../components/Project/Project";
import * as actions from "../../_redux/actions/index";
import { connect } from "react-redux";
import "./ProjectsContainer.css";

class ProjectsContainer extends Component {
  state = {
    user: { userId: "123ddEad2199E", username: "Elliot" }
  };

  componentDidMount() {
    this.props.addUserProjects([
      {
        projectTitle: "--Send to Steve",
        projectId: "asd3213ey1u",
        projectDesc: "Palettes that Steve requested ...",
        palettes: [
          {
            paletteTitle: "Ok here is title",
            paletteColors: ["#45CD12", "#DFD442", "#4E3211"],
            paletteId: "asd3a1DD3sd"
          },
          {
            paletteTitle: "Idea - 2 Colors",
            paletteColors: ["#123456"],
            paletteId: "eeEE123D3sd"
          },
          {
            paletteTitle: "Serene",
            paletteColors: ["#FEDCBA", "#45CD12", "#3A3A3A", "#123123"],
            paletteId: "f321DFDff3sd"
          },
          {
            paletteTitle: "-- Send to Steve",
            paletteColors: [
              "#FEDCBA",
              "#FEDFED",
              "#ABCABC",
              "#123123",
              "#3A3A3A"
            ],
            paletteId: "eee23aOO3sd"
          },
          {
            paletteTitle: "Iteration 4",
            paletteColors: [
              "#FEDCBA",
              "#FFFFDD",
              "#45CD12",
              "#AABBE1",
              "#3A3A3A"
            ],
            paletteId: "13ASeeU98MN"
          },
          {
            paletteTitle: "- Two Potential Options -",
            paletteColors: ["#AFFFDD", "#1A3A3A"],
            paletteId: "13AS3U98MN"
          }
        ]
      },
      {
        projectTitle: "My Favorites!",
        projectId: "3ykuyOP23eeE",
        projectDesc: "A list of my favorite palettes.",
        palettes: [
          {
            paletteTitle: "For Mary",
            paletteColors: ["#568111", "#512612", "#EA31EA"],
            paletteId: "oi112uTR3y"
          },
          {
            paletteTitle: "Idea - ???",
            paletteColors: ["#123456", "#99EE32"],
            paletteId: "833AS3U99M"
          },
          {
            paletteTitle: "Iteration 2",
            paletteColors: ["#FEDCBA", "#FFFFDD", "#AABBE1", "#3A3A3A"],
            paletteId: "13AS3U98MN"
          }
        ]
      }
    ]);
  }

  render() {
    const projects = this.props.userProjects.map(project => {
      return (
        <Project
          title={project.projectTitle}
          palettes={project.palettes}
          key={project.projectId}
        />
      );
    });
    const textMessage = this.props.userProjects.length ? (
      <p>Here are your projects!</p>
    ) : (
      <p>This area is where your projects will be saved!</p>
    );

    return (
      <div>
        <section className="ProjectsContainer">
          <React.Fragment>
            <header
              className={`projects-container-header ${
                this.props.userProjects.length ? null : "header-hidden"
              }`}
            >
              {textMessage}
            </header>
            {projects}
          </React.Fragment>
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userProjects: store.userProjects
});

const mapDispatchToProps = dispatch => ({
  addUserProjects: projects => dispatch(actions.addUserProjects(projects))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsContainer);
