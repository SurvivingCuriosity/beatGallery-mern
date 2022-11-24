const express = require('express');
const router = express.Router();
const protect = require("../middleware/auth");
//IMPORTO LOS CONTROLADORES
const {
    register,
    login,
    forgotpassword,
    resetpassword,
    getUserPublicData,
    getUserPublicBeats,
    getUserPrivateData,
    getUserPrivateBeats,
    buscarUsuario } = require('../controllers/user');

//AUTH ROUTES
router.route('/register').post(register)                                        //---api/user/register
router.route('/login').post(login)                                              //---api/user/login
router.route('/forgotPassword').post(forgotpassword)                            //---api/user/forgotPassword
router.route('/resetPassword/:resetToken').put(resetpassword)                   //---api/user/resetPassword/1283192nr12f1

router.route('/public/:username').get(protect, getUserPublicData);              //---api/user/public/FXY/
router.route('/public/:username/beats').get(protect, getUserPublicBeats);       //---api/user/public/FXY/beats
router.route('/private').get(protect, getUserPrivateData);                      //---api/user/private
router.route('/private/beats').get(protect, getUserPrivateBeats);               //---api/user/private/beats
router.route('/buscar/:text').get(protect, buscarUsuario);                      //---api/user/buscar/miTexto

module.exports = router;
