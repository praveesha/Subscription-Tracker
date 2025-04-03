import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";

import { getUsers, getUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.post('/', (req, res)=> res.send({title: "CREATE a new user"}));
userRouter.put('/:id', (req, res)=> res.send({title: "UPDATE user"}));
userRouter.get('/"id', (req, res)=> res.send({title: "DELETE user"}));

export default userRouter;