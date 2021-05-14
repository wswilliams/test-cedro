import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
const fs = require('fs');


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

    protected saveFile(dbFilePath: any): Promise<void> {
        console.log(dbFilePath);
        return fs.writeFileSync(`tmp/users.txt`, dbFilePath);
    }
}

export default MockDaoMock;
