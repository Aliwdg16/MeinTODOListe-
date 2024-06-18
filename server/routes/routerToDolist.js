import { Router } from "express";
import * as Todolist from "../controller/todolist.js";
import verifyToken from "../middlewares/verifyToken.js";

const listRouter = Router();

listRouter
  .route("/")
  // .get(verifyToken,Todolist.getAllTasksforlogged)
  .get(Todolist.getAllTasks)
  .post(verifyToken, Todolist.createTask);

listRouter
  .route("/:id")
  .get(Todolist.getSingleTask)
  .put(verifyToken, Todolist.updateTask)
  .delete(verifyToken, Todolist.deleteTask);

export default listRouter;
