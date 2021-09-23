import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyASPVIajoUuJkPioF3XOWASMKM05b-LqJs",
    authDomain: "mydoctorappz.firebaseapp.com",
    databaseURL: "https://mydoctorappz-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mydoctorappz",
    storageBucket: "mydoctorappz.appspot.com",
    messagingSenderId: "100402368228",
    appId: "1:100402368228:web:aa50dc361924f0aedf26f1"
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();