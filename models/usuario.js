const {Schema , model} = require('mongoose')

const UsuarioSchema = Schema ({
nombre:{
type: String,
required:[true, ' El nombre es obligatorio'],
unique: true
},
correo:{
    type:String,
    unique: true ,
    require:[true, ' El correo es obligatorio']
},
password:{
    type:String,
   
    require:[true, ' El contraseña es obligatorio']
},

img:{
    type:String,
   
    
},

rol:{
    type:String,  
    required: true,

    enum:[ 'Admin_rol', 'User_Rol', 'VENTAS_ROL']
},

estado:{
    type:Boolean,
    default: true,
},

google:{
    type:Boolean,
    default:false
}


})

UsuarioSchema.methods.toJSON= function(){
    const {__v, password, _id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);