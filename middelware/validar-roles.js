const {response} = require('express')

const esAdminRole = (req, res = response , next) =>{
if(!req.usuario){

    return res.status(500).json({
        msg: 'se quiere verificar el role sin el token primero'
    })
}
const {rol, nombre} =req.usuario

if(rol !== 'Admin_rol'){
    return res.status(401).json({
        msg: 'No eres el admin'
        
    })
}
    next();


}
const tieneRole = (...roles) => {
return (req, res= response , next)=>{
    if(!req.usuario){

        return res.status(500).json({
            msg: 'se quiere verificar el role sin el token primero'
        })
    }

    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg:'se necesitan roles especificos'
        })
    }

next();
}
}

module.exports= {
    esAdminRole,
    tieneRole
}