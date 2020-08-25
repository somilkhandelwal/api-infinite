const { Router } = require("express");
const authRouter = require("./authRoute");
const { jwtProtect } = require("../middlewares/jwtAuthMiddleware");
const states = require("./states");
const districts = require("./districts");

const accountRoutes = require("./account");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use('/states', jwtProtect, states);
apiRouter.use('/districts', jwtProtect, districts);

apiRouter.use('/account', jwtProtect, accountRoutes);


module.exports = apiRouter;
