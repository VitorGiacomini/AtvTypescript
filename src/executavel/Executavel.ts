import { createUser, getUserById, updateUser, deleteUser, listAllUsers } from "../Database";
import { User } from "../model/User";
import readlineSync from 'readline-sync';

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
        
        const option = readlineSync.question('Opção: ');

        switch (option) {
            case '1':
                const name = readlineSync.question('Digite o nome do usuario: ');
                const email = readlineSync.question('Digite o email do usuario: ');
                const newUser: User = { name, email };
                const newUserId = await createUser(newUser);
                console.log(`Usuario criado com sucesso! ID: ${newUserId}`);
                break;
            case '2':
                const users = await listAllUsers();
                console.log('Lista de Usuarios', users);
                break;
            case '3':
                const userId = Number(readlineSync.question('ID do usuario: '));
                const user = await getUserById(userId);
                if (user) {
                    console.log('Usuario encontrado:', user);
                } else {
                    console.log('Usuario não encontrado');
                }
                break;
            case '4':
                const updateUserId = Number(readlineSync.question('ID do usuário a ser atualizado: '));
                const userToUpdate = await getUserById(updateUserId);
                if (userToUpdate) {
                    const newName = readlineSync.question(`Novo nome do usuário (atual: ${userToUpdate.name}): `);
                    const newEmail = readlineSync.question(`Novo email do usuário (atual: ${userToUpdate.email}): `);

                    userToUpdate.name = newName || userToUpdate.name;
                    userToUpdate.email = newEmail || userToUpdate.email;

                    await updateUser(userToUpdate);
                    console.log('Usuário atualizado com sucesso');
                } else {
                    console.log('Usuário não encontrado.');
                }
                break;
            case '5':
                const deleteUserId = Number(readlineSync.question('ID do usuário a ser deletado: '));
                await deleteUser(deleteUserId);
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
