const btnEmpezar = document.getElementById("btnEmpezar");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const purple = document.getElementById("purple");
const ULTIMO_NIVEL = 10;
class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }
  inicializar() {
    this.eleigirColor = this.eleigirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar();

    this.nivel = 1;
    this.colores = {
      yellow,
      blue,
      green,
      purple,
    };
  }
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }
  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }
  trasformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "yellow";
      case 1:
        return "blue";
      case 2:
        return "purple";
      case 3:
        return "green";
    }
  }
  trasformarColorANumero(color) {
    switch (color) {
      case "yellow":
        return 0;
      case "blue":
        return 1;
      case "purple":
        return 2;
      case "green":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.trasformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apargarColor(color), 350);
  }

  apargarColor(color) {
    this.colores[color].classList.remove("light");
  }
  agregarEventosClick() {
    this.colores.blue.addEventListener("click", this.eleigirColor);
    this.colores.green.addEventListener("click", this.eleigirColor);
    this.colores.yellow.addEventListener("click", this.eleigirColor);
    this.colores.purple.addEventListener("click", this.eleigirColor);
  }

  eliminarEventosClick() {
    this.colores.blue.removeEventListener("click", this.eleigirColor);
    this.colores.green.removeEventListener("click", this.eleigirColor);
    this.colores.yellow.removeEventListener("click", this.eleigirColor);
    this.colores.purple.removeEventListener("click", this.eleigirColor);
  }
  eleigirColor(e) {
    const nombreColor = e.target.dataset.color;
    const numeroColor = this.trasformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }
  ganoElJuego() {
    swal("GANASTES!", "FELICITACIONES, GANASTES EL JUEGO!", "success").then(
      this.inicializar
    );
  }
  perdioElJuego() {
    swal("PERDISTES!", "LO LAMENTAMOS, VUELVE A JUGAR!", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
