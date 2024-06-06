import mysql from 'mysql2/promise';
import { User } from './model/User';

const connectionConfig ={
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bancots'
}

async function connect(){
    const connection = await mysql.createConnection(connectionConfig);
    return connection;
}
async function createUser(user:User): Promise<number> {
    const connection = await connect();
    const [result] = await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)',[user.name, user.email])
}