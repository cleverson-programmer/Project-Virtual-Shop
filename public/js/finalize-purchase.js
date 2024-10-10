import { readUserData } from './writeData.js';
import { isOpen } from './script.js';
import { cart } from './renderProducts.js';

const userId = localStorage.getItem('userId');
console.log('UserID:', userId);

const finish = document.querySelector('.finish-button');

// Array global para armazenar os produtos do carrinho
let userCart = [];

const user = [];

// Função assíncrona para finalizar a compra
async function finalizePurchase() {
    try {
        // Espera até que os dados do usuário sejam carregados
        const dataFinaly = await readUserData(userId);
        console.log('Finalize:', dataFinaly);

        //Verificar se a loja está aberta
        /*
        if (!isOpen) {
            alert("Loja fechada no momento");
            return;
        }
        */


        // Dados do usuário formatados
        const infos = {
            name: dataFinaly.username,
            address: dataFinaly.address,
            email: dataFinaly.email,
            contact: dataFinaly.contact
        }

        user.push(infos)


        const dataUser =  user.map( data => `Nome: ${data.name}. \nEndereço: ${data.address}. \nEmail: ${data.email}.\nContato: ${data.contact}.`).join('\n\n')
        

        /*
        const phone = "3399373400";
        */

        // Abrir WhatsApp com dados do usuário e produtos do carrinho
        const cartData = userCart.map(item => `\nNome: ${item.name}, Preço: ${item.price}, Quantidade: ${item.qt}, Tamanho: ${item.size}`).join('\n');
        window.open(`https://wa.me/3399373400?text=${encodeURIComponent(dataUser)}%0AProdutos:%20${encodeURIComponent(cartData)}`);

    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        alert('Erro ao finalizar compra, verifique seus dados de cadastro')
    }
}

// Evento de clique para finalizar a compra
finish.addEventListener('click', () => {

    if(cart.length == 0){
        alert('Adicione itens ao carrinho')
        return
    }

    // Verificação de metades de pizza
    const halfPizzas = cart.filter(item => item.name.includes('(meia)'));
    const sizeCountSalgadas = {};
    const sizeCountDoces = {};

    halfPizzas.forEach(halfPizza => {

        // Verifica se a pizza é doce ou salgada com base no ID
        const isDoce = halfPizza.id > 26; // ID maior que 26 indica que é pizza doce


        if (isDoce) {
            if (!sizeCountDoces[halfPizza.size]) {
                sizeCountDoces[halfPizza.size] = 0;
            }
            sizeCountDoces[halfPizza.size] += halfPizza.qt;
        } else {
            if (!sizeCountSalgadas[halfPizza.size]) {
                sizeCountSalgadas[halfPizza.size] = 0;
            }
            sizeCountSalgadas[halfPizza.size] += halfPizza.qt;
        }
    });

    // Verifica se todas as meias pizzas salgadas têm pares do mesmo tamanho
    for (const size in sizeCountSalgadas) {
        if (sizeCountSalgadas[size] % 2 !== 0) {
            alert(`Você tem uma quantidade ímpar de meias pizzas salgadas do tamanho ${size}. Por favor, adicione outra metade salgada de mesmo tamanho.`);
            return;
        }
    }

    // Verifica se todas as meias pizzas doces têm pares do mesmo tamanho
    for (const size in sizeCountDoces) {
        if (sizeCountDoces[size] % 2 !== 0) {
            alert(`Você tem uma quantidade ímpar de meias pizzas doces do tamanho ${size}. Por favor, adicione outra metade doce de mesmo tamanho.`);
            return;
        }
    }
    

    // Limpar o array global de produtos antes de adicionar
    userCart = [];

    // Loop para adicionar cada produto ao array
    for (let i in cart) {
        const product = {
            name: cart[i].name,
            price: cart[i].price,
            qt: cart[i].qt,
            size: cart[i].size
        };
        // Adiciona o objeto ao array global
        userCart.push(product);

        // Apenas para depuração
        console.log(product);
    }

    // Função para finalizar compra
    finalizePurchase().then(() => {
        // Limpar o carrinho
        cart.length = 0; // Limpa o array do carrinho

        // Atualizar a página
        window.location.reload(); 
    }).catch(error => {
        console.error("Erro ao finalizar a compra:", error);
    });
});