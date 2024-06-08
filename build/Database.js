"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllUsers = exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.connect = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bancoaula'
};
async function connect() {
    const connection = await promise_1.default.createConnection(connectionConfig);
    return connection;
}
exports.connect = connect;
//Cadastro de Usuario
async function createUser(user) {
    const connection = await connect();
    const [result] = await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
    connection.end();
    return result.insertId;
}
exports.createUser = createUser;
//Buscar Usuario pelo ID
async function getUserById(userId) {
    const connection = await connect();
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
    connection.end();
    if (rows.length > 0) {
        const userData = rows[0];
        return userData;
    }
    return null;
}
exports.getUserById = getUserById;
//Atualiza dados do Usuario
async function updateUser(user) {
    const connection = await connect();
    await connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, user.id]);
    connection.end();
}
exports.updateUser = updateUser;
//Deleta Usuario
async function deleteUser(userId) {
    const connection = await connect();
    await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    connection.end();
}
exports.deleteUser = deleteUser;
//Listar todos os Usuarios
async function listAllUsers() {
    const connection = await connect();
    const [rows] = await connection.execute('SELECT * FROM users');
    connection.end();
    const userList = rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email
    }));
    return userList;
}
exports.listAllUsers = listAllUsers;
