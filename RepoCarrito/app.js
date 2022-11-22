const carrito = document.getElementById('#carrito');
const listaCursos= document.querySelector('#lista-cursos');
const contenedorCarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito=[];

function cargarEventListeners(){
    listaCursos.addEventListener('click',agregarCurso);
     carrito.addEventListener('clikc',eliminarCurso);
     vaciarCarrito.addEventListener('click',vaciarCarrito);

}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const curso =a.target.parentElement.parentElement;
        console.log(curso)
        leerDatosCurso(curso);
        
    }
}

function leerDatosCurso(curso){
    const infoCurso={
        imgen:curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAtribute('data-id'),
        cantidad:1
    }
    articulosCarrito= [...articulosCarrito, infoCurso];
    console.log(articulosCarrito)
    carritoHTML();
}


function carritoHTML(){
    articulosCarrito.forEach(curso =>{
        const row =document.createElement('tr');
        row.innerText= `
        <td>${curso.titulo}</td>
        `;
        contenedorCarrito.appendChild(row);
    })
}
