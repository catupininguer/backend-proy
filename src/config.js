import { config } from "dotenv";
import {createPool} from "mysql2/promise"

config();

const pool = createPool({
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

const getPool = async ()=> await pool;


export default pool;