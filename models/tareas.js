const Tarea = require('./tarea');

class Tareas{
    _listado={};

    get ListadoArr(){
        const Listado=[];
        //Extrae cada una de las llaves del objeto
        Object.keys(this._listado).forEach(key=>{
            Listado.push( this._listado[key] );
        });
        return Listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){

        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id]=tarea
        });
    }

    crearTarea(desc=''){

        const tarea = new Tarea(desc);
        
        this._listado[tarea.id]=tarea;
    }

    listadoCompleto(){
        
        console.log();
        this.ListadoArr.forEach( (tarea, i) =>{
           const idx = `${i+1}`.green;
           const { desc, completadoEn} = tarea;
           const estado = ( completadoEn)? 'Completada'.green:'Pendiente'.red;
           console.log(`${idx}. ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas( completadas = true ){
        
        console.log();
        let contador = 0;
        this.ListadoArr.forEach( (tarea) =>{
           const { desc, completadoEn} = tarea;
           //const estado = ( completadoEn)? 'Completada'.green:'Pendiente'.red;
           
           if( completadas ){
               if(completadoEn){
                    contador ++;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
               }
            }
           else {
                if(! completadoEn ){
                    contador ++;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn}`);
                }   
           }
        })
    }

    toggleCompletadas( ids = []){

        ids.forEach( id=> {
            // como el objeto lo pasa por referencia cualquier modificacion en la constante modificara el objeto
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.ListadoArr.forEach( tarea =>{
            
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;                
            }
        });
    }
}

module.exports=Tareas