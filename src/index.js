import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()
app.use(express.json())

app.use('/api', indexRoutes)
app.use('/api', usuariosRoutes)

app.listen(3000)
console.log("server running on port 3000")