import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import productosRoutes from './routes/productos.routes.js'
import direccionesRoutes from './routes/direcciones.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()
app.use(express.json())

app.use('/api', indexRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', productosRoutes)
app.use('/api', direccionesRoutes)
app.use('/api', pedidosRoutes)

app.listen(3000)
console.log("server running on port 3000")