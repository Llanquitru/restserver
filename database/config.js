const mongoose = require('mongoose');


const dbConnection = async() =>{

try{

await mongoose.connect(process.env.MongoConnection,{




})

}catch(error){

console.log(error)
    throw new Error('error a la hora de inicar a la base de datos');
}

console.log('Conectado a la base de datos');

}


module.exports ={
 dbConnection

}