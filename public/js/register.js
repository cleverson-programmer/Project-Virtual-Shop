// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword }  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

//submit
const submit = document.getElementById('submit')

submit.addEventListener('click', async (event) => {
  event.preventDefault();

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Create login
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const loading = document.getElementById('loading')
    const containerRegister= document.getElementById('containerRegister')
    //Loading
    function showLoading(element) {
      element.style.display = 'flex'

      containerRegister.style.display = 'none'

      setTimeout(() => {
        element.style.display = 'none';
        containerRegister.style.display = 'flex';
      }, 3000);
    }
    showLoading(loading)

    alert('Conta criada com sucesso')
    window.location.href = './html/main.html';
    const user = userCredential.user;
    console.log(user);

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage, errorCode);

    location.reload()
  }
})

//Button redirect page login

document.querySelector('#btnEnterAccount').addEventListener('click', (event)=>{
  event.preventDefault()
  window.location.href = './index.html'
})