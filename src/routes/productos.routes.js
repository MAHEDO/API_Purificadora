import { Router } from 'express'
import { getProduct, getProducts, createProducts, updateProducts, deleteProducts } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos', getProducts)

router.get('/producto/:id', getProduct)

router.post('/productos', createProducts)

router.patch('/producto/:id', updateProducts)

router.delete('/producto/:id', deleteProducts)

export default router