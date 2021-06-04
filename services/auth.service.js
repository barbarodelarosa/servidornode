const JWT = require("jsonwebtoken");
const User = require("../models/User.model");
const Usuario = require("../models/usuario.models");
const Token = require("../models/Token.models");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");


const bcrypt = require('bcryptjs');

// const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const signup = async(data) => {
    let user = await Usuario.findOne({ correo: data.correo });
    if (user) {
        throw new Error("Email already exist", 422);
    }
    user = new User(data);
    const token = JWT.sign({ id: user._id }, JWTSecret);
    await user.save();

    return (data = {
        userId: user._id,
        correo: user.correo,
        nombreusuario: user.nombreusuario,
        token: token,
    });
};

const requestPasswordReset = async(correo) => {
    const user = await Usuario.findOne({ correo });
    if (!user) throw new Error("Email does not exist");

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    sendEmail(
        user.correo,
        "Password Reset Request", {
            nombreusuario: user.nombreusuario,
            link: link,
        },
        "./template/requestResetPassword.handlebars"
    );
    return link;
};

const resetPassword = async(userId, token, contrasena) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }

    const hash = await bcrypt.hash(contrasena, Number(bcryptSalt));

    await Usuario.updateOne({ _id: userId }, { $set: { contrasena: hash } }, { new: true });

    const user = await Usuario.findById({ _id: userId });

    sendEmail(
        user.correo,
        "Password Reset Successfully", {
            nombreusuario: user.nombreusuario,
        },
        "./template/resetPassword.handlebars"
    );

    await passwordResetToken.deleteOne();

    return true;
};

module.exports = {
    signup,
    requestPasswordReset,
    resetPassword,
};