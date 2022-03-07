const routes = require("express").Router();
const {
  getTareas,
  updateTarea,
  createTarea,
  deleteTarea,
} = require("../controllers/tareas.controller");

routes.get("/", getTareas);
routes.post("/", createTarea);
routes.put("/:id_tarea", updateTarea);
routes.delete("/:id_tarea", deleteTarea);

module.exports = routes;
