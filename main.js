const resultado = document.querySelector('.resultados');
const form = document.querySelector('.get-clima');
const nameCiudad = document.querySelector('#ciudad');
const namePais = document.querySelector('#pais');

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    // verificar si los campos estan vacios
    if (nameCiudad.value === '' || namePais.value === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    callAPI(nameCiudad.value,namePais.value);
    // Para controlar que los valores de los campos sean correctos
    // console.log(nameCiudad.value);
    // console.log(namePais.value);

})

// Funciones

function callAPI(ciudad,pais) {
    const apiKey = '14c57f631ebd8bef7ab2bc3f52ea55a6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    // https://api.openweathermap.org/data/2.5/weather?q=bogota,Colombia&appid=14c57f631ebd8bef7ab2bc3f52ea55a6

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            }else{
                limpiarHTML();
                showClima(dataJSON);
            }
            // console.log(dataJSON)
        })
        .catch(error => {
            console.log(error);
        })
}   

function showClima(data) {
     const {name, main:{temp,temp_min,temp_max},weather:[arr]} = data;
     const containerClima = document.createElement('div');
     const grados = kelvinaCentigrados(temp);
     const gradosMax = kelvinaCentigrados(temp_max);
     const gradosMin = kelvinaCentigrados(temp_min);


     containerClima.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="iconoClima">
        <h2>${grados}</h2>
        <p>MAX:${gradosMax}</p>
        <p>MIN:${gradosMin}</p>
     `;

     resultado.appendChild(containerClima);
     console.log(name);
     console.log(temp);
     console.log(temp_max);
     console.log(temp_min);
     console.log(arr.icon);


}

function mostrarError(mensaje) {
    console.log(mensaje)
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = mensaje;
    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1500);
}

function kelvinaCentigrados(temp) {
    return parseInt(temp - 273.15);
}


function limpiarHTML() {
    resultado.innerHTML = '';
}