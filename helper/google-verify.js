const {OAuth2Client} = require('google-auth-library');


const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);


async function googleVerify(token ='') {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTE_ID, 
  });
  const {name:nombre
    ,picture:img
    ,email:correo} = ticket.getPayload();
  
  return{
    nombre,
    img, 
    correo
 
  }


}

module.exports={
    googleVerify
}