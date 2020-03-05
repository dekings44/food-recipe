import firebase from "firebase";
import firestore from "firebase/firestore"; /* eslint no-unused-vars:0 */

var firebaseConfig = {
	apiKey: "AIzaSyC2AhV4yHQkhNCKWA1Y1bXBveYmtwpP-6g",
	authDomain: "foodrecipes-2fe24.firebaseapp.com",
	databaseURL: "https://foodrecipes-2fe24.firebaseio.com",
	projectId: "foodrecipes-2fe24",
	storageBucket: "foodrecipes-2fe24.appspot.com",
	messagingSenderId: "122772029406",
	appId: "1:122772029406:web:353ce5aaf78914887aa74f",
	measurementId: "G-SGLLSP22H4"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firebase database
export default firebaseApp.firestore();
