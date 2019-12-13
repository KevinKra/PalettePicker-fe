import React from 'react';
import './NavBar.scss';

export default function NavBar() {
	return (
		<header className="NavBar">
			<h2>PalettePicker</h2>
			<form className="navbar-form">
				<button>Login</button>
				<button>Register</button>
			</form>
		</header>
	);
}
