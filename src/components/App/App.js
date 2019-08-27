import React from "react";
import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import NavBar from "../../containers/NavBar/NavBar";
import PaletteEditor from "../PaletteEditor/PaletteEditor";
import SavePopup from "../../containers/SavePopup/SavePopup";
import userPopup from "../../containers/userPopup/userPopup";
import { Route } from "react-router-dom";

function App() {
  return (
    <section className="App">
      <Route path="/" component={NavBar} />
      <Route path="/" component={LandingPage} />
      <Route exact path="/edit-palette" component={PaletteEditor} />
      <Route exact path="/save-palette" component={SavePopup} />
      <Route exact path="/login" component={userPopup} />
      <Route exact path="/register" component={userPopup} />
    </section>
  );
}

export default App;
