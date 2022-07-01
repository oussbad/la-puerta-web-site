import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyB8m1v7eeg5F3wZ5m0pORbNrY6AOuzX_vI",
    authDomain: "web-chat-e36e0.firebaseapp.com",
    projectId: "web-chat-e36e0",
    storageBucket: "web-chat-e36e0.appspot.com",
    messagingSenderId: "730615577539",
    appId: "1:730615577539:web:fa19c0e4e17aa71c2a1b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();






login.addEventListener('click', (e) => {

    var email = document.getElementById('email_login').value;
    var password = document.getElementById('password_login').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;




            window.location = "Accueil.html";


            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });



});


signup.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;


            setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                date: date,
                phone: phone,
            });

            alert('account created!');
        });
});