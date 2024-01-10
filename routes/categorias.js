const { Router } = require("express");
const {check} = require('express-validator');

const {validarCampos}= require('../middelware/validar-campos');
const { validarJWT } = require("../middelware/validar-jwt");
const { crearCategoria, obtenerCategoria, obtenerCategoriaID,actualizarCategoria, borrarCategoria } = require("../controllers/categorias");


const {existeCategoriaId}= require('../helper/db-validators');
const { esAdminRole } = require("../middelware/validar-roles");


const router = Router();


//Obtener todas las categorias - publico
router.get('/',[


], obtenerCategoria);


//Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'no es una id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
    
], obtenerCategoriaID);


//crear categoria -privado - cualquier pesona con token valido

router.post('/',[
    validarJWT,
  //check('nombre','el nombre es obligatorio a').not().isEmpty(),
    validarCampos
], crearCategoria);


//Actualizar la categoria -privado- token valido

router.put('/:id', [ 
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
],actualizarCategoria);


//Borrar una categoria - ADMIN

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'no es una id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], borrarCategoria);



module.exports= router;