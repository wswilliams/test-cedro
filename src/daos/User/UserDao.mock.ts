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


    public async addLogin(user: IUser): Promise<void> {
        const db = await super.openDb(dbLoginFilePath);
        user.id = getRandomInt();
        const passwordHash = await bcrypt.hash("xa1a9j1q5t0h7p2", 10);
        user.pwdHash = passwordHash;
        console.log("user: ", user)
        db.users.push(user);
        await super.saveDb(dbLoginFilePath, db);
        return;
    }

    public async addUser(user: any): Promise<void> {
 
        console.log("user: ", user)
        await super.saveFile(user);
        return;
    }

}

export default UserDao;
