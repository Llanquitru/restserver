const { Router } = require("express");
const { usuariosGet, usuariosPost,usuariosDelete,usuariosPath,usuariosPut } = require("../controllers/user");
const {esRolvalido,emailExiste,existeUsuarioPorId } = require('../helper/db-validators')
const {check} = require('express-validator');
const {validarCampos} = require('../middelware/validar-campos');
const { validarJWT } = require("../middelware/validar-jwt");
const {esAdminRole,tieneRole}= require('../middelware/validar-roles');

const router = Router();
//estas son las rutas, el usuarioget de la importacion del controlador donde esta la logica

router.get("/", usuariosGet);

router.put("/:id",[
    check('id','No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
validarCampos
], usuariosPut);

router.post("/",[
    check('nombre', 'Esto no es un nombre').not().notEmpty(),
    check('password', 'No es una contraseña valida').isLength({min:6}),
    check('correo','No es un correo').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolvalido),
    validarCampos
], usuariosPost);

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    tieneRole('Admin_rol','VENTAS_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );

router.patch("/",usuariosPath);

module.exports = router;
