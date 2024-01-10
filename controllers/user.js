const { response } = require("express");
const Usuario = require("../models/usuario");


const usuariosGet = async (req, res = response) => {
  

const{limite = 5 , desde = 0}= req.query;

const usuario = await Usuario.find({estado : true})
.skip(Number(desde))
.limit(Number(limite))
const total = await Usuario.countDocuments({estado : true});

  res.json({
    msg: "esta weqa es un get del controlador",
    usuario,
    total
  });
};

const usuariosPost = async (req, res = response) => {
 

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

 

  await usuario.save();

  res.json({
   
    usuario
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;

const {_id, password, google ,cprreo,...resto} = req.body;
// validar en la base de datos


const usuario = await Usuario.findByIdAndUpdate(id, resto)



  res.json({
    msg: "esta weqa es un PUT del controlador",
    usuario
  });
};
const usuariosDelete = async(req, res = response) => {

  const {id} = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
const usuarioAutenticado = req.usuario;
  res.json({
    usuario,
    usuarioAutenticado
  });
};

const usuariosPath = (req, res = response) => {
  res.json({
    msg: "esta weqa es un path del controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPath,
};
