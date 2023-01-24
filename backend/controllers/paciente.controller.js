import Paciente from "../models/Pacientes.js";

export const nuevoPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);

  try {
    paciente.veterinario = req.veterinario._id;
    const pacienteGuardado = await paciente.save();
    return res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(pacientes);
};

export const obtenerPaciente = async (req, res) => {
  const {id} = req.params
  try {
    const paciente = await Paciente.findById(id)
  
    if(!paciente) return res.status(404).json({msg: 'No se encontró el paciente'})
    if (paciente.veterinario.toString() !== req.veterinario._id.toString()) return res.status(400).json({msg: 'Acción no valida'})
    return res.json(paciente)
  } catch (error) {
    console.log(error)
  }
};

export const actualizarPaciente = async (req, res) => {
  const {id} = req.params
  try {
    const paciente = await Paciente.findById(id)
  
    if(!paciente) return res.status(404).json({msg: 'No se encontró el paciente'})
    if (paciente.veterinario.toString() !== req.veterinario._id.toString()) return res.status(400).json({msg: 'Acción no valida'})

    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario|| paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
      const pacienteAct = await paciente.save()
      return res.json(pacienteAct)
    } catch (error) {
      console.log(error)
    }
    return res.json(paciente)
  } catch (error) {
    console.log(error)
  }
};

export const eliminarPaciente = async (req, res) => {
  const {id} = req.params
  try {
    const paciente = await Paciente.findById(id)
  
    if(!paciente) return res.status(404).json({msg: 'No se encontró el paciente'})
    if (paciente.veterinario.toString() !== req.veterinario._id.toString()) return res.status(400).json({msg: 'Acción no valida'})

    await paciente.deleteOne()
    return res.json({msg: 'Paciente eliminado'})
  } catch (error) {
    console.log(error)
  }
};