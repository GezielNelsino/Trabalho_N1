//Autor: Geziel Nelsino F. da Silva
const showOptions = document.querySelector("#showOptions");
const inputOrigem = document.querySelector("#origem");
const inputDestino = document.querySelector("#destino");
const packageOptions = document.querySelector("#pacotes");

var origem = null;
var destino = null;

const paises = {
    africa: {
        nome: "África",
    },
    mato: {
        nome: "Mato Grosso",
    },
    minas: {
        nome: "Minas Gerais",
    },
    nlogonia: {
        nome: "Nlogonia",
    },
    pascoa: {
        nome: "Páscoa",
    },
    tocantins: {
        nome: "Tocantins",
    },
    america: {
        nome: "America",
    },
};

function changeMenu(categoria) {
    let cat = document.querySelector(`#${categoria}`);
    cat.className = cat.className != "visible" ? "visible" : "notVisible";
}

function navBarAnimation() {
    changeMenu("categorias");
    showOptions.className = showOptions.className == "active" ? "" : "active";
}

function changeOrigin(element, color, value, origin) {
    element.setAttribute("fill", color);
    inputOrigem.value = value;
    origem = origin;
}
function changeDestiny(element, color, value, destiny) {
    element.setAttribute("fill", color);
    inputDestino.value = value;
    destino = destiny;
}

function setMapEvents() {
    let list = document
        .querySelector(`object`)
        .contentDocument.querySelectorAll("path");
    list.forEach((element) => {
        paises[element.id]["html"] = element;
        element.addEventListener("click", () => {
            if (origem == null && destino != element.id) {
                changeOrigin(element, "red", element.id, element.id);
            } else if (destino == null && origem != element.id) {
                changeDestiny(element, "blue", element.id, element.id);
            } else {
                if (destino == element.id) {
                    changeDestiny(element, "#ffffff", "none", null);
                } else if (origem == element.id) {
                    changeOrigin(element, "#ffffff", "none", null);
                }
            }
        });
    });
}

function validaPais(ehAOrigem) {
    if (ehAOrigem) {
        if (origem == null && inputOrigem.value != destino) {
            paises[inputOrigem.value]["html"].setAttribute("fill", "red");
            origem = inputOrigem.value;
        } else if (inputOrigem.value == destino) {
            inputOrigem.value = origem;
        } else {
            paises[origem]["html"].setAttribute("fill", "#ffffff");
            paises[inputOrigem.value]["html"].setAttribute("fill", "red");
            origem = inputOrigem.value;
        }
    } 
    else if (destino == null && inputDestino.value != destino) {
        paises[inputDestino.value]["html"].setAttribute("fill", "blue");
        destino = inputDestino.value;
    }
    else if (inputDestino.value == origem) {
        inputDestino.value = destino;
    }
    else {
        paises[destino]["html"].setAttribute("fill", "#ffffff");
        paises[inputDestino.value]["html"].setAttribute("fill", "blue");
        destino = inputDestino.value;
    }
}

if (packageOptions != null) {
    packageOptions.addEventListener("wheel", (event) => {
        event.preventDefault();
        packageOptions.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    });
}

document.getElementById("nome").innerText = sessionStorage.getItem("nome");
