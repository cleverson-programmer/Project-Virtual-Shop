// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAuth, signOut }  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC6S1E_B5GIc2tYX6vmYTH3dsQC0pQtxI",
  authDomain: "bdclients-5f740.firebaseapp.com",
  projectId: "bdclients-5f740",
  storageBucket: "bdclients-5f740.appspot.com",
  messagingSenderId: "300037770708",
  appId: "1:300037770708:web:54e360e9bf65d402c11a41"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app)

//Logout user account
function logOut() {
    signOut(auth).then(() => {
        alert('Saindo da conta');
        window.location.href = 'login.html'
    }).catch((error) => {
        console.error('Erro ao sair da conta:', error);
    });
}

const btnUser = document.getElementById('btn-user')
  
btnUser.addEventListener('click', function(){
    console.log('sucess')
    logOut()
})