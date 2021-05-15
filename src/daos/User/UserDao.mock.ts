import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import * as bcrypt from "bcrypt";
const dbLoginFilePath = 'src/daos/MockDb/MockDb.json';

class UserDao extends MockDaoMock implements IUserDao {


    public async getOne(email: string): Promise<IUser | null> {
        const db = await super.openDb(dbLoginFilePath);
        for (const user of db.users) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }

    public async getOneId(id: number): Promise<IUser | null> {
        const db = await super.openDb(dbLoginFilePath);
        for (const user of db.users) {
            if (user.id === id) {
                return user;
            }
        }
        return null;
    }

    public async addFile(user: IUser): Promise<string> {

        const newUser: any = user;
        delete newUser.name; delete newUser.email;
        delete newUser.role; delete newUser.pwdHash;
        const userLogado = await this.getOneId(user.id);
        delete newUser.id;
        const fileDir = await super.saveFile(newUser, userLogado);
        return fileDir;
    }

    public async addUser(user: IUser): Promise<void> {

        const newUser: any = user;
        const db = await super.openDb(dbLoginFilePath);
        user.id = getRandomInt();
        const passwordHash = await bcrypt.hashSync(user.pwdHash, 0);
        user.pwdHash = passwordHash;
        user.role = 1; 
        delete newUser.nome_completo;
        delete newUser.data_de_nascimento;
        delete newUser.cpf;
        delete newUser.rg;
        db.users.push(newUser);

        await super.saveDb(dbLoginFilePath, db);
        return;
    }

}

export default UserDao;
