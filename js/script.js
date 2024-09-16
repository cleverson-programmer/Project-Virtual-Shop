const iconUser = document.getElementById("user-cart");
const menuCart = document.querySelector("#buy-cart")
const sendOrderWhatsapp = document.querySelector("#btn-send-whatsapp")
const showCartBottom = document.querySelector("#show-cart")

const openingHours = document.querySelector("#opening-hours")
const arrowDownHeight = document.querySelector("#arrow-down")
const cardProduct = document.querySelector("#card-product")
const totalCartValue = document.querySelector("#price-products")
const closeCartContainer = document.querySelector("#close-cart-button")
const cartCounterItems = document.querySelector("#cart-count")

const nameClient = document.querySelector("#name")
const contactClient = document.querySelector("#contact")
const addressClient = document.querySelector("#address")
const addressClientIncorrect = document.querySelector("#address-warn")
const observationsClient = document.querySelector("#observations")

//Toggle show cart menu

showCartBottom.addEventListener( 'click', ()=> {
    menuCart.classList.remove('hidden')
    menuCart.classList.add('flex')
})

closeCartContainer.addEventListener('click', () => {
    menuCart.classList.remove('flex')
    menuCart.classList.add('hidden')
})
