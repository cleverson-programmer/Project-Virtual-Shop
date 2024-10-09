import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBC6S1E_B5GIc2tYX6vmYTH3dsQC0pQtxI",
    authDomain: "bdclients-5f740.firebaseapp.com",
    projectId: "bdclients-5f740",
    storageBucket: "bdclients-5f740.appspot.com",
    messagingSenderId: "300037770708",
    appId: "1:300037770708:web:54e360e9bf65d402c11a41"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
// Função para autenticar com o Google
const auth = getAuth(app);
auth.languageCode = 'it'; // Define o idioma para italiano, caso necessário

// Inicializa o provider do Google
const provider = new GoogleAuthProvider();

// Adiciona um log para verificar se o JavaScript está carregando corretamente
console.log("Script carregado, aguardando clique para login...");

// Ao clicar no ícone do Google, dispara a autenticação
document.querySelector('.google').addEventListener('click', () => {
    console.log("Ícone do Google clicado, iniciando redirecionamento...");
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // Salve o UID no localStorage
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('email', user.email)
    console.log(user.uid)
    console.log(user.email)

    
    window.location.href = "./html/main.html"
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;

  });
});
