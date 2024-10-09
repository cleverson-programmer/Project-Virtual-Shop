import { initializeApp, getApps  } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBC6S1E_B5GIc2tYX6vmYTH3dsQC0pQtxI",
    authDomain: "bdclients-5f740.firebaseapp.com",
    databaseURL: "https://bdclients-5f740-default-rtdb.firebaseio.com",
    projectId: "bdclients-5f740",
    storageBucket: "bdclients-5f740.appspot.com",
    messagingSenderId: "300037770708",
    appId: "1:300037770708:web:54e360e9bf65d402c11a41"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


const database = getDatabase(app);

// Função para ler os dados do banco de dados
async function readData() {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, 'products'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
  
        displayProducts(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
}

//Var globais
let keyAttirbutes = 0

let quantProducts = 1

export let cart = []

const selected = (elemento) => document.querySelector(elemento);

const selectedAll = (elemento) => document.querySelectorAll(elemento);

/*
        Função para implementar evento de clique de forma fácil
        const btnCloseEvent = () =>{
        selectedAll('').forEach( (item)=> {
            item.addEventListener('click', nomeFunção)
        })
    }
    */

//Add data card items
const dataItemsProducts = (pizzaItem, product, index) => {
  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".product-image img").src = product.urlImage;
  pizzaItem.querySelector(".product-image img").alt = product.name;

  pizzaItem.querySelector(".product-price").innerHTML = product.size
    .slice(0, 1)
    .map(
      (size) =>
        `<p class="flex ">${size.price}R$— ${product.size
          .slice(-1)
          .map((size) => `<p class="flex "> ${size.price}R$</p>`)}</p>`
    );

  pizzaItem.querySelector(".product-title").innerHTML = product.name;

  pizzaItem.querySelector(".product-description").innerHTML =
    product.description;
};

//Add data modal
const dataItemsModalAddToCart = (product, index) => {
  selected(".pizzaInfo h1").innerHTML = product.name;
  selected(".pizzaBig img").src = product.urlImage;
  selected(".pizzaInfo--desc").innerHTML = product.description;

  const sizeElements = selectedAll(".pizzaInfo--size");
  const sizes = product.size;

  // Verifica se o índice é maior ou igual a 29 para mudar o texto para "Litros"
  if (index >= 29) {
    selected(".pizzaInfo--sector").innerHTML = "Litros";

  } else {
    selected(".pizzaInfo--sector").innerHTML = "Tamanho(cm/fatia)";
  }

  //Itera sobre cada div que contém o tamanhho e adiciona o tamanho
  sizeElements.forEach((element, index) => {

    const price = sizes[index].price;
    document.querySelector(".pizzaInfo--actualPrice").innerHTML = formatReal(price);

    // Insere o valor de size.slice no elemento correspondente
    element.innerHTML = `<p class="flex">${sizes[index].slice}</p>`;

    //Captura o valor corresponde ao tamanho clicado para atualizar na div de preço atual
    element.addEventListener("click", () => {

      // Remove a classe 'selected' de todos os elementos
      sizeElements.forEach(el => el.classList.remove('selected'));
    
        // Adiciona a classe 'selected' ao elemento clicado
        element.classList.add('selected');
    
        
        console.log(`O preço do tamanho ${sizes[index].slice} é: R$${price}`);
    
        // Atualiza a div de preço atual
        document.querySelector(".pizzaInfo--actualPrice").innerHTML = formatReal(price);
    });
  });
};

const counter = () =>{
    selected('.pizzaInfo--qtmais').addEventListener('click', () => {
        if( quantProducts < 10){
            quantProducts++
            selected('.pizzaInfo--qt').innerHTML = quantProducts
        }else{
            alert('Entre em contato diretamente pelo Whatsapp para verificar disponibilidade acima de 10 pizzas')
        }
    })

    selected('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if(quantProducts > 1){
            quantProducts--
            selected('.pizzaInfo--qt').innerHTML = quantProducts
        }
    })
}

const formatReal = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const formatMoney = (value) => {
  if (value) {
    return value.toFixed(2);
  }
};

//Evento de click close modal new window
const closeModalWindow = document.querySelector(".pizzaInfo--cancelButton");

closeModalWindow.addEventListener("click", () => {
  console.log("fechando");
  closeModal();
});

const captureKey = (e, products) => {

    let key = e.target.closest('.card-product').getAttribute('data-key')
    console.log('Pizza clicada' + key)
    console.log(products[key])

    quantProducts = 1;
    keyAttirbutes = key;

    return key
}

const addProductToCart = (products) =>{
    selected('.pizzaInfo--addButton').addEventListener('click', () =>{
        console.log('Adicionado ao carrinho')

        console.log('Pizza' + keyAttirbutes)

        let size = selected('.pizzaInfo--size.selected').getAttribute('data-key')
        console.log('Tamanho' + size)

        console.log('Quantidade' + quantProducts)

        let price = selected('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        let identify = products[keyAttirbutes].id + '/' + size
        console.log(identify)

        let key = cart.findIndex( (item) => {
          
          console.log('Comparando identify:', item.identify, identify);
          return item.identify == identify
        })
        console.log(key)


        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantProducts
        }
        else {
            // adicionar objeto pizza no carrinho
            let pizza = {
                identify,
                name: products[keyAttirbutes].name,
                id: products[keyAttirbutes].id,
                size: size,
                qt: quantProducts,
                price: parseFloat(price) // price: price
            }
            cart.push(pizza)
            console.log(cart)
            console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
        }

        showAddProductMain()
        closeCart()
        uptadeToCart(products)
    })
    
}

const uptadeToCart = (products) => {

  // exibir número de itens no carrinho
	selected('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		selected('aside').classList.add('flex')
    selected('aside').classList.remove('hidden')

		// zerar meu .cart para nao fazer insercoes duplicadas
		selected('.cart').innerHTML = ''

    // crie as variaveis antes do for
		let subtotal = 0
		let total    = 0

    // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let productItem = products.find( (item) => item.id == cart[i].id )
			console.log(productItem)

      // em cada item pegar o subtotal
      subtotal += cart[i].price * cart[i].qt
      console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = selected('.models .cart--item').cloneNode(true)
			selected('.cart').append(cartItem)

			let productSizeName = cart[i].size
      console.log('size/name', productSizeName)

			// Verificação para remover o tamanho se o índice for maior que 29
      let productName = (cart[i].id > 29) ? productItem.name : `${productItem.name} (${productSizeName})`;
      console.log('name', productName);

      

			// preencher as informacoes
			cartItem.querySelector('img').src = productItem.urlImage
			cartItem.querySelector('.cart--item-nome').innerHTML = productName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selectedr botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				uptadeToCart(products)
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

        //VERIFICAR AQUI QUANDO TIRAR TUDO DO CARRINHO E DAR ERRO 404
        (cart.length < 1) ? window.location.href= './main.html': ''
       

				// atualizar a quantidade
				uptadeToCart(products)
			})

			selected('.cart').append(cartItem)

		}; // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		//desconto = subtotal * 0
		//total = subtotal - desconto

		// exibir na tela os resultados
		// selectedr o ultimo span do elemento
		selected('.subtotal span:last-child').innerHTML = formatReal(subtotal)

    //Para pegar total com desconto futuramente se desejar

		//selected('.total span:last-child').innerHTML    = formatReal(total)

	} else {
		// ocultar o carrinho
		selected('aside').classList.remove('flex')
		selected('aside').classList.add('hidden')
	}
};


//Lidar com modal de adicionar ao carrinho e fecha-lo
const showModal = () => {
  selected(".pizzaWindowArea").classList.add("flex");
  selected(".pizzaWindowArea").classList.remove("hidden");
  selected(".contentIndex").classList.add("hidden");
};

const closeModal = () => {
  selected(".contentIndex").classList.remove("hidden");
  selected(".contentIndex").classList.add("flex");
  selected(".pizzaWindowArea").classList.add("hidden");
};

selected(".pizzaInfo--addButton").addEventListener('click', () =>{
  const menuCart = selected(".buy-cart"); // Seleciona a div do carrinho
    menuCart.classList.remove('hidden'); // Toggle para ocultar/exibir
    menuCart.classList.add('fixed');
    menuCart.style.zIndex = '9999';
})

// Função para adicionar evento ao botão de "Ver Carrinho"
function showAddProductMain() {
  const showCartBottom = selected(".show-cart"); // Botão para abrir o carrinho
  showCartBottom.addEventListener('click', () => {
    const menuCart = selected(".buy-cart"); // Seleciona a div do carrinho
    menuCart.classList.remove('hidden'); // Mostra o carrinho
    menuCart.classList.add('fixed'); // Define o carrinho como 'fixed' para ficar na tela ao rolar
    
    // Define a posição central na tela
    menuCart.style.top = '50%';
    menuCart.style.left = '50%';
    menuCart.style.transform = 'translate(-50%, -50%)'; // Centraliza horizontal e verticalmente
    menuCart.style.zIndex = '9999'; // Certifica-se que o carrinho fique acima de outros elementos
  });
}


// Função para adicionar evento ao botão de fechar o carrinho
function closeCart() {
  const closeCartButton = selected(".menu-closer"); // Botão de fechar carrinho
  closeCartButton.addEventListener('click', () => {
    const menuCart = selected(".buy-cart");
    menuCart.classList.add('hidden')
    menuCart.classList.remove('fixed')
  });
}


// Função para exibir os produtos na página
function displayProducts(products) {

  const productsContainer = document.querySelector('.cardsContainer');
  productsContainer.innerHTML = '';

  products.slice(0, 34).forEach((product, index) => {

    // Verifica se o índice é 29 para inserir a div de separação
    if (index === 29) {
      const separatorDiv = document.createElement('div');
      separatorDiv.className = 'text-2xl font-semibold mb-3 mt-3 text-white flex justify-center md:text-3xl';
      separatorDiv.innerHTML = '<p>Bebidas</p>';
      productsContainer.appendChild(separatorDiv);
    }

    // Cria e insere os itens de pizza
    let pizzaItem = document.querySelector('.models .card-product').cloneNode(true);
    console.log(pizzaItem);

    dataItemsProducts(pizzaItem, product, index);
    
    productsContainer.appendChild(pizzaItem);

    pizzaItem.querySelector('.card-product .addToCart').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('clicou');

        // Captura o evento do clique na pizza
        captureKey(e, products);

        // Abre o modal
        showModal();

        // Configura os dados para o modal
        dataItemsModalAddToCart(product, index);
        
        selected('.pizzaInfo--qt').innerHTML = quantProducts;
    });
  });

  // Função para adicionar ao carrinho
  addProductToCart(products);

  // Atualizar itens e valores no carrinho
  uptadeToCart(products);
}

counter()
showAddProductMain()
closeCart()

window.onload = readData()

