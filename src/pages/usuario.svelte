<script>
    import { NombreCliente, Identificacion, TelefonoU, DireccionU } from '../store.js';

    let iden;
    let Nom;
    let tel;
    let dir;

    let nomNuevo;
    let idenNuevo;
    let telNuevo;
    let dirNuevo;

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

    function actualizarnom() {
        NombreCliente.set(nomNuevo);
    }
    function actualizariden() {
        Identificacion.set(idenNuevo);
    }
    function actualizartel() {
        TelefonoU.set(telNuevo);
    }
    function actualizardir() {
        DireccionU.set(dirNuevo);
    }

</script>

<div class="container">
<div class="user">
    <i class="far fa-user-circle"></i>
</div>
<div class="info-user">
    <div class="flex">
        <h4>Nombre Usuario: </h4><p>{Nom}</p>
    </div>
    <div class="flex">
        <h4>Identificación: </h4><p>{iden}</p>
    </div>
    <div class="flex">
        <h4>Telefono: </h4><p>{tel}</p>
    </div>
    <div class="flex">
        <h4>Dirección: </h4><p>{dir}</p>
    </div>
</div>
<div class="user-actualizacion">
    <label>Usuario</label>
    <div class="user-inputs">
        <input type="text" placeholder="{Nom}" bind:value={nomNuevo}>
        <button on:click={actualizarnom}><i class="fas fa-pen"></i>Actualizar</button>
    </div>
    <label>Identificación</label>
    <div class="user-inputs">
        <input type="number" placeholder="{iden}" bind:value={idenNuevo}>
        <button on:click={actualizariden}><i class="fas fa-pen"></i>Actualizar</button>
    </div>
    <label>Número celular</label>
    <div class="user-inputs">
        <input type="number" placeholder="{tel}" bind:value={telNuevo}>
        <button on:click={actualizartel}><i class="fas fa-pen"></i>Actualizar</button>
    </div>
    <label>Dirección</label>
    <div class="user-inputs">
        <textarea cols="22" rows="4" placeholder="{dir}" bind:value={dirNuevo}></textarea>
        <button on:click={actualizardir} class="boton-area"><i class="fas fa-pen"></i>Actualizar</button>
    </div>
</div>
</div>

<style>
.container {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user {
    margin: 20px;
}
.user i {
    font-size: 90px;
}
.info-user {
    display: flex;
    flex-direction: column;
}
.flex {
    display: flex;
}
.flex h4, .user-inputs input{
    margin-right: 5px;
}
.user-actualizacion {
    display: flex;
    flex-direction: column;
    margin: 10px;
}
.user-inputs {
    display: flex;
    justify-content: space-between;
}
.boton-area {
    height: 35px;
}
.user-inputs button {
    color: white;
    background-color: #F84C02;
    outline: none;
    border-radius: 5px;
}
</style>