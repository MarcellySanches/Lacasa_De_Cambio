'use strict';

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')
const btnIgual = document.getElementById('igual')
const btnLimparDisplay = document.getElementById('limparDisplay')
const btnLimparCalculo = document.getElementById('limparCalculo')
const btnBackspace = document.getElementById('backspace')

let novoNumero = true;
let numeroAnterior;
let operador;


const limparDisplay = () => {
    display.textContent = 0
    novoNumero = true
}
const limparCalculo = () => {
    display.textContent = ''
    numeroAnterior = 0
    operador = ''
    novoNumero = true
}
const apagarDigito = () => {
    let digitosDisplay = display.textContent
    digitosDisplay = digitosDisplay.slice(0, digitosDisplay.length-1)
    display.textContent = digitosDisplay  
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto
        novoNumero = false
        return
    }
    display.textContent += texto
}

const inserirNumero = (botao) => atualizarDisplay(botao.target.textContent)

const selecionarOperador = (botaoOperador) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true
        operador = botaoOperador.target.textContent
        numeroAnterior = parseFloat(display.textContent)
    }
}

const operacaoPendente = () => {
    if (operador != '') {
        return true
    }
}

const calcular = () => {
    if (operacaoPendente()) {
        let numeroAtual = parseFloat(display.textContent)
        novoNumero = true;
        if(operador == "+") {
            atualizarDisplay(numeroAnterior + numeroAtual)
        }
        if(operador == "-") {
            atualizarDisplay(numeroAnterior - numeroAtual)
        }
        if(operador == "*") {
            atualizarDisplay(numeroAnterior * numeroAtual)
        }
        if(operador == "/") {
            atualizarDisplay(numeroAnterior / numeroAtual)
        }        
    }
    operador = ''
    novoNumero = true
}

numeros.forEach(
    numero => numero.addEventListener('click', inserirNumero)
)
operadores.forEach(
    operador => operador.addEventListener('click', selecionarOperador)
)

btnIgual.addEventListener('click', calcular)
btnLimparDisplay.addEventListener('click', limparDisplay)
btnLimparCalculo.addEventListener('click', limparCalculo)
btnBackspace.addEventListener('click', apagarDigito)
