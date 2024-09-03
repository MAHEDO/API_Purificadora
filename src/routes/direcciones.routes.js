import { Router } from 'express'
import { getDireccion, getDirecciones, createDireccion, deleteDireccion, updateDireccion } from '../controllers/direcciones.controller.js';

const router = Router()

router.get('/direcciones', getDirecciones)

router.get('/direccion/:id', getDireccion)

router.post('/direccion', createDireccion)

router.patch('/direccion/:id', updateDireccion)

router.delete('/direccion/:id', deleteDireccion)

export default router