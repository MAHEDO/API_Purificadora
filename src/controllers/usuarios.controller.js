import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {
    try{
      const [rows] = await pool.query('SELECT * FROM Usuarios') 
      res.send(rows)
    }catch(error){
      return res.status(500).json({
        message: 'Something goes wrong'
      })  
    }
}

export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id])
    if(rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    res.send(rows[0])
}

export const createUsuarios = async (req, res) => {
    //Aqui podemos agregar validacion de los datos a almacenar
    const {nombre, email, contraseña, telefono, direccion_principal, fecha_registro} = req.body
    const [rows] = await pool.query('INSERT INTO Usuarios (nombre, email, contraseña, telefono, direccion_principal, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)', [nombre, email, contraseña, telefono, direccion_principal, fecha_registro])
    res.send({
        id: rows.insertId,
        nombre, 
        email, 
        contraseña, 
        telefono, 
        direccion_principal, 
        fecha_registro
    })
}

export const deleteUsuarios = async (req, res) => {
    const result = await pool.query('DELETE FROM Usuarios WHERE id = ?', [req.params.id])
    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    res.sendStatus(204)
}

export const updateUsuarios = async (req, res) => {
    const {id} = req.params
    const {nombre, email, contraseña, telefono, direccion_principal, fecha_registro} = req.body 
    const [result] = await pool.query('UPDATE Usuarios SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), contraseña = IFNULL(?, contraseña), telefono = IFNULL(?, telefono), direccion_principal = IFNULL(?,direccion_principal), fecha_registro = IFNULL(?,fecha_registro) WHERE id = ?', [nombre, email, contraseña, telefono, direccion_principal, fecha_registro, id])
    if(result.affectedRows === 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id])
    res.json(rows[0])
}

