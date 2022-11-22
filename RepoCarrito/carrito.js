//creamos las variables //query selecciona en html
const carrito = document.querySelector('#carrito'); //# hace referencia al id
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; //donde se almacenan los cursos

let curso = class{ //clase
    constructor(titulo,precio,img, id, cantidad){ //el constructor crea obj creado apartir de una clase
        this.titulo = titulo;
        this.precio = precio;
        this.img = img;
        this.id = id;
        this.cantidad = cantidad;
    }
}

//funciones del carrito
// para eliminar un curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){ //condicion
        const cursoId = e.target.getAttribute('data-id');
        console.log(cursoId);
        console.log(e.target.parentElement.parentElement);
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}

function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso); //add escucha el click y llama la funcion

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo, vacia el array

        limpiarHTML(); //funcion q elimina todo el HTML
    })
}
//Funciones
function agregarCurso(e){
    e.preventDefault(); //cancela el evento por defecto

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; // e. target se refiere al elemento clickeado y parentElement se refiere al elemento padre del elemento clickeado
        leerDatosCurso(cursoSeleccionado);
    }
}
//lee datos del curso
function leerDatosCurso(curso){
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }




    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }else{
                return curso; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos]; //spread operator para copiar el arreglo de cursos y no modificar el original 
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}


//Muestra el carrito de compras en el HTML
function carritoHTML(){
    
        //Limpiar el HTML
        limpiarHTML();
    
        //Recorre el carrito y genera el HTML
        articulosCarrito.forEach( curso => {
            const {img, titulo, precio, cantidad, id} = curso;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${img}" width="100">
                </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
                </td>
            `;
    
            //Agrega el HTML del carrito en el tbody
            contenedorCarrito.appendChild(row);
        })
    }

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

cargarEventListeners();
console.log(articulosCarrito);