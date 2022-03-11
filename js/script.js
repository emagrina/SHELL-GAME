/*  - Empezaremos con unas alertas automaticas que nos pediran lo siguiente:
    -   Nombre
    -   Dificultad
    - Mas adelante crearemos una funcion que se iniciara al pulsar el botton
    - donde nos pedira lo siguiente:
    -   Canidad para ingresar
    -   Numero para adividar
    -   Resultado
*/
let namePlayer;
let dificultad;
let maxCubiletes;

(async() => {
    // Alerta de informacion al juego
    await Swal.fire({
        title: 'SHELL GAME',
        text: 'El objetivo del juego es que el jugador adivine en qué cubilete se encuentra la bolita',
        confirmButtonText: '¡Empezar!',
        confirmButtonColor: '#275cce',
        allowOutsideClick: false
    });

    // Insertar el nombre
    namePlayer = await Swal.fire({
        title: 'Configuración',
        text: 'Introduzca su nombre:',
        input: 'text',
        inputPlaceholder: 'Nombre',
        inputValidator: (value) => {
            if (!value) {
                return 'Este campo no puede estar vacio!'
            } else if (!(isNaN(value))) {
                return 'Este campo tiene que ser un texto!'
            }
        },
        confirmButtonText: 'Siguiente',
        confirmButtonColor: '#275cce',
        allowOutsideClick: false
    });

    // Especificar una dificultad
    dificultad = await Swal.fire({
        title: 'Configuración',
        text: 'Selecione el nivel de dificultad:',
        input: 'select',
        inputPlaceholder: 'Dificultad',
        inputOptions: {
            0: 'Facil (Las apuestas x2)',
            1: 'Medio (Las apuestas x5)',
            2: 'Dificil (Las apuestas x10)'
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Este campo no puede estar vacio!'
            }
        },
        confirmButtonText: 'Siguiente',
        confirmButtonColor: '#275cce',
        allowOutsideClick: false
    });

    // Mostramos el nombre del usuario
    const resumen = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    resumen.fire({
        icon: 'info',
        title: 'Bienvenido ' + namePlayer.value
    });

    // Ahora imprimiremos los cubiletes segun la dificultad selecionada
    switch (dificultad.value) {
        case '0': // Facil
            maxCubiletes = 3;
            break;
        case '1': // Medio
            maxCubiletes = 5;
            break;
        case '2': // Dificil
            maxCubiletes = 7;
            break;
    }

    for (let x = 1; x <= maxCubiletes; x++) {
        document.getElementById('board').innerHTML += `<div class="beaker" id="${x}">${x}</div>`;
    }
})();

let dineroInsertado;
let cubileteElegido;
let cubileteGanador = Math.floor(Math.random() * (maxCubiletes - 1)) + 1;

// Creamos la funcion que se executara al tocar el boton
async function reboot() {
    // Insertar el nombre
    const Queue = Swal.mixin({
        progressSteps: ['1', '2', '3'],
        confirmButtonText: 'Siguiente',
        confirmButtonColor: '#275cce',
        allowOutsideClick: false,

    })

    // Guardamos el dinero Insertado
    dineroInsertado = await Queue.fire({
        currentProgressStep: 0,
        title: 'Empezar a apostar',
        text: 'Inserte la cantidad que quieres apostar:',
        input: 'number',
        inputPlaceholder: '50',
        inputAttributes: {
            min: 1,
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Este campo no puede estar vacio!'
            } else if (isNaN(Number(value))) {
                return 'Este campo tiene que ser un numero!'
            }
        }
    });

    // Guardamos el cubilete que emos elegido
    cubileteElegido = await Queue.fire({
        currentProgressStep: 1,
        title: 'Empezar a apostar',
        text: 'En que cubilete crees que está la bola:',
        input: 'number',
        inputAttributes: {
            min: 1,
            max: 3,
            step: 1
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Este campo no puede estar vacio!'
            } else if (isNaN(Number(value))) {
                return 'Este campo tiene que ser un numero!'
            } // else if (value > 0 || value < 3)
        }
    });

    // Mostramos un brebe resumen de nuestros datos
    await Queue.fire({
        currentProgressStep: 2,
        icon: 'info',
        title: 'Confirme la apuesta',
        html: '<p><b>Nombre: </b>' + namePlayer.value + '</p>' +
            '<p><b>Dinero: </b>' + dineroInsertado.value + ' €</p>' +
            '<p><b>Cubilete elegido: </b>' + cubileteElegido.value + '</p>',
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: 'Confirmar'

    });
}