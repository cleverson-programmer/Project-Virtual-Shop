/*
const adress = document.querySelector('.user-location')

adress.addEventListener('click', (event) => {
    // Verifica se o navegador suporta Geolocalização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }

})

// Função chamada em caso de sucesso ao obter a localização
function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Exibe a latitude e longitude no console
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    // Você pode adicionar a localização ao seu site ou enviá-la para o backend
    document.getElementById('address').value = `Localização: Latitude ${latitude}, Longitude ${longitude}`;
}

// Função chamada em caso de erro ao obter a localização
function errorCallback(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Usuário negou a solicitação de Geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informações de localização não estão disponíveis.");
            break;
        case error.TIMEOUT:
            alert("A solicitação de localização expirou.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocorreu um erro desconhecido.");
            break;
    }
}

*/

//API GEOCODING DO MAPS PARA ACHAR ENDEREÇO EXATO.
/*
function getAddress(latitude, longitude) {
    const apiKey = 'SUA_CHAVE_API_GOOGLE_MAPS'; // Substitua pela sua chave de API do Google Maps
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const address = data.results[0].formatted_address;
                console.log('Endereço: ', address);

                // Exiba o endereço na página ou faça outras ações
                document.getElementById('endereco').textContent = address;
            } else {
                console.log('Erro ao obter o endereço:', data.status);
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
}
*/