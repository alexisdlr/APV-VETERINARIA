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
const dominios = ['http://127.0.0.1:5173']

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
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(PORT, () => {
  console.log('I been bollin up boy but aint nun major')
})