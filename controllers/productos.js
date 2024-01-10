const { response } = require('express');

const {Producto} = require('../models/index')











//Esto es para obtener un producto por la id

const obtenerProductoID = async(req, res = response) =>{


  const {id} = req.params;

  const producto = await Producto.findById(id).populate('usuario', 'nombre');

  console.log(categoria)

  res.json(producto)
}

//Esta funcion es para obtener todas los productos

const obtenerProducto = async(req, res = response)=>{

    const{limite = 5 , desde = 0}= req.query;

  
    const query = { estado: true};

    const [total, productos] = await Promise.all([
     Producto.countDocuments(query),
     Producto.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite))

    ]);

    res.json({
      total,
      productos
    })
}

// creo un producto
const crearProducto = async (req, res = response) => {

  try {

    const {estado, usuario , ...body} = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    

    if (productoDB) {
      return res.status(400).json({
        msg: `el prducto ${productoDB.nombre}, ya existe`
      });
    }

    // generar la data a guardar
    const data = {
        ...body,
      nombre:body.nombre.toUpperCase(),
      usuario: req.usuario._id,
      
    }

    const producto = new Producto(data);
    // guardar en DB
    await producto.save();

    res.status(201).json(producto);

  } catch (error) {

    console.log(error);

    return res.json({
      msg: "Hable con el Administrador"
    });

  }

}


//actualizar las categorias

const actualizarProducto= async( req, res = response)=>{

const {id}= req.params;
 const {estado, usuario,...data} = req.body

if(data.nombre){
    data.nombre = data.nombre.toUpperCase();
}
 
 data.usuario = req.usuario._id;

 const producto = await Producto.findByIdAndUpdate(id, data,{new: true});


 res.json(producto)

}

//deletear una categoria

const borrarProducto = async(req,res= response)=>{

  const {id}= req.params;

  const productoBorrada = await Producto.findByIdAndUpdate(id,{estado: false},{new: true});

  res.json(productoBorrada);
}

module.exports = {
    crearProducto,
  obtenerProducto,
  obtenerProductoID,
  actualizarProducto,
  borrarProducto

}