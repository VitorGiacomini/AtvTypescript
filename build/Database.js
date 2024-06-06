"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bancots'
};
async function connect() {
    const connection = await promise_1.default.createConnection(connectionConfig);
    return connection;
}
async function createUser(user) {
    const connection = await connect();
    const [result] = await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
    connection.end();
    return result.insertId;
}
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
