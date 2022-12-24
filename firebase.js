import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyAhQH9woisY2ctmRhtSP7f0hkJX_D1ZAgA",
  authDomain: "aj-instagram-clone.firebaseapp.com",
  projectId: "aj-instagram-clone",
  storageBucket: "aj-instagram-clone.appspot.com",
  messagingSenderId: "642293085538",
  appId: "1:642293085538:web:18e9a033b962427943683b"
};

let app;
if (firebase.apps.length===0) {
  app=firebase.initializeApp(firebaseConfig)
}else{
  app=firebase.app()
}

const db=firebase.firestore()
export {firebase,db}
