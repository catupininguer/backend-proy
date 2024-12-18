import express from 'express';
import pool from "../../config.js"

const router = express.Router();


//listar productos
router.get('/',async (req,res) =>{
    try {
        const [result] = await pool.query('select * from productos')
        res.send(result);
    } catch (error) {
        console.log('error al listar',error);
        res.status(404).send('Error al listar productos')
    }

})

//crear productos
router.post('/',async (req,res)=>{
    try {
        const {nombre,precio,stock,fecha_vencimiento,categorias_id} = req.body
        const [result] = await pool.query('insert into productos (nombre,precio,stock,fecha_vencimiento,categorias_id) values (?,?,?,?,?)',[nombre,precio,stock,fecha_vencimiento,categorias_id])
        res.json({
            message: 'producto creado con exito',
        })
    } catch (error) {
        console.log('error al crear',error);
        res.status(500).send('Error al crear un producto');
    }
    })
    
    // actualizar productos
    router.patch('/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const {nombre,precio,stock,fecha_vencimiento,categorias_id} = req.body
            await pool.query('update productos set nombre = ?,precio=?,stock=?,fecha_vencimiento=?,categorias_id=? where id = ?', [nombre,precio,stock,fecha_vencimiento,categorias_id,id])
            res.json({
                message: 'producto actualizado con éxito',
            })
        } catch (error) {
            console.log('error al actualizar',error);
            res.status(500).send('Error al actualizar un producto');
        }
    });
    
    //eliminar productos
    router.delete('/:id', async (req, res) => {
        try {
            const {id} = req.params;
            await pool.query('delete from productos where id= ?',[id])
            res.json({
                message: 'producto eliminado con éxito',
                data: {id}
            })
        } catch (error) {
            console.log('error al eliminar',error);
            res.status(500).send('Error al eliminar el producto');
        }
    });


export default router;