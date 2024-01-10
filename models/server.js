const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../database/config.js");
const fileUpload= require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        
       //rutas

       this.paths= {
        auth: '/api/auth',
        usuarios:'/api/usuarios',
        categorias: '/api/categorias',
        productos: '/api/productos',
        uploads: '/api/uploads'


       }
      

        
        //conectar a la base de datos
         this.conectarDB();
    
              //middlewares
           this.middlewares();
           
              //Rutas de mi aplicacion

        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
//directorio de middelwaree
   this.app.use(express.static('public'));


   this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


   //el cors
   this.app.use(cors())

   //parseo y lectura del body
   this.app.use(express.json());



    }

    routes(){
       
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        
this.app.listen(this.port,()=>{
    console.log('Servidor corriendo en puerto',this.port)
})
    }
}


module.exports = Server;