import { Router } from "express";
import * as toDoController from '../controller/todoController.js'
import verifyToken from "../middlewares/verifyToken.js";
// import verifyToken from '../middlewares/verifyToken.js';

const routerToDO = Router();
routerToDO.post("/signup", toDoController.signUp);
routerToDO.post("/login", toDoController.login);
routerToDO.get("/me",verifyToken, toDoController.getUser);
routerToDO.post("/logout", toDoController.logout);
// routerToDO.put("/update", toDoController.updateUser);
// routerToDO.delete("/delete",toDoController.deleteProfiel)
// routerToDO.get("/alluser",toDoController.getAlluser)

export default routerToDO;
