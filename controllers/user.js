const { response } = require("express");

const usuariosGet = (req, res = response) => {

    const query = req.query;
  res.json({
    msg: "esta weqa es un get del controlador",
    query
  });
};


const usuariosPost = (req, res = response) => {

    const body = req.body;
    res.json({
      msg: "esta weqa es un post del controlador",
      body
    });
  };

  const usuariosPut = (req, res = response) => {

    const id = req.params.id;
    res.json({
      msg: "esta weqa es un PUT del controlador",
      id
    });
  };
  const usuariosDelete = (req, res = response) => {
    res.json({
      msg: "esta weqa es un Deleted del controlador",
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
  usuariosPath
};
