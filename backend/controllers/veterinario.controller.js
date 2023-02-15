import emailPassword from "../helpers/emailPassword.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import Veterinario from "../models/Veterinario.js";
export const register = async (req, res) => {
  const { email, name } = req.body;
  const userExist = await Veterinario.findOne({ email });

  if (userExist) return res.status(400).json({ msg: "El usuario ya existe" });

  try {
    //register on db
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    emailRegistro({ email, name, token: veterinarioGuardado.token });
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

export const profile = async (req, res) => {
  const { veterinario } = req;
  res.json(veterinario);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Veterinario.findOne({ email });
  if (!usuario) return res.status(500).json({ msg: "Usuario no existe" });

  if (!usuario.isConfirmed)
    return res.status(500).json({ msg: "Usuario no confirmado" });
  if (await !usuario.comparePass(password))
    return res.status(500).json({ msg: "Las contraseñas no coinciden" });

  res.json({
    _id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    token: generateJWT(usuario.id, usuario.email),
  });
};

export const confirm = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });
  if (!usuarioConfirmar)
    return res.status(404).json({
      msg: "Token no válido",
    });
  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.isConfirmed = true;
    await usuarioConfirmar.save();
    res.json({
      msg: "usuario confirmado",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Hubo un error" });
  }
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });

  if (!existeVeterinario)
    return res.status(403).json({ msg: "el usuario no existe" });

  try {
    existeVeterinario.token = generateToken();
    await existeVeterinario.save();
    emailPassword({
      email,
      name: existeVeterinario.name,
      token: existeVeterinario.token,
    });
    return res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

export const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (!tokenValido) return res.status(400).json({ msg: "Token no válido" });

  return res.json({ msg: "Token valido y el usuario si existe" });
};

export const newPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) return res.status(400).json({ msg: "Token no válido" });

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    return res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.params;

  const veterinario = await Veterinario.findById(id);

  if (!veterinario)
    return res.status(400).json({
      msg: "no se encontro el veterinario",
    });

  const { email } = req.body;
  if (veterinario.email !== email) {
    const existeVeterinario = await Veterinario.findOne({ email });

    if (existeVeterinario)
      return res.status(400).json({ msg: "Este correo ya esta en uso" });
  }
  try {
    veterinario.name = req.body.name || veterinario.name;
    veterinario.email = req.body.email || veterinario.email;
    veterinario.telefono = req.body.telefono || veterinario.telefono;
    veterinario.web = req.body.web || veterinario.web;
    await veterinario.save();
    return res.json({
      msg: "actualizado correctamente",
    });
  } catch (error) {
    return res.json(error);
  }
};

export const actualizarPassword = async (req, res) => {
  const { id } = req.veterinario;
  const { password, newPassword } = req.body;

  const veterinario = await Veterinario.findById(id);
  if (!veterinario) return res.status(400).json({ msg: "Token no válido" });

 try {
   if (await veterinario.comparePass(password)) {
    veterinario.password = newPassword;
    await veterinario.save();
    return res.json({
      msg: "Actualizado correctamente",
    });
  } else {
    return res.status(400).json({ msg: "El password actual es incorrecto" });
  }
 } catch (error) {
  return res.json(error)
 }

};
