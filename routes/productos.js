const { Router } = require("express");
const {check} = require('express-validator');

const {validarCampos}= require('../middelware/validar-campos')

const {crearProducto, obtenerProducto,obtenerProductoID,actualizarProducto,borrarProducto} = require('../controllers/productos');
const { validarJWT } = require("../middelware/validar-jwt");
const { existeProductoId,existeCategoriaId } = require("../helper/db-validators");
const { esAdminRole } = require("../middelware/validar-roles");



const router = Router();


router.get('/:id',[
    check('id',' no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProductoID)

router.get('/',obtenerProducto)


router.post('/',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('categoria', 'la categoria es obligatorio').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], crearProducto)

router.put('/:id',[
    validarJWT,
    //check('categoria', 'no es un id de mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],actualizarProducto)

router.delete('/',[
    validarJWT,
    esAdminRole,
    check('id', ' no es un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],borrarProducto)



module.exports= router;