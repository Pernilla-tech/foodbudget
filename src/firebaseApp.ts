// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

const firebaseConfig = {
	apiKey: "AIzaSyBQ3ExaKomZfOFy7ofOlQXt-AZioLkJdp8",
	authDomain: "keeptrackofyourbudget.firebaseapp.com",
	projectId: "keeptrackofyourbudget",
	storageBucket: "keeptrackofyourbudget.appspot.com",
	messagingSenderId: "490428224675",
	appId: "1:490428224675:web:71962f1c73d4618e081b16",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
