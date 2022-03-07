const pool = require("../db");

const getTareas = async (req, res) => {
  const allTareas = await pool.query(
    `SELECT id_tarea,estado_tarea,texto_tarea,fecha_termino FROM TAREA WHERE eliminar_tarea = false order by estado_tarea asc`
  );
  res.json(allTareas.rows);
};

const createTarea = async (req, res) => {
  const { texto_tarea, fecha_termino } = req.body;

  if (texto_tarea === "") return res.status(406).json("no ingreso su texto");
  if (texto_tarea.length > 25)
    return res.status(406).json("el maximo de caracteres es de 25");
  const newTarea = await pool.query(
    `
        INSERT INTO TAREA(texto_tarea, fecha_registro, fecha_termino) VALUES ($1,NOW(),$2) RETURNING *
        `,
    [texto_tarea, fecha_termino]
  );

  res.json(newTarea);
};

const updateTarea = async (req, res) => {
  const { id_tarea } = req.params;
  const { new_texto_tarea, new_estado_tarea, new_fecha_termino } = req.body;
  console.log(new_texto_tarea, new_estado_tarea, new_fecha_termino);

  if (typeof new_estado_tarea === "boolean") {
    const tareaUpdate = await pool.query(
      `
        UPDATE TAREA SET estado_tarea=$1
        WHERE id_tarea = $2 RETURNING *
        `,
      [new_estado_tarea,id_tarea]
    );
    res.json(tareaUpdate.rows[0]);
  }else if(typeof new_estado_tarea === "undefined"){
    if (new_texto_tarea.length === 0)
      return res
        .status(406)
        .json("No puede actualizar la tarea con un texto vacio");
    if (new_texto_tarea.length > 25)
      return res
        .status(406)
        .json(
          "No puede actualizar la tarea con un texto mayor a 25 caracteres"
        );

    const tareaUpdate = await pool.query(
      `
        UPDATE TAREA SET texto_tarea=$1, fecha_termino=$2 
        WHERE id_tarea = $3 RETURNING *
        `,
      [new_texto_tarea, new_fecha_termino, id_tarea]
    );
    res.json(tareaUpdate.rows[0]);
  }
};

const deleteTarea = async (req, res) => {
  const { id_tarea } = req.params;
  const { new_eliminar_tarea } = req.body;

  const tareaEliminada = await pool.query(
    `
        UPDATE TAREA SET eliminar_tarea = $1 
        WHERE id_tarea = $2 RETURNING *
    `,
    [new_eliminar_tarea, id_tarea]
  );

  res.json(tareaEliminada.rows[0]);
};

module.exports = {
  getTareas,
  updateTarea,
  deleteTarea,
  createTarea,
};
