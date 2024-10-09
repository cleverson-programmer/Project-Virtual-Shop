const userIcon = document.getElementById("user-icon");
const containerAccount = document.getElementById("containerAccount")
const closeAccount = document.getElementById('close-account')

const menuContainer = document.getElementById('menuContainer')



//Se o usuário não estiver logado não consegue acessar a página main
/*
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
      // Se o usuário não estiver autenticado, redireciona para a página de login
      window.location.href = 'login.html';
    }
});
*/

//Verify date e hours to see if the store is open or closed

function checkVirtualShopOpen() {
    const date = new Date();
    const day = date.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hours = date.getHours();

    // Verificar se o dia está entre sexta-feira (5) e domingo (0)
    const isWeekend = (day === 5 || day === 6 || day === 0);

    // Verificar se está dentro do horário das 19h às 23h
    const isInOpeningHours = hours >= 19 && hours < 23;

    return isWeekend && isInOpeningHours;
}

const itemCheck = document.querySelector('#opening-hours');
export const isOpen = checkVirtualShopOpen();

if (isOpen) {
    itemCheck.classList.remove('bg-red-700');
    itemCheck.classList.add('bg-menu-button'); // Troque para a cor de fundo verde desejada
} else {
    itemCheck.classList.add('bg-red-700');
    itemCheck.classList.remove('bg-menu-button');
}

// View page account
userIcon.addEventListener('click', () => {
    // Remova 'hidden' antes de iniciar a transição
    containerAccount.classList.remove('hidden');
    
    // Dê um pequeno atraso para garantir que a transição seja visível
    setTimeout(() => {
        containerAccount.classList.remove('translate-x-full');
        containerAccount.classList.add('translate-x-0');
        containerAccount.classList.add('flex');
    }, 10); // Pequeno atraso para iniciar a transição suavemente
});

closeAccount.addEventListener('click', () => {
    containerAccount.classList.remove('translate-x-0');
    containerAccount.classList.add('translate-x-full');

    // Adiciona um delay para remover a classe 'flex' após a transição
    setTimeout(() => {
        containerAccount.classList.remove('flex');
        containerAccount.classList.add('hidden');
    }, 500); // Atraso de 500ms correspondente à duração da transição
});

