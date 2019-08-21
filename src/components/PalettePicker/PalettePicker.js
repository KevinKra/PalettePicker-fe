import React, { Component } from "react";
import ColorScheme from "color-scheme";
import uuidv1 from "uuid/v1";
import ColorBar from "../ColorBar/ColorBar";
import "./PalettePicker.css";

export default class PalettePicker extends Component {
  state = {
    hue: null,
    colorScheme: null,
    variation: "pastel",
    colors: [],
    editable: false
  };

  componentDidMount() {
    this.generateColors();
  }

  toggleEditable = () => {
    const toggle = this.state.editable;
    this.setState({ editable: !toggle });
  };

  updateHue = e => {
    const { value } = e.target;
    this.setState({ hue: value });
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

  generateColors = (previousColors = []) => {
    // The possible values are 'mono', 'contrast', 'triade', 'tetrade', and 'analogic'
    const { hue, colorScheme, variation, colors, lockedColors } = this.state;
    const { pColorScheme = "triade" } = this.props;
    const scheme = new ColorScheme();
    scheme
      .from_hue(hue || this.generateRandomHue())
      .scheme(colorScheme || pColorScheme)
      .variation(variation);
    const generatedColors = scheme.colors().map(color => {
      return { hex: "#" + color, locked: false };
    });
    this.setState({ colors: generatedColors });
    // console.log(generatedColors);
    // if (
    //   generatedColors.length < previousColors.length &&
    //   this.state.lockedColors.length
    // ) {
    //   console.log("1");
    //   this.state.lockedColors.forEach(color => {
    //     generatedColors.push(color.color);
    //   });
    //   return this.setState({ colors: generatedColors });
    // } else if (this.state.lockedColors.length) {
    //   console.log("2");
    //   this.state.lockedColors.forEach(color => {
    //     generatedColors.splice(color.index, 1, color.color);
    //   });
    //   return this.setState({ colors: generatedColors });
    // } else {
    //   console.log("3");
    //   this.setState({ colors: generatedColors });
    // }
  };

  render() {
    const editBarActive = {
      transform: "translateY(0%)"
    };
    const colors = this.state.colors.map((color, i) => {
      return (
        <ColorBar
          color={color}
          vRotate={this.props.vRotate}
          number={i}
          handleLockStatus={this.handleLockStatus}
          // key={uuid}
        />
      );
    });

    const PhraseBlock = (
      <div
        className={`${
          !this.state.editable
            ? "PhraseBlock pb-active"
            : "PhraseBlock pd-inactive"
        }`}
      >
        <div className="phrase-background">
          <h2>Choose a color!</h2>
        </div>
      </div>
    );

    return (
      <section className="PalettePicker">
        {PhraseBlock}
        <div
          className="edit-block"
          style={this.state.editable ? editBarActive : null}
        >
          <form
            className="edits-form"
            onSubmit={e => this.updateColors(e, this.state.colors)}
          >
            <div>
              <h4>Hue Selection:</h4>
              <label htmlFor="hue-selection">
                <input
                  type="text"
                  placeholder="default: random"
                  autoComplete="off"
                  name="hue-selection"
                  onChange={this.updateHue}
                />
              </label>
            </div>
            <section className="radio-styles">
              <h4>Color schemes:</h4>
              <label htmlFor="mono">
                mono
                <input
                  type="radio"
                  name="colorScheme-selection"
                  value="mono"
                  onClick={e => this.updateColorScheme(e)}
                />
              </label>
              <label htmlFor="contrast">
                contrast
                <input
                  type="radio"
                  name="colorScheme-selection"
                  value="contrast"
                  onClick={e => this.updateColorScheme(e)}
                />
              </label>
              <label htmlFor="triade">
                triade
                <input
                  type="radio"
                  name="colorScheme-selection"
                  value="triade"
                  defaultChecked
                  onClick={e => this.updateColorScheme(e)}
                />
              </label>
              <label htmlFor="tetrade">
                tetrade
                <input
                  type="radio"
                  name="colorScheme-selection"
                  value="tetrade"
                  onClick={e => this.updateColorScheme(e)}
                />
              </label>
              <label htmlFor="analogic">
                analogic
                <input
                  type="radio"
                  name="colorScheme-selection"
                  value="analogic"
                  onClick={e => this.updateColorScheme(e)}
                />
              </label>
            </section>
            <section className="radio-styles">
              <h4>Color Variations:</h4>
              <label htmlFor="default">
                default
                <input
                  type="radio"
                  name="variation-selection"
                  value="default"
                  onClick={e => this.updateVariation(e)}
                />
              </label>
              <label htmlFor="pastel">
                pastel
                <input
                  type="radio"
                  name="variation-selection"
                  value="pastel"
                  defaultChecked
                  onClick={e => this.updateVariation(e)}
                />
              </label>
              <label htmlFor="soft">
                soft
                <input
                  type="radio"
                  name="variation-selection"
                  value="soft"
                  onClick={e => this.updateVariation(e)}
                />
              </label>
              <label htmlFor="light">
                light
                <input
                  type="radio"
                  name="variation-selection"
                  value="light"
                  onClick={e => this.updateVariation(e)}
                />
              </label>
              <label htmlFor="hard">
                hard
                <input
                  type="radio"
                  name="variation-selection"
                  value="hard"
                  onClick={e => this.updateVariation(e)}
                />
              </label>
              <label htmlFor="pale">
                pale
                <input
                  type="radio"
                  name="variation-selection"
                  value="pale"
                  onClick={e => this.updateVariation(e)}
                />
              </label>
            </section>
            <button className="update-btn">
              <p>Update</p>
            </button>
          </form>
        </div>
        <div className="colors-section">{colors}</div>
        <div className="button-bar">
          <button className="primary-btn" onClick={this.toggleEditable}>
            Edit Colors
          </button>
          <button className="primary-btn">Save</button>
        </div>
      </section>
    );
  }
}
