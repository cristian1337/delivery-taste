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
        hamburguesa: "Perro Taste",
        precio: 10,
        imagen: "../imagenes/perro.png"
    },
    {
        id: 2,
        hamburguesa: "Perro Árabe",
        precio: 11,
        imagen: "../imagenes/perro.png"
    },
    {
        id: 3,
        hamburguesa: "Clásico Santarrosano",
        precio: 10,
        imagen: "../imagenes/fast-food.png"
    },
    {
        id: 4,
        hamburguesa: "Mix de papas",
        precio: 16,
        imagen: "../imagenes/papas.png"
    },
    {
        id: 5,
        hamburguesa: "Arepa",
        precio: 10,
        imagen: "../imagenes/fast-food.png"
    },
    {
        id: 6,
        hamburguesa: "Maicitos de pollo",
        precio: 12,
        imagen: "../imagenes/fast-food.png"
    },
    {
        id: 7,
        hamburguesa: "Maicitos de cerdo",
        precio: 12,
        imagen: "../imagenes/fast-food.png"
    },
    {
        id: 8,
        hamburguesa: "Maicitos Mixto",
        precio: 15,
        imagen: "../imagenes/fast-food.png"
    },
    {
        id: 9,
        hamburguesa: "Armonia perfecta",
        precio: 14,
        imagen: "../imagenes/fast-food.png"
    }];
</script>
<Router>
<div class="contenedor">
    <div class="productos">
        {#each hamburguesas as producto }
        <a href="./otras-delicias/:{producto.id}" use:link><div class="contenedorProducto">
                <div class="texto">
                    <div class="descripcion">
                        <h2>{producto.hamburguesa}</h2>
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