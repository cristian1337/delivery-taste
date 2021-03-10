<script>
    import {Router, Route, Link, link, links} from 'svelte-routing';
    import { db } from './firebase';
	import Menu from './pages/menu.svelte';
    import Carrito from './pages/carrito.svelte'
    import Usuario from './pages/usuario.svelte'
    import Hamburguesas from './pages/hamburguesas.svelte';
    import Combos from './pages/combos.svelte';
    import CombosDetalles from './pages/combosDetalles.svelte';
    import HamburguesaDetalles from './pages/hamburguesaDetalles.svelte';
    import OtrasDelicias from './pages/otrasDelicias.svelte';
    import OtrasDeliciasDetalles from './pages/otrasDeliciasDetalles.svelte'
    import { ContadorCarrito, NombreCliente, Identificacion } from './store';

    export let url = '';

    
    let pedidos = [];
    let Nombre;
    let iden;

    var cantidad = 0;

    const unsubscribe3 = NombreCliente.subscribe(value => {
		Nombre = value;
    });
    
    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });

    /*db.collection('pedidos').onSnapshot(query => {
        let docs = [];
        query.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})
            console.log(doc.data())
        });
        pedidos = [...docs];

        cantidad = 0;

        for (var i=0; i < pedidos.length; i++){
            cantidad = pedidos[i].unidades + cantidad;
        };

        
        console.log(cantidad);
    });*/
    db.collection('pedidos').where("idUsuario", "==", iden).onSnapshot(query => {
        let docs = [];
        cantidad = 0;
        query.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})
            console.log(doc.data())
            pedidos = [doc.data()];
            for (var i=0; i < pedidos.length; i++){
            cantidad = pedidos[i].unidades + cantidad;
        };
        ContadorCarrito.set(cantidad);
        console.log(cantidad);
        });
        /*pedidos = [...docs];*/
        

        

        
    });

    let Cont;

    const unsubscribe = ContadorCarrito.subscribe(value => {
		Cont = value;
    });

    let cont2 = Cont;
    
    function atras(){
        window.history.back();
    }
</script>
	
<Router url='{url}'>
<div class="header sombra">
	<img src="../imagenes/logo-taste.jpg" height="40px" alt="logo">
	<img on:click={atras} class="flecha-atras" src="../imagenes/atras.svg" height="20px" alt="atras">
</div>

<div>
    <Route path="carrito" component="{Carrito}" />
    <Route path="usuario" component="{Usuario}" />
    <Route path="/"><Menu /></Route>
    <Route path="hamburguesas"><Hamburguesas /></Route>
    <Route path='/hamburguesa/:id' let:params ><HamburguesaDetalles id ="{params.id}" /></Route>
    <Route path="combos"><Combos /></Route>
    <Route path='/combo/:id' let:params ><CombosDetalles id ="{params.id}" /></Route>
    <Route path="otras-delicias"><OtrasDelicias /></Route>
    <Route path='/otras-delicias/:id' let:params ><OtrasDeliciasDetalles id ="{params.id}" /></Route>
</div>

<div class="navegacion sombra">
	<Link to='/'><div>
		<img src="../imagenes/inicio-taste.svg" width="45px" alt="inicio">
	</div></Link>
	<Link to='/carrito'><div>
		<img src="../imagenes/carrito-taste.svg" width="45px" alt="carrito">
		<span class="detalles-carrito">{Cont}</span>
	</div></Link>
	<Link to='/usuario'><div>
		<img src="../imagenes/usuario-taste.svg" width="45px" alt="usuario">
	</div></Link>
</div>
</Router>

<style>
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            background: #FCE30B;
            position: sticky;
            top: 0;
        }
        .flecha-atras {
            position: absolute;
            top: 14px;
            left: 14px;
        }
        .navegacion {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 50px;
            background: white;
            position: sticky;
            bottom: 0;
        }
        .detalles-carrito{
            display: inline-block;
            position: absolute;
            color: #fff;
            font-size: 10px;
            line-height: 1;
            font-weight: 600;
            padding: 3px 5px;
            border-radius: 3px;
            background: #F84C02;
            margin-top: 5px;
        }
        .detalles-carrito::before{
            content: '';
            position: absolute;
            top: 0;
            left: -3px;
            width: 0;
            height: 0;
            margin-top: 4px;
            border-style: solid solid solid none;
            border-width: 5px 5px 5px medium;
            border-top-color: transparent !important;
            border-bottom-color: transparent !important;
            border-color: #F84C02;
        }
        .sombra {
            -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.3);
        }
</style>