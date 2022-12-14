import MainView from "./mainView";
import {
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button } from "react-bootstrap";
import { auth } from "../firebaseApp";


const LandingPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle, , gLoading, gError] = useSignInWithGoogle(auth);


  const authError = error || gError;
  const isLoading = loading || gLoading;

  const login = async () => {
    await setPersistence(auth, browserLocalPersistence);
    signInWithGoogle();
  };

  if (authError) {
    return (
      <div>
        <p style={{ color: "white" }}>Error: {authError.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  if (user) {
    return (
      <>
        <MainView />
      </>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "25%" }
    }>
      <h1 style={{ color: "white", padding: "24px" }}>
        Keep track of your budget
      </h1>
      <Button
        disabled={isLoading}
        onClick={login}
        style={{ backgroundColor: "rgb(255, 107, 53)", border: "none" }}
      >
        Sign In
      </Button>
    </div >

  );
};

export default LandingPage;