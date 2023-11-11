const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
    
              //middlewares
           this.middlewares();
           
              //Rutas de mi aplicacion

        this.routes();
    }

    middlewares(){
//directorio de middelwaree
   this.app.use(express.static('public'));

   //el cors
   this.app.use(cors())

   //parseo y lectura del body
   this.app.use(express.json());

    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        
this.app.listen(this.port,()=>{
    console.log('Servidor corriendo en puerto',this.port)
})
    }
}


module.exports = Server;