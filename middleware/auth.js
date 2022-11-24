const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


async function protect(req, res, next) {
	console.log('El body en protect');
	console.log(req.body);
	console.log('Accediendo a ruta protegida ' + req.route.path);
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		console.log('----No token found. Cannot access private route');
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return next(new ErrorResponse("No user found with this id", 404));
		}

		req.body.userId = user._id;
		return next();
	} catch (err) {
		return next(new ErrorResponse("Not authorized to access this router", 401));
	}
}

module.exports = protect;