//Observador para aguardar a requisição e renderização dos cards de renderProcuts.js para depois chamar as funções referentes ao carrinho

document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                ready();
            }
        });
    });

    observer.observe(document.getElementById('cardsContainer'), {
        childList: true,
        subtree: true
    });
})

function ready() {
  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("addToCart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }
}

function addProductToCart(event){
    const button = event.target
    console.log(button)

    const cardProduct = button.parentElement.parentElement.parentElement
    const productImage = cardProduct.getElementsByClassName("product-image")[0].src
    console.log(productImage)
    const nameProduct = cardProduct.getElementsByClassName("name-product")[0].innerText
    //console.log(nameProduct)

    //Recuperando o valor de slice e price do localStorage
    const sliceProduct = localStorage.getItem('selectedSize')
    console.log(sliceProduct)

    const selectedPrice = localStorage.getItem('selectedPrice')
    const priceNumber = parseInt(selectedPrice, 10)
    if (priceNumber) {
        console.log(priceNumber);
        // Aqui você pode usar o valor recuperado conforme necessário
    }


    //Adicionar mais quantidade de itens iguais
    const productsName = document.querySelector(".name-product")
    for(var i = 0; i < productsName.length; i++){
        if(productsName[i].innerText === nameProduct){
            productsName[i].parentElement.parentElement.getElementsByClassName("amountItems")[0].value++
        }
    }

    //Renderizando na tela o card no carrinho
    let newProductCart = document.createElement("div")

    newProductCart.innerHTML = `
        <div class="flex justify-between mb-2 mt-2 p-2 rounded-md flex-col w-full h-36 bg-white" id="cart-items">
                <div class="flex flex-row justify-between mt-4">
                    <div class="text-xl">
                        <p class="name-product">Sabor: ${nameProduct}</p>
                        <p id="size-product">Tamanho: ${sliceProduct}</p>
                    </div>
                    <div>
                        <img src="${productImage}" class="w-16 h-16 rounded-full" alt="">
                    </div>
                </div>
                <div class="flex justify-between items-center">
    
                    <div class="flex gap-3">
                        <div class=" flex w-4 h-6 border border-solid border-white rounded-md justify-center text-black">
                            <input type="number" value="1" min="0" class="amountItem border border-solid border-black rounded-md h-10 w-10 flex justify-center text-center">
                        </div>
                    </div>
    
                    <div class="flex flex-row w-32 justify-between items-center text-xl">
                        <p class="" id="price-products">${priceNumber}R$</p>
                        <i class="fa-regular fa-trash-can text-red-600"></i>
                    </div>
                </div>
            </div>
    `
    const containerItems = document.querySelector('.containerCartItems')
    containerItems.appendChild(newProductCart)

    //Função que atualiza o valor total do carrinho
    uptadeTotal()

}

function uptadeTotal(){

}