import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import * as bcrypt from "bcrypt";
const dbLoginFilePath = 'src/daos/MockDb/MockDb.json';
const dbUsersFilePath = 'src/daos/MockDb/MockDb.backup.json';



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
        // user.pwdHash = await bcrypt.hash(user.pwdHash, 10)
        const passwordHash = await bcrypt.hash(user.pwdHash, 10);
        user.pwdHash = passwordHash;
        // Store hash in your password DB.
        console.log("user: ", user)
        db.users.push(user);
        await super.saveDb(dbLoginFilePath, db);
        return;
    }

    public async addUser(user: any): Promise<void> {
        const db = await super.openDb(dbUsersFilePath);
        user.id = getRandomInt();
        console.log("user: ", user)
        db.users.push(user);
        await super.saveDb(dbUsersFilePath, db);
        return;
    }

}

export default UserDao;
