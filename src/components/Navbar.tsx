import React from "react";
import { Container, Navbar as NavbarBs, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
			<Container className="me-auto">
				<Nav>
					<Nav.Link to="/" as={NavLink}>
						Hem
					</Nav.Link>
					<Nav.Link to="/about" as={NavLink}>
						Om oss
					</Nav.Link>
				</Nav>
			</Container>
		</NavbarBs>
	);
};

export default Navbar;
