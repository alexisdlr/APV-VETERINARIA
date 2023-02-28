import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import veterinarioRoutes from './routes/veterinario.routes.js'
import pacienteRoutes from './routes/paciente.routes.js'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 8800
dotenv.config()

connectDB();
const dominios = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if(dominios.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por cors'))
    }
  }
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', (req, res) => {
  res.send('holamundo')
})
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(PORT, () => {
  console.log('Working')
})