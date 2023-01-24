import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import generateToken from "../helpers/generateToken.js";
const veterinarioSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telefono: {
    type: String, 
    default: null,
    trim: true
  },
  web: {
    type: String, 
    default: null
  },
  token: {
    type: String,
    default: generateToken()
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
})

veterinarioSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password  = await bcrypt.hashSync(this.password, salt); 
})
veterinarioSchema.methods.comparePass = function (p) {
  return bcrypt.compareSync(p, this.password)
}
const Veterinario = mongoose.model('Veterinario', veterinarioSchema)

export default Veterinario