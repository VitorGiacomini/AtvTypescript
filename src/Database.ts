import mysql from 'mysql2/promise';
import { User } from './model/User';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bancots'
}

async function connect() {
    const connection = await mysql.createConnection(connectionConfig);
    return connection;
}

//Cadastro de Usuario
async function createUser(user: User): Promise<number> {
    const connection = await connect();
    const [result] = await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email])
    connection.end();
    return result.insertId;
}

//Buscar Usuario pelo ID
async function getUserById(userId: number): Promise<User | null> {
    const connection = await connect();
    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?', [userId]
    );
    connection.end();
    if (rows.length > 0) {
        const userData = rows[0] as User;
        return userData
    }
    return null
}

//Atualiza dados do Usuario
async function updateUser(user: User): Promise<void> {
    const connection = await connect()
    await connection.execute(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [user.name, user.email, user.id]
    )
    connection.end()
}

//Deleta Usuario
async function deleteUser(userId: number): Promise<void> {
    const connection = await connect()
    await connection.execute('DELETE FROM users WHERE id = ?', [userId])
    connection.end()
}

//Listar todos os Usuarios
async function listAllUsers(): Promise<User[]> {
    const connection = await connect()
    const [rows] = await connection.execute('SELECT * FROM users')
    connection.end()
    const userList: User[] = rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email
    }))
    return userList
}

export {
    connect, createUser, updateUser, deleteUser, getUserById, listAllUsers
}