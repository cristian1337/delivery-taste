<script>
    import {Router, Route, Link, link} from 'svelte-routing';
    import { NombreCliente, Identificacion } from '../store.js';

    let iden;
    let Nom;

    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });

    const unsubscribe = NombreCliente.subscribe(value => {
		Nom = value;
    });

    let Nombre = '';
    let NumeroIden = '';

   

    console.log(iden);
    console.log(Nom);

    function cerrarPopup(){
        if (Nom != "" && iden != ""){
            cerrar();
        };
    };

    function cerrar() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    };

    const handleEnviar = e => {
        e.preventDefault();
        NombreCliente.set(Nombre);
        Identificacion.set(NumeroIden);

        if (Nom != "" && iden != "") {
            cerrar();
        };
    };

</script>
<div class="container">
    <Router>
        <a href="./hamburguesas" use:link>
            <div class="menu-container-hamburguesas alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>Hamburguesas</p>
                </div>
            </div>
        </a>
        <div class="flex">
            <div class="menu-container-maicitos alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>Maicitos</p>
                </div>
            </div>
            <div class="menu-container-healty alto radius centrar-titulo sombra">
                <p class="titulo-menu">Healty</p>
            </div>
        </div>
        
        <div class="menu-container-combos alto radius centrar-titulo sombra">
            <div class="titulo-menu">
                <p>Combos</p>
            </div>
        </div>
        <div class="flex">
            <div class="menu-container-delicias alto radius centrar-titulo sombra">
                <div class="titulo-menu"> 
                    <p>Otras delicias</p>
                </div>
            </div>
            <div class="menu-container-adiciones alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>Adiciones</p>
                </div>
            </div>
        </div>
        <div id="popup" class="overlay">
            <div id="popupBody">
                <h2>¡Bienvenido!</h2>
                <button id="cerrar" on:click={cerrarPopup}>&times;</button>
                <div class="popupContent">
                    <p>Regalanos tus datos &#128512;</p>
                    <form on:submit={handleEnviar}>
                        <input type="text" placeholder="Nombre" bind:value={Nombre}>
                        <input type="number" placeholder="Identificación" bind:value={NumeroIden}>
                        <input class="enviar" type="submit" value="Guardar">
                    </form>
                </div>
            </div>
        </div>
    </Router>
</div>
<style>
    .container {
            margin: 15px;
        }
        a {
            text-decoration: none;
        }
        .alto {
            height: 170px;
        }
        .radius {
            border-radius: 15px;
            margin-bottom: 20px;
        }
        .centrar-titulo {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .sombra {
            -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
        }
        .menu-container-hamburguesas {
            background-image: url(../imagenes/hamburguesas.jpg);
            width: 100%;
        }
        .menu-container-combos {
            background-image: url(../imagenes/combos.jpg);
            width: 100%;
        }
        .titulo-menu {
            background: #F84C02;
            padding: 10px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            font-size: 13px;
        }
        .menu-container-maicitos{
            background-image: url(../imagenes/maicitos.jpg);
            width: 50%;
            background-size: cover;
            margin-right: 15px;
        }
        .menu-container-healty {
            background-image: url(../imagenes/healty.jpg);
            width: 50%;
            background-size: cover;
        }
        .menu-container-delicias {
            background-image: url(../imagenes/delicias.jpg);
            width: 50%;
            background-size: cover;
            margin-right: 15px;
        }
        .menu-container-adiciones {
            background-image: url(../imagenes/adiciones.jpg);
            width: 50%;
            background-size: cover;
        }
        .flex {
            display: flex;
        }
        .overlay { 
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            visibility: hidden;
            opacity: 1;
            visibility: visible;
            z-index: 4;
        }
        #popupBody{
            width: 80%;
            padding: 2%;
            border-radius: 15px;
            box-shadow: 0 0 5px #CCC;
            background: #FFF;
            position: relative;
            margin: 20% auto;
            transition: all 5s ease-in-out;
            z-index: 5;
        }
        #cerrar {
            position: absolute;
            top: 0px;
            right: 5px;
            font-size: 30px;
            font-weight: bold;
            text-decoration: none;
            color: #F00;
            transition: all 200ms;
            background: transparent;
            border-style: none;
        }
        #popup h2, .popupContent{
            text-align: center;
        }
        .popupContent p {
            margin-bottom: 25px;
        }
        .enviar {
            border-radius: 10px;
            font-weight: 500;
            color: white;
            background-color: #F84C02;
            margin-top: 15px;
        }
</style>