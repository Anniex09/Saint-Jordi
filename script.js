let escribiendo = false;
let paso = 0;

const imagenes = [
  "semilla.png",
  "brote.png",
  "rosa.png"
];

const textos = [
  "Todo comienza con algo pequeño...",
  "Crece poco a poco, incluso cuando no lo vemos...",
  "Y un día, florece"
];

const boton = document.getElementById("boton");
const imagen = document.getElementById("imagen");

window.onload = () => {
  escribirTexto("texto", textos[0]);
};

function crearLluvia() {
  const contenedor = document.getElementById("lluvia");

  for (let i = 0; i < 20; i++) {
    const gota = document.createElement("div");
    gota.classList.add("gota");

    gota.style.left = Math.random() * 100 + "%";
    gota.style.animationDuration = (0.5 + Math.random() * 0.5) + "s";

    contenedor.appendChild(gota);

    setTimeout(() => {
      gota.remove();
    }, 800);
  }
}

function siguientePaso() {
  if (escribiendo) return; // 

  crearLluvia(); // 
 
  paso++;

  if (paso < imagenes.length) {

    imagen.style.opacity = 0;

    setTimeout(() => {
      imagen.src = imagenes[paso];
      imagen.style.opacity = 1;
      imagen.style.transform = "scale(1.1)";
    }, 300);

    escribirTexto("texto", textos[paso]);

  } else {
    mostrarFinal();
  }
}

function mostrarFinal() {
  boton.style.display = "none";

  // Atenuar fondo
  document.querySelector(".contenedor").style.opacity = 0.3;

  const carta = document.getElementById("carta");
  carta.classList.remove("oculto");

  setTimeout(() => {
    carta.classList.add("mostrar");
  }, 50);

  escribirTexto("mensajeCarta",
`Y hoy te regalo esta rosa<br>

Por todas esas pequeñas cosas que haces,
y te hacen florecer como persona<br>

Feliz Dia de Saint Jordi`);

document.getElementById("carta").addEventListener("click", function(e) {
  if (e.target.id === "carta") {
    this.classList.remove("mostrar");
  }
});
}


function escribirTexto(id, texto) {
  let i = 0;
  let velocidad = 40;
  let elemento = document.getElementById(id);
  elemento.innerHTML = "";

  escribiendo = true; // 🔒 empieza bloqueo

  function escribir() {
    if (i < texto.length) {
      elemento.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escribir, velocidad);
    } else {
      escribiendo = false; // 🔓 se desbloquea al terminar
    }
  }

  escribir();
}
