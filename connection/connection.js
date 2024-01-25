import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
    apiKey: "AIzaSyCjLV2tgzYy3IxXF-DnEXDqtnY97RdlbaA",
    authDomain: "phpfirebase-b16a2.firebaseapp.com",
    databaseURL: "https://phpfirebase-b16a2-default-rtdb.firebaseio.com",
    projectId: "phpfirebase-b16a2",
    storageBucket: "phpfirebase-b16a2.appspot.com",
    messagingSenderId: "270767901300",
    appId: "1:270767901300:web:c3664c850ed27e188edf21",
    measurementId: "G-9JR98LY99Z"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export default {db: db}