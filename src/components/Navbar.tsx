import { Container, Navbar as NavbarBs, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { auth } from "../firebaseApp";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
	const [user] = useAuthState(auth);

	console.log(user)

	const logout = () => {
		signOut(auth).then(() => document.location.reload());
	};
	return (
		<NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
			<Container className="me-auto">
				<Nav>
					<Nav.Link to="/" as={NavLink}>
						Hem
					</Nav.Link>
					<Nav.Link to="/history" as={NavLink}>
						Historik
					</Nav.Link>

				</Nav>
				<div style={{ display: "flex" }}>
					{user ? (
						<><img style={{
							borderRadius: "50px",
							height: "30px"
						}} src={user.photoURL || ""} />
							<p style={{ margin: "0", paddingRight: "4px", paddingLeft: "4px" }}> {user.displayName}</p></>
					) : (
						null
					)

					}

					<Button onClick={logout}>Sign out</Button>
				</div>
			</Container>
		</NavbarBs >
	);
};

export default Navbar;
