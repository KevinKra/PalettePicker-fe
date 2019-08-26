import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./SavePopup.scss";

function SavePopup(props) {
  const handleExit = () => {
    props.history.push("/");
  };
  const colorOptions = props.currentPalette.map(palette => {
    return (
      <article className="palette-details" key={palette.hex}>
        <section className="palette-inputs">
          <div
            className="palette-color"
            style={{
              backgroundColor: palette.hex
            }}
          ></div>
          <input type="text" defaultValue={palette.hex} />
        </section>
        <button className="remove-btn">Remove</button>
      </article>
    );
  });
  return (
    <Fragment>
      <div className="screen" />
      <section className="SavePopup">
        <button className="editor-exit" onClick={handleExit}>
          X
        </button>
        <form className="editor-form">
          <h3 className="editor-title">Title</h3>
          <label htmlFor="">Label 1</label>
          <input type="text" />
          <section className="palettes-section">{colorOptions}</section>
          <button className="submit-btn">Submit</button>
        </form>
      </section>
    </Fragment>
  );
}

const mapStateToProps = store => ({
  currentPalette: store.currentPalette
});

export default connect(mapStateToProps)(SavePopup);
