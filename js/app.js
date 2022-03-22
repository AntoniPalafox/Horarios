const resultado = document.querySelector('#resultado');
const zona = document.querySelector('#zona');
const listadoCiudades = document.querySelector('#listadoCiudades');

window.onload = () => {
    
}

zona.addEventListener('input', e => {

    limpiar(resultado);
    const zonaHoraria = e.target.value;
    console.log(zonaHoraria);
    consultarAPI(zonaHoraria);
})

function consultarAPI(zona){
    
    url = `http://worldtimeapi.org/api/timezone/${zona}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCiudad(resultado))
        .catch(error => console.log(error));
}

function obtenerCiudad(resultadoZona){

    if(resultadoZona.client_ip){
        mostrarResultado(resultadoZona);
        return;
    }

    limpiar(listadoCiudades)
    resultadoZona.forEach(consulta => {
        opcion = consulta.split('/').splice(1,2)
        listadoCiudades.innerHTML += `<option value=${consulta}>${opcion}</option>`;
    });

    listadoCiudades.addEventListener('input', e => {
        const ciudad = e.target.value;
        console.log(ciudad);
        consultarAPI(ciudad)
    });

}

function mostrarResultado(datos){
    limpiar(resultado);
    console.log(datos);
    const { datetime, timezone} = datos;

    let lugar = timezone.split('/').pop()
    if(lugar.includes('_')){
        lugar = lugar.split('_').join(' ')
    }
    let separar = datetime.split('T');
    let fecha =  separar[0].split('-').reverse().join('/');
    let hora = separar[1].split('.')[0];



    console.log(fecha);
    console.log(hora);

    resultado.innerHTML = `
    <h1>Hora de ${lugar}</h1>
    <p>Hoy es ${fecha}</p>
    <p>Son las ${hora}</p>
    `;


}

function limpiar(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }
}
