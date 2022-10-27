import MainView from "./mainView";
import {
	browserLocalPersistence,
	setPersistence,
	signOut,
} from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./firebaseApp";
import { Button } from "react-bootstrap";

const App = () => {
	const [user, loading, error] = useAuthState(auth);
	const [signInWithGoogle, , gLoading, gError] = useSignInWithGoogle(auth);

	const authError = error || gError;
	const isLoading = loading || gLoading;

	const login = async () => {
		await setPersistence(auth, browserLocalPersistence);
		signInWithGoogle();
	};

	const logout = () => {
		signOut(auth).then(() => document.location.reload());
	};

	if (authError) {
		return (
			<div>
				<p>Error: {authError.message}</p>
			</div>
		);
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (user) {
		return (
			<>
				<Button disabled={isLoading} onClick={logout}>
					Sign Out
				</Button>
				<MainView />
			</>
		);
	}

	return (
		<div className="App">
			<Button disabled={isLoading} onClick={login}>
				Sign In
			</Button>
		</div>
	);
};

export default App;
