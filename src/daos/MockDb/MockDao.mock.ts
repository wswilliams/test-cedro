import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';


interface IDatabase {
    users: IUser[];
}


class MockDaoMock {

    protected openDb(dbFilePath: string): Promise<IDatabase> {

        return jsonfile.readFile(dbFilePath) as Promise<IDatabase>;
    }


    protected saveDb(dbFilePath: string, db: IDatabase): Promise<void> {
        return jsonfile.writeFile(dbFilePath, db);
    }
}

export default MockDaoMock;
