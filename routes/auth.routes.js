const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');

const router = Router();


router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);



module.exports = router;