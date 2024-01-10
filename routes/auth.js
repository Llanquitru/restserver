const { Router } = require("express");
const {check} = require('express-validator');

const {validarCampos}= require('../middelware/validar-campos')

const { login,googleSingIn } = require("../controllers/auth");

const router = Router();

router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
   check('password', 'la contraseña es obligatiora').not().isEmpty(),
    validarCampos
], login)

router.post('/google',[
    check('id_token', 'token de google es necesario').not().isEmpty(),
 
    validarCampos
], googleSingIn)




module.exports= router;