import { IUser } from '@entities/User';



export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getOneId: (id: number) => Promise<IUser | null>;
    addUser: (user: IUser) => Promise<void | null>;
    addFile: (users: IUser) => Promise<string>;
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
     * @param id
     */
    public getOneId(id: number): Promise<IUser | null> {
        // TODO
        return Promise.resolve(null);
    }



    /**
     *
     * @param user
     */
    public async addUser(user: IUser): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     * @param id
     */
    public async addFile(user: IUser): Promise<string> {
        // TODO
        return Promise.resolve('');
    }

}

export default UserDao;
