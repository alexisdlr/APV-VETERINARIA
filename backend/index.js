import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import veterinarioRoutes from './routes/veterinario.routes.js'
import pacienteRoutes from './routes/paciente.routes.js'

const app = express()
const PORT = process.env.PORT || 8800
dotenv.config()
connectDB();
app.use(express.json())
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(PORT, () => {
  console.log('I been bollin up boy but aint nun major')
})