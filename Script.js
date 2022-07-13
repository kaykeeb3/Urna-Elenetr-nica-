let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa() {
   let etapa = etapas[etapaAtual];
  
   let numeroHtml ='';
   numero = '';
   votoBranco = false;
   
   for(let i=0;i<etapa.numeros;i++) {
     if(i === 0) {
     numeroHtml += '<div class="numero pisca"></div>';
     }else {
      numeroHtml += '<div class="numero"></div>';
   }
}
  
  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    //alert("Finalizou de digitar o voto!");
    console.log("Atualizar Interface");
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
      if(item.numero === numero) {
        return true;
      } else {
        return false;
      }
    });
     
     if(candidato.length > 0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}</br>Partido: ${candidato.partido}`;
      
      let fotosHtml = '';
      for(let i in candidato.fotos){
         if(candidato.fotos[i].small){
         fotosHtml += `<div class="d-1-image"><img src="${candidatos.fotos[i].url}" alt="" />${candidatos.fotos[i].legenda}</div>`;
         } else{
           fotosHtml += `<div class="d-1-image small"><img src="${candidatos.fotos[i].url}" alt="" />${candidatos.fotos[i].legenda}</div>`;
      }
   }
       lateral.innerHTML = fotosHtml;
   }  else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
   }
   // console.log("candidato", candidato);
   // console.log(numero);
}

function clicou(n) {
   let elNumero = document.querySelector('.numero.pisca');
   if(elNumero !== null) {
   elNumero.innerHTML = n;
   numero = `${numero}${n}`;
   
  elNumero.classList.remove('pisca');
  if(elNumero.nextElementSibling !== null) {
  elNumero.nextElementSibling.classList.add('pisca');
   } else{
     atualizaInterface();
   }
 }
  
   
}
function branco () {
    if(numero === '') {
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
      alert("Para votar em Branco não pode ter digitado nem um Número ");
    }
}
function corrige () {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];
    
    let votoConfirmado = false;
    
   if(votoBranco === true) {
     votoConfirmado = true;
     // console.log("Confirma como BRANCO...");
    } else if(numero.length === etapa.numeros) {
      votoConfirmado = true;
      // console.log("Confirmando como "+numero);
    }
     if(votoConfirmado) {
      etapaAtual++;
     if (etapas[etapaAtual] !== undefined)  {
       comecarEtapa();
     } else {
       document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
       
     // console.log("FIM");
     }
      
      
      // console.log(etapas[etapaAtual]);
     }
    
}


comecarEtapa();