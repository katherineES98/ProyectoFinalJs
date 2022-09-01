//https://rickandmortyapi.com/api/character   ///*api
var pag =1
let contenedor = document.getElementById("container")
let btnAnterior= document.getElementById("btn-anterior")
let btnSiguiente= document.getElementById("btn-siguiente")
let urlApi=`https://rickandmortyapi.com/api/character/`
var btnPersonaje= document.querySelector('#search').addEventListener('click',obtenerPersonajeNombre)


btnSiguiente.addEventListener('click',()=>{
    if(pag < 42){
        pag+= 1;
        //invocamos funcion fotosMarte que hace fetch y renderiza tarjetas
        listarPersonajes();
    }else{
        contenedor.innerHTML=  `<img class="img-siguiente"  src="https://http.dog/404.jpg" alt=""></img>` 
    }
   
})

btnAnterior.addEventListener('click',()=>{
    if(pag  > 1){
        pag-= 1;
        //invocamos funcion fotosMarte que hace fetch y renderiza tarjetas
        listarPersonajes();
    }else{
        contenedor.innerHTML=  `<img class="img-error" src="https://http.dog/404.jpg" alt=""></img>` 
    }
   
})

 





const listarPersonajes = async() => {
  try {
    respuestaApi= await fetch(`https://rickandmortyapi.com/api/character/?page=${pag}`)
    console.log(respuestaApi)
    
    if (respuestaApi.status===200) {
        let respuestajson=await respuestaApi.json()
        console.log(respuestajson)
        let personajes=  respuestajson.results
        contenedor.innerHTML="";
        personajes.forEach(element => {
            contenedor.innerHTML += `
            
            <div class="col-3 cardS">
            <div class="card" style="width: 16rem;">
              <figure class="img-centrar">
                <img  class="imgRedonda" src="${element.image}" alt="">
              </figure>
             
                <div class="card-body">
                
                  <p class="card-text text-name">${element.name}</p>

                  <ul class="lista-prop">
                   <li class="text-lista">${element.status}-${element.species}</li>
                   <li class="text-lista">Gender: ${element.gender}</li>
                 
                   </ul>
                 
                  </div>
            </div>

          </div>
            
            `
            
        });
    
    } 

  } catch (error) {
    console.log(error)
  }

  
    //console.log(personajes)
}



/** */

function primeraLetra(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

//OBTENERPORNOMBRE 
function obtenerPersonajeNombre (e){
  
    let nombrePersonaje= document.querySelector('#inputBuscar').value
  
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombrePersonaje}`)

   // const nombreP=obtenerPrimero(nombrePersonaje)
    .then(response=>response.json())
   //?error: al darle de una la data.id me daba un error porque no estaba en results, peropor eso es el foreach para recorrer ya que en result se encuentra un areglo de todos los persoaje asi que recorda cuando hay errores de este tipo es recorrer prque hay muchos

    .then(data=>{
        console.log('este',data)
        contenedor.innerHTML=""
        data.results.forEach(c=>{
            if (nombrePersonaje===c.name) {
                contenedor.innerHTML+=`
                <div class="col-3 cardS">
                <div class="card" style="width: 16rem;">
                  <figure class="img-centrar">
                    <img  class="imgRedonda" src="${c.image}" alt="">
                  </figure>
                 
                    <div class="card-body">
                      <p class="card-text text-name">${c.name}</p>
                      <p class="card-text">${c.status}</p>
                      <p class="card-text">${c.species}</p>
                      </div>
                </div>
    
              </div>
            `
         //*error siguiente: estaba inicializando arriba let personaje=primeraletra(nombrepersonaje )lo hacia despues del ftch pero me tiraba un error 
         //?Uncaught ReferenceError: Cannot access 'primeraletra' before initialization at HTMLButtonElement.obtenerPersonajeNombre este
         //*entonces significa : El error "No se puede acceder antes de la inicialización" se produce cuando se accede a una variable declarada mediante let o const antes de que se inicializara en el ámbito. Para resolver el error, asegúrese de inicializar la variable antes de acceder a ella.
          //https://bobbyhadz.com/blog/javascript-referenceerror-cannot-access-before-initialization
        }else if((c.name).indexOf(primeraLetra(nombrePersonaje))!==-1){
                contenedor.innerHTML+=`
                <div class="col-3 cardS">
                <div class="card" style="width: 16rem;">
                  <figure class="img-centrar">
                    <img  class="imgRedonda" src="${c.image}" alt="">
                  </figure>
                 
                    <div class="card-body">
                      <p class="card-text text-name">${c.name}</p>
                      <p class="card-text">${c.status}</p>
                      <p class="card-text">${c.species}</p>
                      </div>
                </div>
    
              </div>
                
                `
            }else if(nombrePersonaje ===' '){
                listarPersonajes();
            }
          
        })
        
    }).catch(error => {
         contenedor.innerHTML= `<p class="text-Error">No se encontraron resultados :( </p><span><i class="fa-light fa-3x fa-face-worried"></i></span>` //!duda de el error del foreach :(
    });
    
  } 

  function busquedaNueva(){
    console.log("se esta ejecutando funcion ")
    var busqueda= document.getElementById("inputBuscar")
    var valor = busqueda.value
    if(valor.length===0){
     
      listarPersonajes()
     
    }
  }


  listarPersonajes()