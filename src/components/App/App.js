import React from 'react';
import LandingPage from '../../screens/LandingPage/LandingPage';
import NavBar from '../NavBar/NavBar';
import PaletteEditor from '../PaletteEditor/PaletteEditor';
import SavePopup from '../../containers/SavePopup/SavePopup';
import { Route } from 'react-router-dom';
import './App.scss';

function App() {
	return (
		<section className="App">
			<Route path="/" component={NavBar} />
			<Route exact path="/edit-palette" component={PaletteEditor} />
			<Route exact path="/save-palette" component={SavePopup} />
			<Route path="/" component={LandingPage} />
		</section>
	);
}

export default App;
