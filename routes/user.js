const { Router } = require("express");
const { usuariosGet, usuariosPost,usuariosDelete,usuariosPath,usuariosPut } = require("../controllers/user");

const router = Router();
//estas son las rutas, el usuarioget de la importacion del controlador donde esta la logica

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/",usuariosDelete );

router.patch("/",usuariosPath);

module.exports = router;
