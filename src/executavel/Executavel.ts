import { createUser, getUserById, updateUser, deleteUser, listAllUsers } from "../Database";
import { User } from "../model/User";
async function main(){
    const newUser: User = {
        name: 'Vitor Giacomini',
        email: 'vitorgiacomini@gmail.com'
    }
    const newUserId = await createUser(newUser)
    console.log()
}