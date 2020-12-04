<script>

    /*import {tipoPan, salsas, acompañantes, adiciones, bebida, preferencias, unidades} from '../store.js';*/
    import { NombreCliente, Identificacion, ContadorCarrito } from '../store.js';
    import { db } from '../firebase';
    import { navigate } from "svelte-routing";
    export let id;

    let Nombre;
    let iden;
    let Cont;
    var contador = 1;
    var indice;
    var precioP;
    var precioAux;

    const unsubscribe = NombreCliente.subscribe(value => {
		Nombre = value;
    });
    
    const unsubscribe2 = Identificacion.subscribe(value => {
		iden = value;
    });
    
    const unsubscribe3 = ContadorCarrito.subscribe(value => {
		Cont = value;
    });

    const Listahamburguesas = [
    {
        id: ':1',
        hamburguesa: "Hamburguesa Clasica",
        peso: "150g",
        precio: 11000,
        imagen: "../imagenes/hamburguesa.png",
        descripcion: "150 gramos de jugosa carne artesanal, lechuga y tomate frescos, queso mozarella fundido, tocineta ahumada y acompañada con salsas de la casa."
    },
    {
        id: ':2',
        hamburguesa: "Hamburguesa Doble",
        peso: "300g",
        precio: 14000,
        imagen: "../imagenes/hamburguesa.png",
        descripcion: "2 porciones de 150 gramos de jugosa carne artesanal con 2 capas queso mozzarella fundido, tomate y lechuga frescos, tocineta ahumada y  salsas de la casa"
    },
    {
        id: ':3',
        hamburguesa: "Hamburguesa Extra queso",
        peso: "150g",
        precio: 13000,
        imagen: "../imagenes/hamburguesa.png",
        descripcion: "150 gramos de jugosa carne artesanal acompañadas de capas de queso mozzarella y queso parrilla derretidos en tu hamburguesa, tocineta ahumada y acompañada de salsas de la casa."
    },
    {
        id: ':4',
        hamburguesa: "Hamburguesa Colonial",
        peso: "150g",
        precio: 13000,
        imagen: "../imagenes/hamburguesa.png",
        descripcion: "Diferente pero nuestra, elaborada con carne de la casa y acompañada de crocantes aros de cebolla apanados, lechuga y tomate frescos, con una capa de suave aguacate picado, tocineta ahumada y salsas de la casa. "
    },
    {
        id: ':5',
        hamburguesa: "Hamburguesa Field burger",
        peso: "200g",
        precio: 15000,
        imagen: "../imagenes/hamburguesa.png",
        descripcion: "Con una mezcla perfecta de sabores, nuestros 200 gr de carne de Angus acompañada de salsa de la casa, tocineta ahumada y queso fundido hacen de nuestra field burguer uno de nuestros productos Premium. "
    }];

    const agregarHamburguesa = async () => {
        await db.collection('pedidos').doc().set({
            ...pedido, createdAt: Date.now()
        });
        console.log(pedido);
        navigate("/hamburguesas", { replace: true });
    };

    let pedido = {
        hamburguesa: "",
        salsasH: "",
        acompañantes: [],
        adiciones: [],
        bebida: [],
        preferencias: [],
        unidades: contador,
        usuario: Nombre,
        idUsuario: iden,
        precio: 0
    };


    if (id === ':1'){
        indice = 0;
        pedido.hamburguesa = Listahamburguesas[indice].hamburguesa;
        pedido.unidades = contador;
        precioAux = Listahamburguesas[indice].precio;
        precioP = precioAux * contador;
        pedido.precio = precioP * contador;
    }else if (id === ':2'){
        indice = 1;
        pedido.hamburguesa = Listahamburguesas[indice].hamburguesa;
        precioAux = Listahamburguesas[indice].precio;
        precioP = precioAux * contador;
        pedido.precio = precioP * contador;
    }else if (id === ':3'){
        indice = 2;
        pedido.hamburguesa = Listahamburguesas[indice].hamburguesa;
        precioAux = Listahamburguesas[indice].precio;
        precioP = precioAux * contador;
        pedido.precio = precioP * contador;
    }else if (id === ':4'){
        indice = 3;
        pedido.hamburguesa = Listahamburguesas[indice].hamburguesa;
        precioAux = Listahamburguesas[indice].precio;
        precioP = precioAux * contador;
        pedido.precio = precioP * contador;
    }else if (id === ':5'){
        indice = 4;
        pedido.hamburguesa = Listahamburguesas[indice].hamburguesa;
        precioAux = Listahamburguesas[indice].precio;
        precioP = precioAux * contador;
        pedido.precio = precioP * contador;
    };
 

    function handleClickMas(){
        contador += 1;
        pedido.unidades = contador;
        precioAux = Listahamburguesas[indice].precio * contador;
        precioP = pedido.precio * contador;
    };
    function handleClickMenos(){
        if (contador <= 1){
        contador = 1;
        }else{
            contador -= 1;
            pedido.unidades = contador;
            pedido.precio = Listahamburguesas[indice].precio * contador;
            precioP = pedido.precio * contador;
        };
    };

    window.addEventListener("DOMContentLoaded", () => {
        const checks = document.querySelectorAll('.check');
        let check = false;
        let contadorCheck = 0;
        checks.forEach(btn => {
            
            btn.addEventListener('click', (e)=> {
                contadorCheck += 1;
                if (contadorCheck == 1){
                    check = false;
                }else if((contadorCheck % 2) == 0){
                    check = true;
                }

                if (e.target.dataset.espec == "codorniz" && check == false){
                    precioP = 3000 + precioP;
                    pedido.precio = 3000 + pedido.precio;
                    check = true;
                }else if(e.target.dataset.espec == "codorniz" && check == true){
                    precioP = precioP - 3000;
                    pedido.precio = pedido.precio - 3000;
                    check = false;
                }

                if (e.target.dataset.espec == "francesa" && check == false){
                    precioP = 5000 + precioP;
                    pedido.precio = 5000 + pedido.precio;
                    check = true;
                }else if(e.target.dataset.espec == "francesa" && check == true){
                    precioP = precioP - 5000;
                    pedido.precio = pedido.precio - 5000;
                    check = false;
                }

                /*if (contadorcheck === 1){
                    precioP = parseInt(e.target.dataset.precio, 10) + precioP;
                
                    pedido.precio = parseInt(e.target.dataset.precio, 10) + pedido.precio;
                }else if (contadorcheck === 2){
                    precioP = precioP - parseInt(e.target.dataset.precio, 10);
                
                    pedido.precio = pedido.precio - parseInt(e.target.dataset.precio, 10);

                    contadorcheck = 0;
                }*/

            });
            
        });

        console.log(checks);
    });

    
</script>
<div class="imagen">
        
</div>
<div class="descripcion">
    <p><strong>{Listahamburguesas[indice].hamburguesa}:</strong> {Listahamburguesas[indice].descripcion}</p>
</div>
<div class="contenedorAdiciones">
    <div class="adiciones">
        <div class="titulo-adicion">
            <h5>Tipo de pan(obligatorio)</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.tipoDePan} value={"Artesanal"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Artesanal</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.tipoDePan} value={"Oregano"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Oregano</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.tipoDePan} value={"Ajonjolí"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Ajonjolí</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.tipoDePan} value={"Napolitano"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Napolitano</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.tipoDePan} value={"Parmesano"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Parmesano</span>
            </label>
        </div>
        
        <div class="titulo-adicion">
            <h5>Salsas (obligatorio)</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.salsasH} value={"Salsa de maiz"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Salsa de maiz</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.salsasH} value={"Salsa rosada"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Salsa Rosada</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.salsasH} value={"Salsa showy ajo"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Salsa showy ajo</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="radio" bind:group={pedido.salsasH} value={"Sin salsa"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Sin salsa</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Acompañantes</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group="{pedido.acompañantes}" value={"huevo codorniz"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox check" data-espec="codorniz"></span>
                <span class="custom-radio-checkbox__text check" data-espec="codorniz">Huevo de codorniz +$3.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input"  type="checkbox" bind:group="{pedido.acompañantes}" value={"Papas a la francesa"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox check" data-espec="francesa"></span>
                <span class="custom-radio-checkbox__text check" data-espec="francesa">Papas a la francesa +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group="{pedido.acompañantes}" value={"Papas rusticas"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox check" data-espec="rusticas"></span>
                <span class="custom-radio-checkbox__text check" data-espec="rusticas">Papas rusticas +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group="{pedido.acompañantes}" value={"Papas criollas"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox check" data-espec="criollas"></span>
                <span class="custom-radio-checkbox__text check" data-espec="criollas">Papas criollas +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group="{pedido.acompañantes}" value={"Porción aros de cebolla"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox check" data-espec="aros-cebolla"></span>
                <span class="custom-radio-checkbox__text check" data-espec="aros-cebolla">Porción aros de cebolla x 7 und +$6.000</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Adiciones</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group={pedido.adiciones} value={"Cebolla grille"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Cebolla grille</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2000 bind:group={pedido.adiciones} value={"Piña"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Piña +$2.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2000 bind:group={pedido.adiciones} value={"Aguacate"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Aguacate +$2.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2000 bind:group={pedido.adiciones} value={"Tocineta"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Tocineta +$2.000</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Bebida</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Coca-Cola 250ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Coca-Cola 250ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Tamarindo 300ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Tamarindo 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Hit tropical 300ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit tropical 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Hit naranja piña 300ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit naranja piña 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Hit mora piña 300ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit mora 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input check" type="checkbox" data-precio=2500 bind:group={pedido.bebida} value={"Hit mango piña 300ml"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit mango 300ml +$2.500</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Preferencias</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group={pedido.preferencias} value={"Sin tomate"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Sin tomate</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group={pedido.preferencias} value={"Sin lechuga"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Sin lechuga</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group={pedido.preferencias} value={"Sin queso"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Sin queso</span>
            </label>
            <label class="custom-radio-checkbox">
                <input class="custom-radio-checkbox__input" type="checkbox" bind:group={pedido.preferencias} value={"Sin salsas"}>
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Sin salsas</span>
            </label>
        </div>

    </div>
</div>
<div class="botones">
    <div class="sumarRestar">
        <img on:click={handleClickMenos} src="../imagenes/menos.svg" alt="restar" width="25px">
        <p class="contador">{contador}</p>
        <img on:click={handleClickMas} src="../imagenes/agregar.svg" alt="sumar" width="25px">
    </div>
    <div class="precio">
        <p class="precioProducto">${precioP}</p>
        <button on:click={agregarHamburguesa} class="agregar">Agregar</button>
    </div>
</div>

<style>
    .precio{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .precioProducto{
        font-weight: 600;
        font-size: 20px;
        margin-right: 10px;
    }
    .imagen {
            background-image: url(../imagenes/hamburguesa-detalles.jpg);
            width: 100vw;
            height: 150px;
            background-position: center top;
            background-attachment: fixed;
        }
        .descripcion {
            padding: 5px;
        }
        .contenedorAdiciones {
            border-radius: 0px 20px 20px 0px;
            width: 100%;
        }
        .botones {
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: sticky;
            bottom: 50px;
            background: white;
            padding: 8px;
            -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
        }
        button {
            border-radius: 25px;
            border: none;
        }
        .agregar {
            padding: 10px 25px 10px 25px;
            background: #F84C02;
            color: white;
            font-size: 15px;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 0px;
        }
        .contador {
            font-weight: 600;
            font-size: 20px;
            margin-left: 5px;
            margin-right: 5px;
            width: 30px;
            text-align: center;      
        }
        .sumarRestar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .adiciones {
            display: flex;
            flex-direction: column;
        }
        label {
            margin-bottom: 10px;
        }
        .custom-radio-checkbox {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }
        .titulo-adicion {
            height: 35px;
            display: flex;
            align-items: center;
            background: #eee;
            padding-left: 10px;
            margin-bottom: 5px;
        }
        .opciones {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
        }
        /* Modificador para dar la imagen de checkbox */
        .custom-radio-checkbox__show--checkbox {
            background-image: url(../imagenes/checkbox-vacio.svg);
            background-size: cover;
        }

        /* Oculta input original */
        .custom-radio-checkbox > .custom-radio-checkbox__input {
            display: none;
        }

        /* Radio personalizado usando <span> */
        .custom-radio-checkbox > .custom-radio-checkbox__show {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-right: .5rem;
            background-size: cover;
        }

        /* Cambia el checkbox personalizado cuando es pulsado */
        .custom-radio-checkbox > .custom-radio-checkbox__input:checked + .custom-radio-checkbox__show--checkbox {
            background-image: url(../imagenes/checkbox-selected.svg);
            background-size: cover;
        }
</style>