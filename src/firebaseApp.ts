// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

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
