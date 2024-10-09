// Import the functions you need from the SDKs you need

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence }  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

/*
export function loginUser() {
  // Suponha que você já tenha a lógica de autenticação aqui
  // Se login for bem-sucedido:
  //localStorage.setItem('isLoggedIn', 'true');
  // Redireciona o usuário para a página principal
  window.location.href = 'index.html';
}
*/

submit.addEventListener('click', async (event) => {
  event.preventDefault();
  
  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loading = document.getElementById('loading')

  //Loading
   function showLoading(element){
    element.style.display = 'flex'

    containerLogin.style.display= 'none'

    setTimeout(() => {
      element.style.display = 'none';
      containerLogin.style.display = 'block';
    }, 3000);

   }

  try {

   showLoading(loading)

   await setPersistence(auth, browserSessionPersistence);
    //login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      //Redirect page main
      const user = userCredential.user;

      localStorage.setItem('userId', user.uid)
      localStorage.setItem('email', user.email)

      window.location.href= './html/main.html'

      email = ''
      password = ''

  } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage, errorCode);
      window.location.href = "../index.html"
  }

})


//Button redirect page create account

document.querySelector('#btnCreateAccount').addEventListener('click', (event)=>{
  event.preventDefault()
  window.location.href= './auth.html'
})

// Link redirect page reset password

document.querySelector('#forgotPassword').addEventListener('click', (event)=>{
  event.preventDefault()
  window.location.href= './html/resetPassword.html'
})