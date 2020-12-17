<script>
    import {Router, Route, Link, link} from 'svelte-routing';
    import { db } from '../firebase';
    import { Identificacion, ContadorCarrito } from '../store.js';

    let pedidos = [];
    let iden;
    var cantidad = 0;
    
    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });

    db.collection('pedidos').where("idUsuario", "==", iden).onSnapshot(query => {
        let docs = [];
        cantidad = 0;
        query.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})

            pedidos = [doc.data()];
            for (var i=0; i < pedidos.length; i++){
            cantidad = pedidos[i].unidades + cantidad;
        };
        ContadorCarrito.set(cantidad);

        });
        pedidos = [...docs];
    });

    const hamburguesas = [
    {
        id: 1,
        hamburguesa: "Clasica",
        peso: "150g",
        precio: 11,
        imagen: "../imagenes/hamburguesa.png"
    },
    {
        id: 2,
        hamburguesa: "Doble",
        peso: "300g",
        precio: 15,
        imagen: "../imagenes/hamburguesa.png"
    },
    {
        id: 3,
        hamburguesa: "Extra queso",
        peso: "150g",
        precio: 14,
        imagen: "../imagenes/hamburguesa.png"
    },
    {
        id: 4,
        hamburguesa: "Colonial",
        peso: "150g",
        precio: 13,
        imagen: "../imagenes/hamburguesa.png"
    },
    {
        id: 5,
        hamburguesa: "Field burger",
        peso: "200g",
        precio: 15,
        imagen: "../imagenes/hamburguesa.png"
    }];
</script>
<Router>
<div class="contenedor">
    <div class="productos">
        {#each hamburguesas as producto }
        <a href="./hamburguesa/:{producto.id}" use:link><div class="contenedorProducto">
                <div class="texto">
                    <div class="descripcion">
                        <h2>{producto.hamburguesa}</h2>
                        <p>{producto.peso}</p>
                    </div>
                    <div class="precio">
                        <img src="../imagenes/agregar.svg" width="20px" alt="agregar">
                        <p>${producto.precio}.000</p>
                    </div>
                </div>
                <div class="imagen">
                    <img src="{producto.imagen}" alt="">
                </div>   
        </div></a>
        {/each} 
    </div>
</div>
</Router>
<style>
    .contenedor {
        min-height: 100vh;
    }
.contenedorProducto, .precio, .imagen {
            display: flex;
        }
        .contenedorProducto{
            justify-content: space-around;
            margin: 15px;
            padding: 15px;
            border-radius: 12px;
            background: white;
            -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
        }
        .precio {
            align-items: center;
            margin-top: 10px;
        }
        .precio img{
            margin-right: 10px;
        }
        .imagen {
            align-items: center;
        }
        .descripcion h2 {
            font-size: 15px;
        }
</style>