import { Router } from "express";
import {
  actualizarPassword,
  checkToken,
  confirm,
  forgotPass,
  login,
  newPass,
  profile,
  register,
  updateProfile,
} from "../controllers/veterinario.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
const router = Router();

//public routes
router.post("/", register);
router.get("/confirmar/:token", confirm);
router.post("/login", login);
router.post("/olvide-password", forgotPass);
router.route("/olvide-password/:token").get(checkToken).post(newPass);
// private routes
router.get("/perfil", checkAuth, profile);
router.put("/perfil/:id", checkAuth, updateProfile);
router.put("/cambiar-password", checkAuth, actualizarPassword);

export default router;
