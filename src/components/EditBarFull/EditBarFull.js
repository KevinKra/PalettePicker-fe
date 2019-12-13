import React from "react";
import "./EditBarFull.css";

export default function EditBarFull(props) {
  const editBarActive = {
    transform: "translateY(0%)"
  };
  return (
    <section
      className="edit-block"
      style={props.editable ? editBarActive : null}
    >
      <form
        className="edits-form"
        onSubmit={e => props.updateColors(e, props.colors)}
      >
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
              <button onClick={props.toggleLock}>Unlock</button>
            ) : (
              <button onClick={props.toggleLock}>Lock</button>
            )}
          </div>
        </div>
        <section className="radio-styles">
          <h4>Color schemes:</h4>
          <label htmlFor="mono">
            mono
            <input
              type="radio"
              name="colorScheme-selection"
              value="mono"
              onClick={e => props.updateColorScheme(e)}
            />
          </label>
          <label htmlFor="contrast">
            contrast
            <input
              type="radio"
              name="colorScheme-selection"
              value="contrast"
              onClick={e => props.updateColorScheme(e)}
            />
          </label>
          <label htmlFor="triade">
            triade
            <input
              type="radio"
              name="colorScheme-selection"
              value="triade"
              defaultChecked
              onClick={e => props.updateColorScheme(e)}
            />
          </label>
          <label htmlFor="tetrade">
            tetrade
            <input
              type="radio"
              name="colorScheme-selection"
              value="tetrade"
              onClick={e => props.updateColorScheme(e)}
            />
          </label>
          <label htmlFor="analogic">
            analogic
            <input
              type="radio"
              name="colorScheme-selection"
              value="analogic"
              onClick={e => props.updateColorScheme(e)}
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
              onClick={e => props.updateVariation(e)}
            />
          </label>
          <label htmlFor="pastel">
            pastel
            <input
              type="radio"
              name="variation-selection"
              value="pastel"
              defaultChecked
              onClick={e => props.updateVariation(e)}
            />
          </label>
          <label htmlFor="soft">
            soft
            <input
              type="radio"
              name="variation-selection"
              value="soft"
              onClick={e => props.updateVariation(e)}
            />
          </label>
          <label htmlFor="light">
            light
            <input
              type="radio"
              name="variation-selection"
              value="light"
              onClick={e => props.updateVariation(e)}
            />
          </label>
          <label htmlFor="hard">
            hard
            <input
              type="radio"
              name="variation-selection"
              value="hard"
              onClick={e => props.updateVariation(e)}
            />
          </label>
          <label htmlFor="pale">
            pale
            <input
              type="radio"
              name="variation-selection"
              value="pale"
              onClick={e => props.updateVariation(e)}
            />
          </label>
        </section>
        <button className="update-btn">
          <p>Update</p>
        </button>
      </form>
    </section>
  );
}
