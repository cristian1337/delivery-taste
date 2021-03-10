<script>

    /*import {tipoPan, salsas, acompañantes, adiciones, bebida, preferencias, unidades} from '../store.js';*/
    import { onMount } from 'svelte';
    import { NombreCliente, Identificacion, ContadorCarrito } from '../store.js';
    import { db } from '../firebase';
    import { navigate } from "svelte-routing";
    export let id;

    let pedidos = [];
    let Nombre;
    let iden;
    let Cont;
    var contador = 1;
    var indice;
    var precioP;
    var precioAux;
    var cantidad = 0;

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
        imagen: "../imagenes/banner-clasica.jpg",
        descripcion: "150 gramos de jugosa carne artesanal, lechuga y tomate frescos, queso mozarella fundido, tocineta ahumada y acompañada con salsas de la casa."
    },
    {
        id: ':2',
        hamburguesa: "Hamburguesa Doble",
        peso: "300g",
        precio: 14000,
        imagen: "../imagenes/banner-doble.jpg",
        descripcion: "2 porciones de 150 gramos de jugosa carne artesanal con 2 capas queso mozzarella fundido, tomate y lechuga frescos, tocineta ahumada y  salsas de la casa"
    },
    {
        id: ':3',
        hamburguesa: "Hamburguesa Extra queso",
        peso: "150g",
        precio: 13000,
        imagen: "../imagenes/banner-extraqueso.jpg",
        descripcion: "150 gramos de jugosa carne artesanal acompañadas de capas de queso mozzarella y queso parrilla derretidos en tu hamburguesa, tocineta ahumada y acompañada de salsas de la casa."
    },
    {
        id: ':4',
        hamburguesa: "Hamburguesa Colonial",
        peso: "150g",
        precio: 13000,
        imagen: "../imagenes/banner-colonial.jpg",
        descripcion: "Diferente pero nuestra, elaborada con carne de la casa y acompañada de crocantes aros de cebolla apanados, lechuga y tomate frescos, con una capa de suave aguacate picado, tocineta ahumada y salsas de la casa. "
    },
    {
        id: ':5',
        hamburguesa: "Hamburguesa Field burger",
        peso: "200g",
        precio: 15000,
        imagen: "../imagenes/banner-field.jpg",
        descripcion: "Con una mezcla perfecta de sabores, nuestros 200 gr de carne de Angus acompañada de salsa de la casa, tocineta ahumada y queso fundido hacen de nuestra field burguer uno de nuestros productos Premium. "
    }];

    const agregarHamburguesa = async () => {
        if (pedido.tipoDePan == ""){
            alertify.notify('El tipo de pan es obligatorio', 'error', 5, function(){  console.log('dismissed'); });
        }else {
            alertify.notify('Producto agregado con exito', 'success', 2, function(){  console.log('dismissed'); });
            await db.collection('pedidos').doc().set({
                ...pedido, createdAt: Date.now()
            });
            console.log(pedido);
            navigate("/hamburguesas", { replace: false });
        }
    };

    let pedido = {
        hamburguesa: "",
        tipoDePan: "",
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

    onMount( function() {

        const imagen = document.getElementById('imagen');

        imagen.style.backgroundImage = `url(${Listahamburguesas[indice].imagen})`;

        const checks = document.getElementById('check');
        let check = false;
        let contadorCheck = 0;
        const check2 = document.getElementById('check2');
        let contadorCheck2 = 0;
        let checks2 = false;
        const check3 = document.getElementById('check3');
        let contadorCheck3 = 0;
        let checks3 = false;
        const check4 = document.getElementById('check4');
        let contadorCheck4 = 0;
        let checks4 = false;
        const check5 = document.getElementById('check5');
        let contadorCheck5 = 0;
        let checks5 = false;
        const check6 = document.getElementById('check6');
        let contadorCheck6 = 0;
        let checks6 = false;
        const check7 = document.getElementById('check7');
        let contadorCheck7 = 0;
        let checks7 = false;
        const check8 = document.getElementById('check8');
        let contadorCheck8 = 0;
        let checks8 = false;
        const check9 = document.getElementById('check9');
        let contadorCheck9 = 0;
        let checks9 = false;
        const check10 = document.getElementById('check10');
        let contadorCheck10 = 0;
        let checks10 = false;
        const check11 = document.getElementById('check11');
        let contadorCheck11 = 0;
        let checks11 = false;
        const check12 = document.getElementById('check12');
        let contadorCheck12 = 0;
        let checks12 = false;
        const check13 = document.getElementById('check13');
        let contadorCheck13 = 0;
        let checks13 = false;
        const check14 = document.getElementById('check14');
        let contadorCheck14 = 0;
        let checks14 = false;
        const check15 = document.getElementById('check15');
        let contadorCheck15 = 0;
        let checks15 = false;
            
        checks.addEventListener('click', (e)=> {
            contadorCheck += 1;

            if((contadorCheck % 2) == 0){
                check = true;
            }else {
                check = false;
            }

            if (e.target.dataset.espec == "codorniz" && check == false){
                precioP = 3000 + precioP;
                pedido.precio = 3000 + pedido.precio;
                check = true;
                pedido.acompañantes = "huevos codorniz"
            }else if(e.target.dataset.espec == "codorniz" && check == true){
                precioP = precioP - 3000;
                pedido.precio = pedido.precio - 3000;
                pedido.acompañantes = "";
                   check = false;
            }

        });
        
        check2.addEventListener('click', (e)=> {
            contadorCheck2 += 1;

                if((contadorCheck2 % 2) == 0){
                    checks2 = true;
                }else {
                    checks2 = false;
                }

                if (e.target.dataset.espec2 == "francesa" && checks2 == false){
                    precioP = 5000 + precioP;
                    pedido.precio = 5000 + pedido.precio;
                    checks2 = true;
                    pedido.acompañantes = "Papas francesa"
                }else if(e.target.dataset.espec2 == "francesa" && checks2 == true){
                    precioP = precioP - 5000;
                    pedido.precio = pedido.precio - 5000;
                    pedido.acompañantes = "";
                    checks2 = false;
                }
        });
        
        check3.addEventListener('click', (e)=> {
            contadorCheck3 += 1;

                if((contadorCheck3 % 2) == 0){
                    checks3 = true;
                }else {
                    checks3 = false;
                }

                if (e.target.dataset.espec3 == "rusticas" && checks3 == false){
                    precioP = 5000 + precioP;
                    pedido.precio = 5000 + pedido.precio;
                    checks3 = true;
                    pedido.acompañantes = "Papas rusticas"
                }else if(e.target.dataset.espec3 == "rusticas" && checks3 == true){
                    precioP = precioP - 5000;
                    pedido.precio = pedido.precio - 5000;
                    pedido.acompañantes = "";
                    checks3 = false;
                }
        });
        
        check4.addEventListener('click', (e)=> {
            contadorCheck4 += 1;

                if((contadorCheck4 % 2) == 0){
                    checks4 = true;
                }else {
                    checks4 = false;
                }

                if (e.target.dataset.espec4 == "criollas" && checks4 == false){
                    precioP = 5000 + precioP;
                    pedido.precio = 5000 + pedido.precio;
                    checks4 = true;
                    pedido.acompañantes = "Papas criollas"
                }else if(e.target.dataset.espec4 == "criollas" && checks4 == true){
                    precioP = precioP - 5000;
                    pedido.precio = pedido.precio - 5000;
                    pedido.acompañantes = "";
                    checks4 = false;
                }
        });
        
        check5.addEventListener('click', (e)=> {
            contadorCheck5 += 1;

                if((contadorCheck5 % 2) == 0){
                    checks5 = true;
                }else {
                    checks5 = false;
                }

                if (e.target.dataset.espec5 == "aros-cebolla" && checks5 == false){
                    precioP = 6000 + precioP;
                    pedido.precio = 6000 + pedido.precio;
                    checks5 = true;
                    pedido.acompañantes = "Aros cebolla"
                }else if(e.target.dataset.espec5 == "aros-cebolla" && checks5 == true){
                    precioP = precioP - 6000;
                    pedido.precio = pedido.precio - 6000;
                    pedido.acompañantes = "";
                    checks5 = false;
                }
        });
        
        check6.addEventListener('click', (e)=> {
            contadorCheck6 += 1;

                if((contadorCheck6 % 2) == 0){
                    checks6 = true;
                }else {
                    checks6 = false;
                }

                if (e.target.dataset.espec6 == "cebolla-grille" && checks6 == false){
                    precioP = 0 + precioP;
                    pedido.precio = 0 + pedido.precio;
                    checks6 = true;
                    pedido.adiciones = "Cebolla grille"
                }else if(e.target.dataset.espec6 == "cebolla-grille" && checks6 == true){
                    precioP = precioP - 0;
                    pedido.precio = pedido.precio - 0;
                    pedido.adiciones = "";
                    checks6 = false;
                }
        });
        
        check7.addEventListener('click', (e)=> {
            contadorCheck7 += 1;

                if((contadorCheck7 % 2) == 0){
                    checks7 = true;
                }else {
                    checks7 = false;
                }

                if (e.target.dataset.espec7 == "piña" && checks7 == false){
                    precioP = 2000 + precioP;
                    pedido.precio = 2000 + pedido.precio;
                    checks7 = true;
                    pedido.adiciones = "Piña"
                }else if(e.target.dataset.espec7 == "piña" && checks7 == true){
                    precioP = precioP - 2000;
                    pedido.precio = pedido.precio - 2000;
                    pedido.adiciones = "";
                    checks7 = false;
                }
        });
        
        check8.addEventListener('click', (e)=> {
            contadorCheck8 += 1;

                if((contadorCheck8 % 2) == 0){
                    checks8 = true;
                }else {
                    checks8 = false;
                }

                if (e.target.dataset.espec8 == "aguacate" && checks8 == false){
                    precioP = 2000 + precioP;
                    pedido.precio = 2000 + pedido.precio;
                    checks8 = true;
                    pedido.adiciones = "Aguacate"
                }else if(e.target.dataset.espec8 == "aguacate" && checks8 == true){
                    precioP = precioP - 2000;
                    pedido.precio = pedido.precio - 2000;
                    pedido.adiciones = "";
                    checks8 = false;
                }
        });
        
        check9.addEventListener('click', (e)=> {
            contadorCheck9 += 1;

                if((contadorCheck9 % 2) == 0){
                    checks9 = true;
                }else {
                    checks9 = false;
                }

                if (e.target.dataset.espec9 == "tocineta" && checks9 == false){
                    precioP = 2000 + precioP;
                    pedido.precio = 2000 + pedido.precio;
                    checks9 = true;
                    pedido.adiciones = "Tocineta"
                }else if(e.target.dataset.espec9 == "tocineta" && checks9 == true){
                    precioP = precioP - 2000;
                    pedido.precio = pedido.precio - 2000;
                    pedido.adiciones = "";
                    checks9 = false;
                }
        });
        
        check10.addEventListener('click', (e)=> {
            contadorCheck10 += 1;

                if((contadorCheck10 % 2) == 0){
                    checks10 = true;
                }else {
                    checks10 = false;
                }

                if (e.target.dataset.espec10 == "cocacola" && checks10 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks10 = true;
                    pedido.bebida = "Coca-Cola"
                }else if(e.target.dataset.espec10 == "cocacola" && checks10 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks10 = false;
                }
        });
        
        check11.addEventListener('click', (e)=> {
            contadorCheck11 += 1;

                if((contadorCheck11 % 2) == 0){
                    checks11 = true;
                }else {
                    checks11 = false;
                }

                if (e.target.dataset.espec11 == "tamarindo" && checks11 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks11 = true;
                    pedido.bebida = "Tamarindo"
                }else if(e.target.dataset.espec11 == "tamarindo" && checks11 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks11 = false;
                }
        });
        
        check12.addEventListener('click', (e)=> {
            contadorCheck12 += 1;

                if((contadorCheck12 % 2) == 0){
                    checks12 = true;
                }else {
                    checks12 = false;
                }

                if (e.target.dataset.espec12 == "hit-tropical" && checks12 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks12 = true;
                    pedido.bebida = "Hit tropical"
                }else if(e.target.dataset.espec12 == "hit-tropical" && checks12 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks12 = false;
                }
        });
        
        check13.addEventListener('click', (e)=> {
            contadorCheck13 += 1;

                if((contadorCheck13 % 2) == 0){
                    checks13 = true;
                }else {
                    checks13 = false;
                }

                if (e.target.dataset.espec13 == "hit-naranja" && checks13 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks13 = true;
                    pedido.bebida = "Hit naranja"
                }else if(e.target.dataset.espec13 == "hit-naranja" && checks13 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks13 = false;
                }
        });
        
        check14.addEventListener('click', (e)=> {
            contadorCheck14 += 1;

                if((contadorCheck14 % 2) == 0){
                    checks14 = true;
                }else {
                    checks14 = false;
                }

                if (e.target.dataset.espec14 == "hit-mora" && checks14 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks14 = true;
                    pedido.bebida = "Hit mora"
                }else if(e.target.dataset.espec14 == "hit-mora" && checks14 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks14 = false;
                }
        });
        
        check15.addEventListener('click', (e)=> {
            contadorCheck15 += 1;

                if((contadorCheck15 % 2) == 0){
                    checks15 = true;
                }else {
                    checks15 = false;
                }

                if (e.target.dataset.espec15 == "hit-mango" && checks15 == false){
                    precioP = 2500 + precioP;
                    pedido.precio = 2500 + pedido.precio;
                    checks15 = true;
                    pedido.bebida = "Hit mango"
                }else if(e.target.dataset.espec15 == "hit-mango" && checks15 == true){
                    precioP = precioP - 2500;
                    pedido.precio = pedido.precio - 2500;
                    pedido.bebida = "";
                    checks15 = false;
                }
        });
    });

    
</script>
<div class="imagen" id="imagen">
    
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
            <h5>Salsas</h5>
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
                <input id="check" class="custom-radio-checkbox__input" type="checkbox" data-espec="codorniz">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Huevo de codorniz +$3.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check2" class="custom-radio-checkbox__input" data-espec2="francesa" type="checkbox">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Papas a la francesa +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check3" class="custom-radio-checkbox__input" type="checkbox" data-espec3="rusticas">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Papas rusticas +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check4" class="custom-radio-checkbox__input" type="checkbox" data-espec4="criollas">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Papas criollas +$5.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check5" class="custom-radio-checkbox__input" type="checkbox" data-espec5="aros-cebolla">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Porción aros de cebolla x 7 und +$6.000</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Adiciones</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input id="check6" class="custom-radio-checkbox__input" type="checkbox" data-espec6="cebolla-grille">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Cebolla grille</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check7" class="custom-radio-checkbox__input" type="checkbox" data-espec7="piña">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Piña +$2.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check8" class="custom-radio-checkbox__input" type="checkbox" data-espec8="aguacate">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Aguacate +$2.000</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check9" class="custom-radio-checkbox__input" type="checkbox" data-espec9="tocineta">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Tocineta +$2.000</span>
            </label>
        </div>

        <div class="titulo-adicion">
            <h5>Bebida</h5>
        </div>
        <div class="opciones">
            <label class="custom-radio-checkbox">
                <input id="check10" class="custom-radio-checkbox__input check" type="checkbox" data-espec10="cocacola">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Coca-Cola 250ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check11" class="custom-radio-checkbox__input check" type="checkbox" data-espec11="tamarindo">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Tamarindo 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check12" class="custom-radio-checkbox__input check" type="checkbox" data-espec12="hit-tropical">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit tropical 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check13" class="custom-radio-checkbox__input check" type="checkbox" data-espec13="hit-naranja">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit naranja piña 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check14" class="custom-radio-checkbox__input check" type="checkbox" data-espec14="hit-mora">
                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                <span class="custom-radio-checkbox__text">Hit mora 300ml +$2.500</span>
            </label>
            <label class="custom-radio-checkbox">
                <input id="check15" class="custom-radio-checkbox__input check" type="checkbox" data-espec15="hit-mango">
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