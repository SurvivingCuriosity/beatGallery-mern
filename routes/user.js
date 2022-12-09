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
    getUserPrivateData,
    getUserPrivateBeats,
    editUser,
    buscarUsuario } = require('../controllers/user');

//AUTH ROUTES
router.route('/register').post(register)                                        //---api/user/register
router.route('/login').post(login)                                              //---api/user/login
router.route('/forgotPassword').post(forgotpassword)                            //---api/user/forgotPassword
router.route('/resetPassword/:resetToken').put(resetpassword)                   //---api/user/resetPassword/1283192nr12f1

router.route('/private').get(protect, getUserPrivateData);                      //---api/user/private
router.route('/private/beats').get(protect, getUserPrivateBeats);               //---api/user/private/beats
router.route('/public/:username').get(getUserPublicData);                       //---api/user/public/FXY/
router.route('/buscar/:text').get(buscarUsuario);                               //---api/user/buscar/miTexto
router.route("/update").put(protect, editUser);                                 //---api/user/update
module.exports = router;
