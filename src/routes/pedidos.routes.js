import { Router } from 'express'
import { getPedido, getPedidos, createPedido, updatePedido, deletePedidos } from '../controllers/pedidos.controller.js'

const router = Router()

router.get('/pedidos', getPedidos)

router.get('/pedido/:id', getPedido)

router.post('/pedidos', createPedido)

router.patch('/pedidos/:id', updatePedido)

router.delete('/pedidos/:id', deletePedidos)

export default router