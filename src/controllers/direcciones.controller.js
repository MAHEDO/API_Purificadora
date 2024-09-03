import { pool } from '../db.js';

export const getDirecciones = async (req, res) =>{
    try {
      const [rows] = await pool.query('SELECT * FROM direcciones')
      res.send(rows)
    } catch (error) {
       return res.status(500).json({
          message: "Something goes wrong."
       })
    }
}

export const getDireccion = async (req, res) => {
    try{
       const [rows] = await pool.query('SELECT * FROM direcciones WHERE id = ?', [req.params.id]) 
       if(rows.length <= 0) res.status(404).json ({
           message: 'Direccion no encontrada.' 
       })
       res.json(rows[0])
    } catch (error){
      return res.status(500).json({
         message: "Something goes wrong."
      })
    }
}

export const createDireccion = async (req, res) => {
    try{
      const {user_id, direccion, ciudad, estado, codigo_postal, es_principal} = req.body
      const [rows] = await pool.query('INSERT INTO direcciones (user_id, direccion, ciudad, estado, codigo_postal, es_principal) VALUES (?,?,?,?,?,?)', [user_id, direccion, ciudad, estado, codigo_postal, es_principal]) 
      res.send({
        id: rows.insertId,
        user_id, 
        direccion, 
        ciudad, 
        estado, 
        codigo_postal, 
        es_principal
      })  
    } catch (error) {
       return res.status(500).json({
         message: "Something goes wrong."
       })
    }
}

export const deleteDireccion = async (req, res) => {
    try{
       const [rows] = await pool.query('DELETE * FROM direcciones WHERE id = ?', [req.params.id]) 
       if(rows.affectedRows === 0) res.status(400).json ({
           message: 'Direccion no encontrada.' 
       })
       res.json(rows[0])
    } catch (error){
      return res.status(500).json({
         message: "Something goes wrong."
      })
    }
}

export const updateDireccion = async (req, res) => {
    try{
       const {id} = req.params.id
       const {direccion, ciudad, estado, codigo_postal, es_principal} = req.body
       const [result] = await pool.query('UPDATE SET direccion = IFNULL(?, direccion), ciudad = IFNULL(?, ciudad), estado = IFNULL(?, estado), codigo_postal = IFNULL(?, codigo_postal), es_principal = IFNULL(?,es_principal) WHERE id = ?', [direccion, ciudad, estado, codigo_postal, es_principal, id])
       if(rows.affectedRows === 0) res.status(400).json ({
           message: 'Direccion no encontrada.' 
       })
       res.json(rows[0])
    } catch (error){
      return res.status(500).json({
         message: "Something goes wrong."
      })
    }
}