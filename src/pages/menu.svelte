<script>
    import {Router, Route, Link, link} from 'svelte-routing';
    import { NombreCliente, Identificacion, TelefonoU, DireccionU } from '../store.js';
    const popup = document.getElementById('popup');
 

    let iden;
    let Nom;
    let tel;
    let dir;

    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });

    const unsubscribe = NombreCliente.subscribe(value => {
		Nom = value;
    });

    const unsubscribe3 = TelefonoU.subscribe(value => {
		tel = value;
    });

    const unsubscribe4 = DireccionU.subscribe(value => {
		dir = value;
    });

    let Nombre = '';
    let NumeroIden = '';
    let Telefono = '';
    let Direccion = '';


    console.log(iden);
    console.log(Nom);

    function cerrar() {
        const popup = document.getElementById('popup');
        if (Nom != "" && iden != "" && tel != "" && dir != ""){
            popup.style.display = 'none';
        }else {
            alertify.notify('Ingresa los datos solicitados', 'error', 5, function(){  console.log('dismissed'); });
        }
    };

    const handleEnviar = e => {
        e.preventDefault();
        NombreCliente.set(Nombre);
        Identificacion.set(NumeroIden);
        TelefonoU.set(Telefono);
        DireccionU.set(Direccion);

        var celular = tel.toString();

        if (celular.length < 10 || celular.length > 10){
            alertify.notify('Ingresa un número de celular valido', 'error', 5, function(){  console.log('dismissed'); });
        }else if(Nom != "" && iden != "" && celular.length == 10 && dir != ""){
            alertify.notify('Gracias !', 'success', 5, function(){  console.log('dismissed'); });
            cerrar();
        }
        
        console.log(Nombre);
        console.log(NumeroIden);
        console.log(celular.length);
        console.log(Direccion);
    };

    window.addEventListener("DOMContentLoaded", () => {
        if (Nom == "" && iden == "" && tel == "" && dir == ""){
            const popup = document.querySelector('.overlay');
            popup.style.visibility = 'visible';
        };
    });
    

</script>
<div class="container">
    <Router>
        <a href="./hamburguesas" use:link>
            <div class="menu-container-hamburguesas alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>HAMBURGUESAS</p>
                </div>
            </div>
        </a>
        <!--<div class="flex">
            <div class="menu-container-maicitos alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>MAICITOS</p>
                </div>
            </div>
            <div class="menu-container-healty alto radius centrar-titulo sombra">
                <p class="titulo-menu">HEALTY</p>
            </div>
        </div>-->
        <a href="./combos" use:link>
            <div class="menu-container-combos alto radius centrar-titulo sombra">
                <div class="titulo-menu">
                    <p>COMBOS</p>
                </div>
            </div>
        </a>
        <a href="./otras-delicias" use:link>
            <div class="menu-container-delicias alto radius centrar-titulo sombra">
                <div class="titulo-menu"> 
                    <p>OTRAS DELICIAS</p>
                </div>
            </div>
        </a>
        <div id="popup" class="overlay">
            <div id="popupBody">
                <h2>¡Bienvenido a TASTE!</h2>
                <button id="cerrar" on:click={cerrar}>&times;</button>
                <div class="popupContent">
                    <p>Regalanos tus datos &#128512;</p>
                    <form on:submit={handleEnviar}>
                        <div class="form-inicio">
                            <input type="text" placeholder="Nombre" bind:value={Nombre}>
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="form-inicio">
                            <input type="number" placeholder="Identificación" bind:value={NumeroIden}>
                            <i class="fas fa-id-badge"></i>
                        </div>
                        <div class="form-inicio">
                            <input type="number" placeholder="Número celular" bind:value={Telefono}>
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <div class="form-inicio">
                            <textarea class="input-direccion" name="" id="" rows="3" placeholder="Dirección" bind:value={Direccion}></textarea>
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <input class="enviar" type="submit" value="Guardar">
                    </form>
                    <p class="info">Tus datos no seran guardados ni utilizados para enviar spam o publicidad, solo son para hacer llegar tu pedido y que estes al tanto de este.</p>
                    <p class="info">Recuerda que el domicilio es variable y no se añade al total de esta compra, el costo de este te lo haremos llegar a tu whatsapp</p>
                </div>
            </div>
        </div>
    </Router>
</div>
<style>
    .info {
        font-size: 10px;
        text-align: justify;
        margin-bottom: 5px !important;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    .form-inicio {
        position: relative;
    }
    .form-inicio i {
        position: absolute;
        left: 8px;
        top: 5px;
        font-size: 20px;
    }
    .form-inicio textarea, .form-inicio input {
        width: 100%;
        padding-left: 30px;
    }
    .container {
        margin: 10px;
        height: 85vh;
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
            background-image: url(../imagenes/BannerH.jpg);
            background-size: contain;
            height: 120px;
            width: 100%;
        }
        .menu-container-combos {
            background-image: url(../imagenes/BannerC.jpg);
            background-size: contain;
            height: 120px;
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
        /*.menu-container-maicitos{
            background-image: url(../imagenes/maicitos.jpg);
            width: 50%;
            background-size: cover;
            margin-right: 15px;
        }
        .menu-container-healty {
            background-image: url(../imagenes/healty.jpg);
            width: 50%;
            background-size: cover;
        }*/
        .menu-container-delicias {
            background-image: url(../imagenes/BannerO.jpg);
            width: 100%;
            background-size: contain;
            height: 120px;
        }
        /*.menu-container-adiciones {
            background-image: url(../imagenes/adiciones.jpg);
            width: 50%;
            background-size: cover;
        }
        .flex {
            display: flex;
        }*/
        .overlay { 
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            opacity: 1;
            visibility: hidden;
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
            top: 15px;
            right: -2px;
            font-size: 32px;
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