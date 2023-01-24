import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import Veterinario from "../models/Veterinario.js";
export const register = async (req, res) => {
  const { email } = req.body;
  const userExist = await Veterinario.findOne({ email });

  if (userExist)
    return res.status(400).json({ msg: "El usuario ya existe" });

  console.log(req.body)
  try {
    //register on db
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};
export const profile = async (req, res) => {
  const {veterinario} = req
  res.json({perfil: veterinario})
};
export const login = async (req, res) => {
  const {email, password} = req.body

  const usuario = await Veterinario.findOne({email})
  if(!usuario) return res.status(500).json({msg: 'Usuario no existe'})

  if(!usuario.isConfirmed) return res.status(500).json({msg: 'Usuario no confirmado'})
  if( await !usuario.comparePass(password)) return res.status(500).json({msg: 'Las contraseñas no coinciden'})
  
  res.json({token: generateJWT(usuario.id, usuario.email)})
};

export const confirm = async (req, res) => {
  const {token} = req.params

  const usuarioConfirmar = await Veterinario.findOne({token})

  if(!usuarioConfirmar) return res.status(400).json({
    msg: 'El usuario no existe'
  })

  try {
    usuarioConfirmar.token = null
    usuarioConfirmar.isConfirmed = true
    console.log(usuarioConfirmar)
    await usuarioConfirmar.save()
    res.json({
      msg: "usuario confirmado"
    });
  } catch (error) {
    console.log(error)
  }
};

export const forgotPass = async (req, res) => {
  const {email} = req.body

  const existeVeterinario = await Veterinario.findOne({email})

  if(!existeVeterinario) return res.status(403).json({msg: 'el usuario no existe'})

  try {
    existeVeterinario.token = generateToken()
    await existeVeterinario.save()
    return res.json({msg: 'Hemos enviado un email con las instrucciones'})
  } catch (error) {
    console.log(error)
    return res.json({error})
  }
}
export const checkToken = async (req, res) => {
  const {token} = req.params

  const tokenValido = await Veterinario.findOne({token})

  if(!tokenValido) return res.status(400).json({msg: 'Token no válido'})

  return res.json({msg: 'Token valido y el usuario si existe'})

}

export const newPass = async (req, res) => {
  const {token} = req.params
  const {password} = req.body

  const veterinario = await Veterinario.findOne({token})
  if(!veterinario) return res.status(400).json({msg: 'Token no válido'})

  try {
    veterinario.token = null
    veterinario.password = password
    await veterinario.save()
    return res.json({msg: 'Password modificado correctamente'})
  } catch (error) {
    console.log(error)
  }

}
