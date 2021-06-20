const fs = require('fs');

const archivo = './db/data.json';
    
const guardarDB = ( data ) =>{

    // convierte un objeto a su version json valida como un string
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () =>{
    
    if( !fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo,{ encoding:'utf-8' });
    //para convertirlo otra vez en json
    const data = JSON.parse( info );
    //console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}