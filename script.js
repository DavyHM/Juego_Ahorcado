let pan_palabra = document.getElementById("agregar-palabra").style.display = "none";
let pan_juego = document.getElementById("jugando").style.display = "none";
let pan_inicio = document.getElementById("botones-inicio");

var palabras = ['ALURA', 'AHORCADO', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'PROGRAMACION', 'DESAFIO'];
var tablero = document.getElementById("horca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];


function mostrarpantallaagregar(){
    pan_inicio.style.display = "none";
    document.getElementById("agregar-palabra").style.display = "block";
}

function guardarPalabra() {
  
    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById("texto-agregado").value;
  
    // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
    if(nuevaPalabra !== ""){
      palabras.push(nuevaPalabra.toUpperCase());
      alert('La palabra fue guardada')
      
    
      // haz con que los componentes de la pantalla de agregar palabra desaparezcan
      document.getElementById("agregar-palabra").style.display = "none";
      iniciarJuego();
    }
    else{
      alert("Ninguna palabra ha sido digitada")
    }
  
  }

  function iniciarJuego(){
    pan_inicio.style.display = "none";
    document.getElementById("jugando").style.display = "block";
    dibujarTablero();

  //llama la función que sortea la palabra  
  escojerPalabraSecreta();

  //llama la función que dibuja las líneas donde el usuario escribirá
  dibujarLineas();

  // hace con que los botones de nuevo juego e salir aparezcan
//   document.getElementById("btn-nuevo-juego").style.display = "block"
//   document.getElementById("btn-salir").style.display = "block"

  // captura la letra que el usuario escribió
  document.onkeydown = (e) => {
    // pone la letra en letra mayuscula
    let letra = e.key.toUpperCase()
    //verifica si el usuario todavia no ha perdido
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escrribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        // si el usuario cometió más errores de los que son permitidos, 
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert('has atingido el límite de letras incorrectas')
    }

     };
    }

    function escojerPalabraSecreta() {
        let palabra = palabras[Math.floor(Math.random() * palabras.length)]
        palabraSecreta = palabra
        console.log(palabraSecreta);
        console.log(palabras);
        return palabra
      }
      
      
      
      // verifica cual es la letra en que el usuario hizo clic
      function verificarLetraClicada(key) {
        if (letras.length < 1 || letras.indexOf(key) < 0) {
          letras.push(key)
          return false
          
        }
        else {
          letras.push(key)
          return true
        }
      }
      
      function adicionarLetraCorrecta(i) {
        palabraCorrecta += palabraSecreta[i].toUpperCase()
      }
      
      function adicionarLetraIncorrecta(letter) {
        if (palabraSecreta.indexOf(letter) <= 0) {
          errores -= 1
        }
      }
      
      
      function verificarFinJuego(letra) {
        //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
       if(letraElegida.length < palabraSecreta.length) { 
          //incluye las letras ya digitadas en el arrau
          letrasIncorrectas.push(letra);
          
      
          //valida se el usuário cometió el numero maximo de errores
          if (letrasIncorrectas.length > numeroDeErrores) {
            perdiste()
          }
          else if(letraElegida.length < palabraSecreta.length) {
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra, errores)
          }
        }
       } 
      
      //Verifica si el usuario ha ganado
      function verificarVencedor(letra) {
        letraElegida.push(letra.toUpperCase());
        if (letraElegida.length == palabraSecreta.length) {
      
          ganaste()
          
        }
      
      }
      
      
      
      //impide que teclas como shift y otras, sean consideradas errores y sean escritas
      function verificarLetra(keyCode) {
        if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
          return true;
        } else {
          return false;
        }
      }