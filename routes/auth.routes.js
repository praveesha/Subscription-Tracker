import { Router } from "express";

import { signUp } from "../controller/auth.controller.js";
import { signIn } from "../controller/auth.controller.js";
import { signOut } from "../controller/auth.controller.js";

const authRouter = Router();

//The response should can't be directly sent and has to be incorporated with res.send(). And what's sent from the server is generally a JSON object.
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;