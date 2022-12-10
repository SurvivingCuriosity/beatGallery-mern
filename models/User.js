const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        minLength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 6,
        select: false, //cuando hagamos un SELECT de un usuario, no se devolverá la contraseña (seguridad)
    },
    isProducer: {
        type: Boolean,
        default: false,
        required: true
    },
    isArtist: {
        type: Boolean,
        default: false,
        required: true
    },
    name: String,
    location: String,
    aboutme: String,
    twitter: {type: String, default:''},
    instagram: {type: String, default:''},
    spotify: {type: String, default:''},
    youtube: {type: String, default:''},
    beats: [{
        type: mongoose.Types.ObjectId,
        ref: 'Beat'
    }],
    savedBeats: [{
        type: mongoose.Types.ObjectId,
        ref: 'Beat'
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//MIDDLEWARE (acciones antes de guardar) no vale arrowfunction como segundo parametro
UserSchema.pre('save', async function (next) {
    //para evitar modificar la contraseña cuando no se ha modificado
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); //esta linea encripta la contraseña
    next();
})

//METODOS DEL MODELO
UserSchema.methods.matchPassword = async function (password) {
    //primer parametro: contraseña que usuario escribe
    //segundo parametro: contraseña en bbdd
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedJwtToken = function () {
    console.log('Getting signed token');
    //this se refiere al usuario para el que se va a obtener un token
    const signedToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
    return signedToken
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    //this hace referncia al modelo usuario
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    //10 minutos    
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken;
}

const User = mongoose.model('User', UserSchema)
module.exports = User;