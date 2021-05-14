import { IUser } from '@entities/User';



export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    addLogin: (user: IUser) => Promise<void>;
    addUser: (users: any, id: any) => Promise<void>;
}

class UserDao implements IUserDao {


    /**
     * @param email
     */
    public getOne(email: string): Promise<IUser | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     * @param user
     */
    public async addLogin(user: IUser): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async addUser(user: any, id: any): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }

}

export default UserDao;
