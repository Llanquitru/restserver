const { response } = require("express");
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const Usuario= require('../models/usuario')
const Producto = require('../models/producto')

const cargarArchivo = async(req,res=response)=>{

   
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'no se encontro nigun archivo'});
      return;
    }


    
    if (!req.files.archivo) {
        res.status(400).json({msg:'no se encontro nigun archivo'});
        return;
      }

const {archivo} = req.files;

const nombreCortado = archivo.name.split('.');
const extension = nombreCortado[nombreCortado.length -1]


// validar la extencion

const extencionValidas=['png','jpg','jpeg','gif']

if(!extencionValidas.includes(extension)){
    res.status(400).json({
        msg: 'la extencion no es valida'
    })
}

  const nombreTemp = uuidv4()+'.'+extension;

    const uploadPath = path.join( __dirname , '../uploads/' + nombreTemp);
  
    archivo.mv(uploadPath, (err)=> {
      if (err) {
        return res.status(500).json(err);
      }
  
      res.json({masg:'El archivo se subio : ' + uploadPath});
    });
 
}


const actualizarImagen = async(req,res= response)=>{

  

  const {id, coleccion} = req.params;


let modelo;

switch(coleccion){
  case 'usuarios':
      modelo= await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:'no  existe el usuario'
        })
      }

  break;


  case 'productos':
    modelo= await Producto.findById(id);
    if(!modelo){
      return res.status(400).json({
        msg:'no el producto existe'
      })
    }

break;

  default:
    return res.status(500).json({msg:'Se me olvido validar esto'})
}

const nombre = await cargarArchivo(req.files, undefined ,coleccion);
modelo.img = nombre;

await modelo.save();
  res.json(modelo)

}

module.exports={
    cargarArchivo,
    actualizarImagen
}