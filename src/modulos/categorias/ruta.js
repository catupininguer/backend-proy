import express from 'express';
import pool from "../../config.js"

const router = express.Router();

//listar categorias
router.get('/',async (req,res) =>{
    try {
        const [result] = await pool.query('select * from categorias')
        res.send(result);
    } catch (error) {
        console.log('error al listar',error);
        res.status(404).send('Error al listar categorias')
    }

})

//crear categorias
router.post('/',async (req,res)=>{
try {
    const {nombre} = req.body
    const [result] = await pool.query('insert into categorias (nombre) values (?)',[nombre])
    res.json({
        data: {id: result.insertId, nombre}
    })
} catch (error) {
    console.log('error al crear',error);
    res.status(500).send('Error al crear una categoria');
}
})

// actualizar categorias
router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre} = req.body
        await pool.query('update categorias set nombre = ? where id = ?', [nombre,id])
        res.json({
            message: 'categoria actualizada con éxito',
            data: {id, nombre}
        })
    } catch (error) {
        console.log('error al actualizar',error);
        res.status(500).send('Error al actualizar un producto');
    }
});

//eliminar categorias
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('delete from categorias where id= ?',[id])
        res.json({
            message: 'categoria eliminada con éxito',
            data: {id}
        })
    } catch (error) {
        console.log('error al eliminar',error);
        res.status(500).send('Error al eliminar la categoria');
    }
});


export default router;