require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
 } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB){
        //Cargar Tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        //Imprimir Menu
        opt = await inquirerMenu();
        
        switch(opt){
            case '1':
                //Crear Tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                //Listar Tareas
                tareas.listadoCompleto();
            break;
            case '3':
                //Listar Tareas Completadas
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                //Listar Tareas Completadas
                tareas.listarPendientesCompletadas( false );
            break;
            case '5':
                //Completado||Pendiente
                const ids = await mostrarListadoChecklist( tareas.ListadoArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                //Borrar
                const id= await listadoTareasBorrar( tareas.ListadoArr );
                if( id !== '0' ){
                    //Pregunta si desea borrar 
                    const ok = await confirmar('¿Esta seguro?');
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea Borrada');
                    }
                }
            break;
        }

        guardarDB( tareas.ListadoArr );

        await pausa();

    } while( opt !== '0' )

    //pausa();
}


main();

