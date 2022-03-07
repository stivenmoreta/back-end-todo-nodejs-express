const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

//import rutas
const tareaRoutes = require("./routes/tareas.routes");

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/tarea", tareaRoutes);

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
