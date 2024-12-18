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

router.get('/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const [result] = await pool.query(`select * from productos where id=${id}`)
        res.send(result[0]);
        console.log(result)
    } catch (error) {
        console.log('error al listar',error);
        res.status(404).send('Error al listar producto')
    }
})

//crear productos
router.post('/',async (req,res)=>{
    try {
        const {name,description,stock,price,categoria} = req.body
        const [result] = await pool.query('insert into productos (name, description, price, stock, categoria) values (?,?,?,?,?)',[name,description,price,stock,categoria])
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
            const {name,description,stock,price,categoria} = req.body
            await pool.query('update productos set name = ?,price=?,stock=?,description=?,categoria=? where id = ?', [name,price,stock,description,categoria,id])
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