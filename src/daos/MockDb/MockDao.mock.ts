import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
const fs = require('fs');
const ip = require('ip');


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

    protected saveFile(dbFilePath: IUser, user: any): Promise<void> {

        const filename = `users-${getRandomInt()}.txt`;

        const dir: any = `tmp/${filename}`;

        let data = "Dados do Usuário Registrado\n";

        delete user.id;

        data += JSON.stringify(dbFilePath) + "\n";

        const authenticatedUser = {
            usuario_altenticado: user.name,
            login: user.email,
            ip: ip.address()
        }
        data += "Dados do Usuário Logado\n";

        data += JSON.stringify(authenticatedUser);

        console.log("----------data-------")
        console.log(data)

        return fs.writeFileSync(dir, data);
    }
}

export default MockDaoMock;
