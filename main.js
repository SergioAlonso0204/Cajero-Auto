var cuentas = [
    { nombre: "Sergio", saldo: 200, password: '1234' },
    { nombre: "Dana", saldo: 290, password: '1234' },
    { nombre: "David", saldo: 67, password: '1234' }
];

var user = document.getElementById('username')
var password = document.getElementById('password')
var continuar = document.getElementById('btn_continuar')
var vistaHome = document.getElementById("home");
var vistaLogin = document.getElementById("login");
var btnConsulta = document.getElementById('btn_consulta')
var btnIngresa = document.getElementById('btn_ingresa')
var btnRetira = document.getElementById('btn_retira')
var btnSalir = document.getElementById('btn_salir')
var error = document.getElementById('error')
var bienvenida = document.getElementById('bienvenida')


var usuarioSeleccionado;

continuar.addEventListener('click', validarUsuario);
continuar.addEventListener('click', pruebaValidarC);
btnConsulta.addEventListener('click', consulta);
btnIngresa.addEventListener('click', ingresa);
btnRetira.addEventListener('click', retira);
btnSalir.addEventListener('click', salir)

var globalTotal = 0
var reglaTotales = 0

function validarUsuario() {
    switch (user.value) {
        case 'Sergio':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        case 'Dana':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        case 'David':
            usuarioSeleccionado = user.value;
            pruebaValidarC
            break;

        default:
            error.innerHTML = 'Usuario incorrecto'
            user.value = '';
            password.value = ''
            user.focus();
            break;
    }
}

function pruebaValidarC() {
    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            if (cuentas[i].password === password.value) {
                vistaHome.style.display = "block";
                vistaLogin.style.display = "none";
                bienvenida.innerHTML = 'Bienvenido @' + cuentas[i].nombre

            } else {
                error.innerHTML = 'Contraseña no encontrada'
                password.value = '';
                user.value = '';
            }
        }
    }
}

function salir() {
    vistaHome.style.display = "none";
    vistaLogin.style.display = "block";
    user.value = '';
    user.focus();
    password.value = '';
}

function consulta() {
    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            if (globalTotal == 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Tu saldo actual es:',
                    text: '$' + cuentas[i].saldo + '.00 COP',
                })
            } else {
                cuentas[i].saldo = globalTotal

                Swal.fire({
                    icon: 'info',
                    title: 'Tu saldo actual es:',
                    
                    text: '$' + cuentas[i].saldo + '.00 COP',
                })
            }
        }
    }
}

function ingresa() {
    var saldoIngresado = 0

    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            var saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "Ingresa un monto",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if(result.isConfirmed){
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)
                    if(globalTotal == 0){
                        reglaTotales =  saldoActual + saldoIngresado
                    }else{
                        reglaTotales = globalTotal + saldoIngresado
                    }
                    
                    if( reglaTotales > 990){
                        Swal.fire({
                                icon: 'warning',
                                title:'Aviso',
                                text: 'Al ingresar esa cantidad rebasa el limite',
                            })
                    }else{
                        globalTotal = saldoActual += saldoIngresado
                        
                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Saldo ingresado',
                                text: '$' + saldoIngresado + '.00 COP',
                                icon: 'info',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            })                      
                        }
                    }
                }else if(result.isDenied){
                    
                }               
                
            });

        }
    }
}

function retira() {
    var saldoIngresado = 0

    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioSeleccionado) {
            var saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "¿Qué cantidad desea retirar?",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)

                    if(globalTotal == 0){
                        reglaTotales =  saldoActual - saldoIngresado
                    }else{
                        reglaTotales = globalTotal - saldoIngresado
                    }

                    if (reglaTotales < 10) {
                        Swal.fire({
                            icon: 'warning',
                            title:'Aviso',
                            text: 'No puedes tener menos de $10.00 COP en tu cuenta',
                        })
                    } else {
                        globalTotal = saldoActual -= saldoIngresado

                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Monto a retirar',
                                text: '$' + saldoIngresado + '.00 COP',
                                icon: 'info',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            }) 

                        }
                    }
                } else if(result.isDenied) {
                    
                }
            });

        }
    }
}