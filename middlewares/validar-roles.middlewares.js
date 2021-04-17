const { request, response } = require("express");

const adminRole = (req = request, res = response, next) => {
    // Esta funcion recibe el req del middleware anterion que trae la indormacion del usuario en el request
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Validar token primero para poder verificar el role de usuario'
        });
    }

    const { rol, name } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name}, no es administrador - No puede realizar esta acción`
        });
    }


    next()
}


const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Validar token primero para poder verificar el role de usuario'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere una de estos roles: ${roles}`
            });
        }


        next()

    }

}


module.exports = {
    adminRole,
    tieneRole
}