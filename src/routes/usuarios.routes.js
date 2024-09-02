import { Router } from 'express'
import { getUsuarios, getUsuario, createUsuarios, updateUsuarios, deleteUsuarios } from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios)

router.get('/usuario/:id', getUsuario)

router.post('/usuarios', createUsuarios)

router.patch('/usuarios/:id', updateUsuarios)

router.delete('/usuarios/:id', deleteUsuarios)

export default router