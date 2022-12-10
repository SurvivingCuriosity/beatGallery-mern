const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// @desc    Login user
exports.login = async (req, res, next) => {
  console.log('CONTROLLER: login');
  const { email, password } = req.body;
  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log('No existe ese user');
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Credenciales invalidas');
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Register user
exports.register = async (req, res, next) => {
  console.log('CONTROLLER: register');
  const { username, email, password, isProducer, isArtist } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      isProducer,
      isArtist
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot Password Initialization
exports.forgotpassword = async (req, res, next) => {
  console.log('CONTROLLER: forgotPassword');
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetpassword = async (req, res, next) => {
  console.log('CONTROLLER: resetPasword');
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * las rutas privadas tienen un middleware que comprueba que llega el token en la cabecera de la peticion,
 * lo decodifica y devuelve el id del usuario que esta haciendo la peticion
*/
exports.getUserPublicData = async (req, res, next) => {
  console.log('CONTROLLER: getUserPublicData');

  const username = req.params.username;
  console.log('El username: '+username);

  try {
    const userPublicData = await User.findOne({ username }).select('-_id -email');
    // console.log('la info:');
    // console.log(userPublicData);
    res.status(200).json({ success: true, userPublicData })
  } catch (err) {
    next(err);
  }
}

//datos que se muestran en el perfil privado del usuario loggeado
exports.getUserPrivateData = async (req, res, next) => {
  console.log('CONTROLLER: getUserPrivateData');
  const userId = req.body.userId;
  console.log('El id:' +userId);
  try {
    const  userPrivateData  = await User.findById(userId).populate("beats", {
      userId: 0,
      __v: 0
    });
    res.status(200).json({ success: true, userPrivateData })
  } catch (err) {
    next(err);
  }
}

//beats que aparecen en los perfiles públicos de los productores
exports.getUserPublicBeats = async (req, res, next) => {
  console.log('CONTROLLER: getUserPublicBeats');
  const username = req.params.username;
  const userId = req.body.userId;

  let existingUser;
  try {
    existingUser = await User.findOne({ userId });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
  }
  try {
    const data = await User.findOne({ username: username }).populate("beats", {
      _id: 0,
      userId: 0,
      __v: 0
    });
    res.status(200).json({ success: true, data })
  } catch (err) {
    next(err);
  }
}

//beats que aparecen en el perfil del productor, aparecen todos, independientemente de si son visibles o no
exports.getUserPrivateBeats = async (req, res, next) => {
  console.log('CONTROLLER: getUserPrivateBeats');
  const userId = req.body.userId;

  let existingUser;
  try {
    existingUser = await User.findOne({ userId });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
  }

  try {
    const data = await User.findOne({ userId }).populate("beats", {
      userId: 0,
      __v: 0
    });
    res.status(200).json({ success: true, data })
  } catch (err) {
    next(err);
  }
}

exports.buscarUsuario = async (req, res, next) => {
  console.log('CONTROLLER: buscarUsuario');
  const userText = req.params.text;

  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(userText);

  const resultado = await User.find({
    $or: [
      { username: { $regex: searchRgx, $options: "i" } },
      // { email: { $regex: searchRgx, $options: "i" } },
    ],
  })
    .limit(5)
    .catch(next);

  res.status(200).json({ success: true, data: resultado });
};

exports.editUser = async (req, res, next) => {
  console.log('EN CONTROLLER EDIT USER');
  const { _id } = req.body;

  try {
    // have to change this
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    console.log({ updatedUser })
    res.status(200).json({ success: true, updatedUser })
  } catch (error) {
    console.log("Error agya hy")
    res.status(500).json(error);
  }
}

//cuando se registra o logea de forma correcta se llama a esta funcion
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};