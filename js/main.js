let iniciarFacil = document.getElementById("iniciar-facil")
let iniciarNormal = document.getElementById("iniciar-normal")
let iniciarDificil = document.getElementById("iniciar-dificil")
let nav = document.getElementById("nav")
let btnReiniciar = document.getElementById("btn-reiniciar")
let container = document.getElementById("container");
let contador = document.getElementById("contador");
let contadorH1 = document.getElementById("contador-h1");
let cronometro = document.getElementById("cronometro");
let cronometroH1 = document.getElementById("cronometro-h1");
let cronometroContainer = document.getElementById("cuenta-atras")

let audioBlop = new Audio("../audio/blop.mp3")
let audioWin = new Audio("../audio/win.mp3")
let audioLose = new Audio("../audio/lose.mp3")
let audioPedo = new Audio("../audio/pedo.mp3")

iniciarFacil.addEventListener("click", ()=>{
    nav.innerHTML = ""

    juego(900, 70, "green");
})

iniciarNormal.addEventListener("click", ()=>{
    nav.innerHTML = ""

    juego(750, 65, "yellow");
})

iniciarDificil.addEventListener("click", ()=>{
    nav.innerHTML = ""
    
    juego(550, 60, "red");
})

function juego(timer1, timer2, color){
    let intervalo1 = setInterval(()=>{
        let bola = document.createElement("div")
        bola.classList.add("bola")
        container.appendChild(bola)
        
        let widthContainer = container.offsetWidth - 10;
        let heightContainer = container.offsetHeight;
        
        bola.style.backgroundColor = color
        bola.style.top = `${Math.random()*heightContainer - 40}px`
        bola.style.left = `${Math.random()*widthContainer - 50}px`
        
        let timeout = setTimeout(()=>{
            container.removeChild(bola)
            audioPedo.play()
            audioPedo.volume = 0.1
        },timer1) // Cada cuanto tiempo desaparece la pelota

        bola.addEventListener("click", ()=>{
            contador.value++
            contadorH1.textContent = contador.value
            bola.style.backgroundColor = "white"
            audioBlop.play();
            setTimeout(()=>{
                container.removeChild(bola);
                clearTimeout(timeout);
            }, 50)
        })
    }, 1000); // Cada cuanto tiempo sale una pelota
    
    cronometro.value = timer2
    cronometroH1.textContent = cronometro.value

    let intervalo2 = setInterval(()=>{
        cronometro.value--
        cronometroH1.textContent = cronometro.value

        if(cronometro.value === "15"){
            cronometroContainer.style.backgroundColor = "red"
        }
    }, 1000); // Cada cuanto tiempo disminuye el cronometro

    let intervalo3 = setInterval(()=>{
        if(cronometro.value === "0"){
           winOrLose(audioLose, "perdiste", "PERDISTE")
           clearInterval(intervalo1)
           clearInterval(intervalo2)
           clearInterval(intervalo3)
        }
    
        else if(contador.value === "50"){
            winOrLose(audioWin, "ganaste", "GANASTE")
            clearInterval(intervalo1)
            clearInterval(intervalo2)
            clearInterval(intervalo3)
        }
    }, 10) 
}

function winOrLose(audio, id, texto){
    nav.innerHTML = ""
    audio.play()
    contadorH1.textContent = "0"
    cronometroH1.textContent = "0"
    container.innerHTML = `<p id=${id}>${texto}<p>
    <p class="texto">Puntaje: ${contador.value}<p>
    <p class="texto">Tiempo Restante: ${cronometro.value}<p>`

    let btnReiniciar = document.createElement("button")
    btnReiniciar.classList.add("btn-reiniciar")
    btnReiniciar.textContent = "Reiniciar"
    container.appendChild(btnReiniciar)
    btnReiniciar.addEventListener("click",()=>{
        location.reload()
    })
}