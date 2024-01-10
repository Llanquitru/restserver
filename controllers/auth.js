const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helper/generar-jwt");
const { googleVerify } = require("../helper/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //veryfica si el email existe

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario no es valido, no esta en la base de datos",
      });
    }
    //si el usuario esta
    if (usuario.estado === false) {
      return res.status(400).json({
        msg: "El usuario no existe , estado = false",
      });
    }

    // verificar la contraseña

    //generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { correo, img, nombre } = await googleVerify(id_token);

    //verificar si el correo ya existe

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //tengo que crearlo
      const data = {
        nombre,
        correo,
        password: "",
        img,
        rol: "User_Rol",
        google: true,
      };
      

      usuario = new Usuario(data);

      console.log(usuario)
      await usuario.save();
    }

    //si el usuario en la db

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "hable con el admin , cuenta bloqueada",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: " el token no se pudo verificar",
      ok: "false",
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
