// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
	authDomain: import.meta.env.VITE_authDomain,
	databaseURL: import.meta.env.VITE_databaseURL,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

//авторизация
export const authFirebase = getAuth();

// получение данных
export const database = getDatabase();

export default firebaseApp;