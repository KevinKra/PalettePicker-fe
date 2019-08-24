import React from "react";
import ProjectsContainer from "../../containers/ProjectsContainer/ProjectsContainer";
import PalettePicker from "../../containers/PalettePicker/PalettePicker";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <main className="LandingPage">
      <PalettePicker />
      <ProjectsContainer />
    </main>
  );
}
