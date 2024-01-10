
const Role = require('../models/role')
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

const esRolvalido = async(rol='')=>{
    const exiteRol = await Role.findOne({rol});
    if(!exiteRol){
        throw new Error('El rol no esta en la db')
    }

}

const emailExiste = async(correo = '')=>{

    const exiteEmail= await Usuario.findOne({correo});
    if(exiteEmail){
        throw new Error('Correo no valido')
    }
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error("El correo ya esta")
    }
}

const existeCategoriaId = async(id)=>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error("La categoeria ya esta")
    }
}


const existeProductoId = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error("ese producto ya exixste")
    }
}

//validar colecciones

const coleccionesPermitidas=(coleccion='',colecciones =[]) =>{


    const  incluida = colecciones.includes(coleccion);
     if(!incluida){
        throw new Error('ta mala')
     }

     return true;
}

module.exports={
    esRolvalido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaId,
    existeProductoId,
    coleccionesPermitidas
    
}