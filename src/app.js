import express from 'express'
import config from './config.js'
import categorias from './modulos/categorias/ruta.js'
import productos from './modulos/productos/ruta.js'
import pool from './config.js'
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200"
}))

//configuracion
app.set('port',4000);

//ruta
app.use('/api/categorias',categorias);
app.use('/api/productos',productos);

app.get("/api/productos", async (req, res) => {
    const pool = await pool.getPool()
    const result = pool.query("SELECT * FROM productos")
    console.log(result)
    res.json(result)
})

export default app;