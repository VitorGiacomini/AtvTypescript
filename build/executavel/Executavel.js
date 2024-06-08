"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
const readline_sync_1 = __importDefault(require("readline-sync"));
async function main() {
    let exit = false;
    while (!exit) {
        console.log(`Escolha a opção:
        1 - Criar usuário
        2 - Listar todos os usuarios
        3 - Buscar usuário por ID
        4 - Atualizar usuário
        5 - Deletar usuário 
        6 - Sair
        `);
        const option = readline_sync_1.default.question('Opção: ');
        switch (option) {
            case '1':
                const name = readline_sync_1.default.question('Digite o nome do usuario: ');
                const email = readline_sync_1.default.question('Digite o email do usuario: ');
                const newUser = { name, email };
                const newUserId = await (0, Database_1.createUser)(newUser);
                console.log(`Usuario criado com sucesso! ID: ${newUserId}`);
                break;
            case '2':
                const users = await (0, Database_1.listAllUsers)();
                console.log('Lista de Usuarios', users);
                break;
            case '3':
                const userId = Number(readline_sync_1.default.question('ID do usuario: '));
                const user = await (0, Database_1.getUserById)(userId);
                if (user) {
                    console.log('Usuario encontrado:', user);
                }
                else {
                    console.log('Usuario não encontrado');
                }
                break;
            case '4':
                const updateUserId = Number(readline_sync_1.default.question('ID do usuário a ser atualizado: '));
                const userToUpdate = await (0, Database_1.getUserById)(updateUserId);
                if (userToUpdate) {
                    const newName = readline_sync_1.default.question(`Novo nome do usuário (atual: ${userToUpdate.name}): `);
                    const newEmail = readline_sync_1.default.question(`Novo email do usuário (atual: ${userToUpdate.email}): `);
                    userToUpdate.name = newName || userToUpdate.name;
                    userToUpdate.email = newEmail || userToUpdate.email;
                    await (0, Database_1.updateUser)(userToUpdate);
                    console.log('Usuário atualizado com sucesso');
                }
                else {
                    console.log('Usuário não encontrado.');
                }
                break;
            case '5':
                const deleteUserId = Number(readline_sync_1.default.question('ID do usuário a ser deletado: '));
                await (0, Database_1.deleteUser)(deleteUserId);
                console.log('Usuário deletado com sucesso');
                break;
            case '6':
                exit = true;
                console.log('Saindo...');
                break;
            default:
                console.log('Ação inválida. Por favor, escolha um número entre 1 e 6.');
                break;
        }
    }
}
main();
