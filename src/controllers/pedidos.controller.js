import { pool } from '../db.js'

export const getPedidos = async (req, res) =>{
    try {
      const [rows] = await pool.query('SELECT * FROM Pedidos')
      res.send(rows)
    } catch (error) {
       return res.status(500).json({
          message: "Something goes wrong."
       })
    }
}

export const getPedido = async (req, res) =>{
    try {
      const [rows] = await pool.query('SELECT * FROM Pedidos WHERE id = ?', [req.params.id])
      if(rows.length <= 0) res.status(404).json ({
        message: 'Direccion no encontrada.' 
      })
      res.json(rows[0])
    } catch (error) {
       return res.status(500).json({
          message: "Something goes wrong."
       })
    }
}

export const createPedido = async (req, res) => {
    try {
      const {user_id, direccion_id,	estado,	metodo_pago, total,	fecha_pedido, fecha_entrega} = req.body
      const [rows] = await pool.query('INSERT INTO Pedidos (user_id, direccion_id, estado, metodo_pago, total, fecha_pedido, fecha_entrega) VALUES (?,?,?,?,?,?,?)', [user_id, direccion_id, estado, metodo_pago, total, fecha_pedido, fecha_entrega])
      res.send({ 
        id: rows.insertId,
        user_id, 
        direccion_id,	
        estado,	
        metodo_pago, 
        total,	
        fecha_pedido, 
        fecha_entrega
      })
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong."
        })  
    }
}

export const deletePedidos = async (req, res) => {
    try{
       const [rows] = await pool.query('DELETE * FROM pedido WHERE id = ?', [req.params.id]) 
       if(rows.affectedRows === 0) res.status(400).json ({
           message: 'Pedido no encontrado.' 
       })
       res.json(rows[0])
    } catch (error){
      return res.status(500).json({
         message: "Something goes wrong."
      })
    }
}

export const updatePedido = async (req, res) => {
    try{
       const {id} = req.params.id
       const {estado, metodo_pago, total, fecha_pedido, fecha_entrega} = req.body
       const [result] = await pool.query('UPDATE SET estado = IFNULL(?, estado), metodo_pago = IFNULL(?, metodo_pago), total = IFNULL(?, total), fecha_pedido = IFNULL(?, fecha_pedido), fecha_entrega = IFNULL(?,fecha_entrega) WHERE id = ?', [estado, metodo_pago, total, fecha_pedido, fecha_entrega, id])
       if(rows.affectedRows === 0) res.status(400).json ({
           message: 'Pedido no encontrado.' 
       })
       res.json(rows[0])
    } catch (error){
      return res.status(500).json({
         message: "Something goes wrong."
      })
    }
}