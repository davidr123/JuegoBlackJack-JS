
const tipos     =['C', 'D', 'H', 'S'];
const especiales=['A', 'J', 'Q', 'K'];
let deck        =[];

const btnPedir  = document.querySelector('#btnPedir');
const btnDetener= document.querySelector('#btnDetener');
const btnNuevo  = document.querySelector('#btnNuevo');
let puntajeJugador      =0;
let puntajeComputador   =0;
let totalpuntajejugador = document.querySelectorAll('small');
let divCartasJugador    = document.querySelector('#cartas-jugador');
let divCartasComputador = document.querySelector('#cartas-computador');

const crearDeck=()=>{
    for(let i=2; i<=10; i++){
        for(let tipo of tipos ){
           deck.push(i + tipo);
        }

    }
for(let tipo of tipos ){
    for(let especial of especiales){
        deck.push(especial + tipo);
    }
}


  // console.log(deck);
  deck= _.shuffle(deck);
  console.log(deck);
  return deck;

}

crearDeck();


const PedirCarta=()=>{

    if(deck.length===0){
      throw 'no hay cartas en la baraja'
    }
   const carta= deck.pop();
    return carta;
    }






const ValorCarta=(carta)=>{

    const valor= carta.substring(0, carta.length -1);
//console.log(valor);
return(isNaN(valor))?
            (valor==='A')? 11: 10
            : valor*1;

}


const  TurnoComputadora=(puntaje)=>{

    do {
        const carta= PedirCarta();
        puntajeComputador= puntajeComputador + ValorCarta(carta);
        totalpuntajejugador[1].innerHTML= puntajeComputador;
        const imgcartacomputador = document.createElement('img');
        imgcartacomputador.classList.add('carta');
        imgcartacomputador.src=`assets/cartas/${carta}.png`;
        divCartasComputador.append(imgcartacomputador);
    
        if(puntaje>21){
            break;
        }
    
    } while ((puntajeComputador < puntaje) && puntaje <=21);
    
    
    setTimeout(() => {
    
       if(puntajeJugador<21){
            alert('GANASTE!!')
        }else if(puntajeJugador===21){
            alert('21, Genial')
        } else if(puntajeJugador=== puntajeComputador){
            alert('EMPATE')
        }else{
            alert('PERDISTE')
        }
        
    }, 160 );
    
    
    }
    



//Eventos
btnPedir.addEventListener('click', ()=>{
   
    const carta= PedirCarta();
    puntajeJugador= puntajeJugador + ValorCarta(carta);
    totalpuntajejugador[0].innerHTML=puntajeJugador;
    const imgCarta= document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntajeJugador>21){
        console.warn('Lo siento, perdiste');
        btnPedir.disabled= true;
        btnDetener.disabled= true;
        TurnoComputadora(puntajeJugador);

    }else if(puntajeJugador===21){
        console.warn('21, Genial!!!')
         btnPedir.disabled= true;
         btnDetener.disabled=true;
         TurnoComputadora(puntajeJugador);
    }
   
});


btnDetener.addEventListener('click', ()=>{


   btnDetener.disabled=true
        TurnoComputadora(puntajeJugador);
        btnPedir.disabled=true;
    

});


btnNuevo.addEventListener('click', ()=>{

    console.clear();
    deck=[];
    deck=crearDeck();

    puntajeJugador      =0;
    puntajeComputador   =0;

    totalpuntajejugador[0].innerText=0;
    totalpuntajejugador[1].innerText=0;

    divCartasComputador.innerHTML='';
    divCartasJugador.innerHTML='';

    btnPedir.disabled=false;
    btnDetener.disabled=false;
   
});
