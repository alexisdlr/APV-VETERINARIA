import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -isConfirmed')
      return next()
    } catch (error) {
     return res.status(403).json({msg: 'Token no valido'})      
    }
  }

  if(!token) return res.status(403).json({msg: 'Token no valido o inexistente'})
  next();
};
export default checkAuth;
