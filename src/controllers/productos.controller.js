import { pool } from '../db.js';

export const getProducts = async (req, res) => {
    try{
      const [rows] = await pool.query('SELECT * FROM productos')
      res.send(rows)
    }catch(error){
       return res.error(500).json({
          message: "Something goes wrong"
       })
    }
}

export const getProduct = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
      if(rows.length <= 0) return res.status(404).json ({
        message: 'Usuario no encontrado'
      })
      res.json(rows[0]) 
    } catch (error) {
        return res.status(500).json({
          message: 'Something goes wrong'
        })
    }
}

export const createProducts = async (req, res) => {
    try {
      const {nombre, descripcion, precio, stock, fecha_creacion} = req.body
      const [rows] = await pool.query('INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion) VALUES (?,?,?,?,?)', [nombre, descripcion, precio, stock, fecha_creacion])
      res.send({
        id: rows.insertId,
        nombre, 
        descripcion, 
        precio, 
        stock, 
        fecha_creacion
      })
    } catch (error){
        return res.status(500).json({
           message: 'Something goes wrong'
        })
    }
}

export const deleteProducts = async (req, res) => {
    try{
      const result = await pool.query('DELETE * FROM productos WHERE id = ?', [req.params.id])
      if(result.affectedRows === 0) return res.status(400).json({
         message: 'Producto no encontrado'
      }) 
    } catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const updateProducts = async (req, res) => {
   try {
     const {id} = req.params.id
     const {nombre, descripcion, precio, stock, fecha_creacion} = req.body
     const [result] = await pool.query('UPDATE productos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), precio = IFNULL(?, precio), stock = IFNULL(?, stock), fecha_creacion = IFNULL(?,fecha_creacion) WHERE id = ?', [nombre, descripcion, precio, stock, fecha_creacion, id])
     if(result.affectedRows === 0) return res.status(400).json({
          message: 'Producto no encontrado'
     })
   } catch (error){
    return res.status(500).json({
        message: 'Something goes wrong'
    }) 
   }
}

