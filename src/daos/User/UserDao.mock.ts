import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import * as bcrypt from "bcrypt";



class UserDao extends MockDaoMock implements IUserDao {


    public async getOne(email: string): Promise<IUser | null> {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }


    public async getAll(): Promise<IUser[]> {
        const db = await super.openDb();
        return db.users;
    }


    public async add(user: IUser): Promise<void> {
        const db = await super.openDb();
        user.id = getRandomInt();
        user.pwdHash = await bcrypt.hash(user.pwdHash, 10)

        // Store hash in your password DB.
        console.log("user: ", user)
        db.users.push(user);
        return
        await super.saveDb(db);
        return;
    }


    public async update(user: IUser): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === user.id) {
                db.users[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }
}

export default UserDao;
