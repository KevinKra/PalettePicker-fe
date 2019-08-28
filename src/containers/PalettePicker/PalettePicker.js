import React, { Component } from "react";
import ColorScheme from "color-scheme";
import ColorBar from "../../components/ColorBar/ColorBar";
import EditBarFull from "../../components/EditBarFull/EditBarFull";
import EditBarPartial from "../../components/EditBarPartial/EditBarPartial";
import { withRouter } from "react-router-dom";
import * as actions from "../../_redux/actions";
import { connect } from "react-redux";
import "./PalettePicker.css";

class PalettePicker extends Component {
  state = {
    hue: "",
    hueLocked: false,
    colorScheme: "triade",
    variation: "pastel",
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
    this.props.history.push("save-palette");
  };

  toggleEditable = () => {
    const toggle = this.state.editable;
    this.setState({ editable: !toggle });
  };

  updateHue = e => {
    const { value } = e.target;
    this.setState({ hue: value });
  };

  hueLock = () => {
    this.setState({ hueLocked: true });
  };

  hueUnlock = () => {
    this.setState({ hueLocked: false });
  };

  updateColorScheme = e => {
    const { value } = e.target;
    console.log(value);
    this.setState({ colorScheme: value });
  };

  updateVariation = e => {
    const { value } = e.target;
    this.setState({ variation: value });
  };

  updateColors = (e, previousColors) => {
    e.preventDefault();
    this.generateColors(previousColors);
  };

  generateRandomHue = () => {
    return Math.floor(Math.random() * (360 + 1));
  };

  handleLockStatus = (targetColor, lockStatus) => {
    const colorIndex = this.state.colors.findIndex(color => {
      return targetColor === color;
    });
    const colors = this.state.colors.slice();
    colors[colorIndex].locked = lockStatus;
    this.setState({ colors });
  };

  generateColors = async (previousColors = []) => {
    // The possible values are 'mono', 'contrast', 'triade', 'tetrade', and 'analogic'
    const { hue, hueLocked, colorScheme, variation, colors } = this.state;
    const { pColorScheme = "triade" } = this.props;
    let generatedHue;
    if (!hueLocked) {
      generatedHue = this.generateRandomHue();
    }
    const scheme = new ColorScheme();
    scheme
      .from_hue(generatedHue || hue)
      .scheme(colorScheme || pColorScheme)
      .variation(variation);
    const generatedColors = scheme.colors().map(color => {
      return { hex: "#" + color, locked: false };
    });
    if (previousColors.length !== generatedColors.length) {
      this.setState({ colors: generatedColors, hue: generatedHue || hue });
    } else {
      colors.forEach((color, i) => {
        if (color.locked === true) generatedColors.splice(i, 1, color);
      });
      this.setState({ colors: generatedColors, hue: generatedHue || hue });
    }
  };

  render() {
    const colors = this.state.colors.map((color, i) => {
      return (
        <ColorBar
          color={color}
          vRotate={this.props.vRotate}
          number={i}
          handleLockStatus={this.handleLockStatus}
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
          hueLock={this.hueLock}
          hueUnlock={this.hueUnlock}
        />
        <EditBarFull
          editable={this.state.editable}
          hue={this.state.hue}
          hueLocked={this.state.hueLocked}
          colors={this.state.colors}
          updateColors={this.updateColors}
          updateHue={this.updateHue}
          hueLock={this.hueLock}
          hueUnlock={this.hueUnlock}
          updateVariation={this.updateVariation}
          updateColorScheme={this.updateColorScheme}
        />
        <div className="colors-section">{colors}</div>
        <div className="button-bar">
          <button className="primary-btn" onClick={this.toggleEditable}>
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

//handle save button disable, needs to check elements that are locked.
// const mapStateToProps = ({

// })

const mapDispatchToProps = dispatch => ({
  createNewProject: project => dispatch(actions.createNewProject(project)),
  updateExistingProject: project =>
    dispatch(actions.updateExistingProject(project)),
  updateCurrentPalette: palette =>
    dispatch(actions.updateCurrentPalette(palette))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(PalettePicker));
