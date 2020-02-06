import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmTFnDklOftRpLoKfXJkgIy1TAFxGkqfk",
  authDomain: "side-assignment.firebaseapp.com",
  databaseURL: "https://side-assignment.firebaseio.com",
  projectId: "side-assignment",
  storageBucket: "side-assignment.appspot.com",
  messagingSenderId: "916150586863",
  appId: "1:916150586863:web:86127994823373b7093a1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
