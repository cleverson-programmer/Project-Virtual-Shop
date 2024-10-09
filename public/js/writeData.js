import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBC6S1E_B5GIc2tYX6vmYTH3dsQC0pQtxI",
    authDomain: "bdclients-5f740.firebaseapp.com",
    projectId: "bdclients-5f740",
    storageBucket: "bdclients-5f740.appspot.com",
    messagingSenderId: "300037770708",
    appId: "1:300037770708:web:54e360e9bf65d402c11a41",
    databaseURL: "https://bdclients-5f740-default-rtdb.firebaseio.com/"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para salvar os dados no Firebase
function writeUserData(userId, name, address, contact, email) {
    set(ref(database, 'users/' + userId), {
        username: name,
        address: address,
        contact: contact,
        email: email
    }).then(() => {
        alert('Dados salvos com sucesso!')
        // Chama a função para ler os dados do usuário logado
        reloadData()
        
    }).catch((error) => {
        console.error("Erro ao salvar dados: ", error);
    });
}

// Captura o formulário e o botão de envio
const form = document.getElementById('formCart');
const btnSave = document.getElementById('btn-send-data-user');

// Variáveis para armazenar os dados do formulário
let userData = {
    name: '',
    contact: '',
    address: '',
    email: ''
};


// Gerar um userId único (simples, por exemplo, timestamp)
//const userId = Date.now().toString();

const userId = localStorage.getItem('userId')

function dados(userId){
    // Adiciona um evento de clique no botão "Salvar"
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
        
        // Captura os dados dos campos de input
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const address = document.getElementById('address').value;
        const email = localStorage.getItem('email')

        // Armazena os valores capturados nas variáveis
        userData.name = name;
        userData.contact = contact;
        userData.address = address;
        userData.email = email;

        // Exibe os dados no console para verificar se foram capturados corretamente
        console.log('Dados do usuário:', userData);

        

        // Envia os dados para o Firebase
        writeUserData(userId, userData.name, userData.address, userData.contact, userData.email);
    });

}

dados(userId)




//Ler dados dos users do banco de dados e renderizar no html
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    //console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


// Função para ler os dados de um usuário específico
export function readUserData(userId) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database, 'users/' + userId);
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log('userData:', userData);
                renderUser(userData); // Chama a função para renderizar os dados no DOM
                resolve(userData);    // Retorna os dados do usuário
            } else {
                console.log("No data available");
                resolve(null); // Não encontrou os dados, retorna null
            }
        }).catch((error) => {
            console.error("Erro ao ler dados: ", error);
            reject(error); // Retorna o erro caso ocorra
        });
    });
}

// Função para renderizar os dados do usuário no HTML
function renderUser(userData) {
    const usernameElement = document.querySelector('.username');
    const userContactElement = document.querySelector('.usercontact');
    const userAddressElement = document.querySelector('.useradress');
    const userEmailElement = document.querySelector('.emailuser')

    usernameElement.textContent = userData.username;
    userEmailElement.textContent = userData.email;
    userContactElement.textContent = userData.contact;
    userAddressElement.textContent = userData.address;
}

function reloadData(){
const userId = localStorage.getItem('userId'); // Pegar o UID do localStorage
    if (userId) {
        readUserData(userId);
    } else {
        console.log('Usuário não autenticado.');
    }
        
}
window.onload = () => {
reloadData()
}



//Observador para aguardar a requisição e renderização dos cards de renderProcuts.js para depois chamar as funções referentes ao carrinho
/*

document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                <nome da função>
            }
        });
    });

    observer.observe(document.getElementById('cardsContainer'), {
        childList: true,
        subtree: true
    });
})

*/
