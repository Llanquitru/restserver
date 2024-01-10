const { Router } = require("express");
const {check} = require('express-validator');

const {validarCampos}= require('../middelware/validar-campos');
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helper/db-validators");


const router = Router();


router.post('/', [], cargarArchivo);


router.get('/', (req, res)=>{


    res.send('un get')
});



router.get('/:id', (req, res)=>{


    res.send('un get')
});


router.put('/:coleccion/:id',[
    check('id','debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos' ])),
    validarCampos
],actualizarImagen);


module.exports= router;