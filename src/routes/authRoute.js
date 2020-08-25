const { Router } = require("express");
const {
  signupController,
  signinController,
  signoutController
} = require("../controllers/authController");
const { signinAuth } = require("../middlewares/authMiddleware");
const { jwtProtect } = require("../middlewares/jwtAuthMiddleware");


const authRouter = Router();
authRouter.post("/signup", signupController);
authRouter.post("/signin", signinAuth, signinController);
/**
 * Added Token checking before login 
 * To check whether user is actually login.
 */
authRouter.post("/signout", jwtProtect, signoutController);

module.exports = authRouter;
