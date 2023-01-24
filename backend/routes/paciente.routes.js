import { Router } from "express";
import {
  actualizarPaciente,
  eliminarPaciente,
  nuevoPaciente,
  obtenerPaciente,
  obtenerPacientes,
} from "../controllers/paciente.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
const router = Router();

router
  .route("/")
  .get(checkAuth, obtenerPacientes)
  .post(checkAuth, nuevoPaciente);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;
