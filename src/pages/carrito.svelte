<script>
    import { onMount } from 'svelte';
    import { db } from '../firebase';
    import { NombreCliente, Identificacion, ContadorCarrito } from '../store.js';

    let pedidos = [];
    let Nombre;
    let iden;
    var cantidad = 0;
    var precio = 0;

    const unsubscribe = NombreCliente.subscribe(value => {
		Nombre = value;
    });
    
    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });

    db.collection('pedidos').where("idUsuario", "==", iden).onSnapshot(query => {
        let docs = [];
        cantidad = 0;
        precio = 0;
        query.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})

            pedidos = [doc.data()];
            if (pedidos.length == 0){
                cantidad = 0;
            };
            for (var i=0; i < pedidos.length; i++){
            cantidad = pedidos[i].unidades + cantidad;
            precio = pedidos[i].precio + precio;
            };
        

        });
        ContadorCarrito.set(cantidad);
        pedidos = [...docs];
    });

    let contador = 1;

    function handleClickMas(){
        contador += 1;
    };

    function handleClickMenos(){
        if (contador <= 1){
        contador = 1;
        }else{
            contador -= 1;
        };
    };


    const eliminar = event => {
        console.log(event.target.dataset.id);
        let identificacion = event.target.dataset.id;
        db.collection('pedidos').doc(identificacion).delete();
    };

</script>
<div class="container">
    {#each pedidos as pedido}
    <div class="contenedorProducto">
        <div class="header">
            <h5>{pedido.hamburguesa}</h5>
            <h5>{pedido.precio}</h5>
        </div>
        <div class="unidades">
            <div class="cantidad">
                <p>Cantidad:</p>
                <p class="contador"><strong>{pedido.unidades}</strong></p>
            </div>
            <button class="btn-borrar" on:click|self={eliminar} data-id="{pedido.id}"><i class="far fa-trash-alt"></i></button>
        </div>
        <details>
            <summary>
                Especificaciones
            </summary>
            <ul>
                <li>Tipo de pan: {pedido.tipoDePan}</li>
                <li>Salsa: {pedido.salsasH}</li>
                <li>Acompañantes: {pedido.acompañantes}</li>
                <li>Adiciones: {pedido.adiciones}</li>
                <li>Bebida: {pedido.bebida}</li>
                <li>Preferencias: {pedido.preferencias}</li>
            </ul>
        </details>
    </div>
    {/each}
    
    <div class="domicilio">
        <h5>Domicilio</h5>
        <h5>$2.000</h5>
    </div>

    
</div>
<div class="footer">
    <div class="total">
        <h4>TOTAL</h4>
        <h4>${precio + 2000}</h4>
    </div>
    <div class="pagar">
        <button>Enviar Pedido</button>
        <button>Recoger</button>
    </div>
</div>

<style>
    summary {
        outline: 0;
    }
    .cantidad {
        display: flex;
        align-items: center;
    }
    .contenedorProducto {
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin: 15px;
            border-radius: 12px;
            -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
        }
        .container {
            min-height: 100vh;
        }
        .contador {
            width: 20px;
            text-align: center;
        }
        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .unidades {
            display: flex;
            justify-content: space-between;
        }
        .domicilio {
            border-top: 1px solid rgb(196, 196, 196);
            padding: 20px;
            display: flex;
            justify-content: space-between;
        }
        .total {
            border-top: 1px solid rgb(196, 196, 196);
            padding: 20px 20px 0px 20px;
            display: flex;
            justify-content: space-between;
        }
        .pagar {
            display: flex;
            justify-content: center;
        }
        .pagar button{
            border: none;
            font-size: 18px;
            color: white;
            background: #F84C02;
            font-family: 'Montserrat', sans-serif;
            border-radius: 25px;
            padding: 10px 40px;
            margin: 15px;
            font-size: 12px;
        }
        .footer {
            position: sticky;
            bottom: 50px;
            width: 100%;
            background: white;
        }
        .btn-borrar {
            -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.35);
            -moz-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.35);
            box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.35);
            background-color: white;
        }
        .fa-trash-alt {
            color: #F84C02;
        }
</style>