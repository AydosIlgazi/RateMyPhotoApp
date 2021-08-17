import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "yourAppKey",
    authDomain: "yourApp.firebaseapp.com",
    projectId: "yourApp",
    storageBucket: "yourApp.appspot.com",
    messagingSenderId: "yourAppSenderId",
    appId: "yourAppId",
    measurementId: "yourAppMeaserementId"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
