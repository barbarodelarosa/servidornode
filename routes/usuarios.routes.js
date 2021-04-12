 const { Router } = require('express');
 const api_usuarios = require('../controllers/usuarios.controllers');

 const router = Router();

 router.get('/', api_usuarios.usuariosGet);
 router.post('/', api_usuarios.usuariosPost);
 router.put('/:id', api_usuarios.usuariosPut);
 router.patch('/', api_usuarios.usuariosPatch);
 router.delete('/', api_usuarios.usuariosDelete);



 module.exports = router;