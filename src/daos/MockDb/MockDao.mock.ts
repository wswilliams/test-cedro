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

    protected saveFile(dbFilePath: IUser, user: any): Promise<string> {

        const filename = `users-${getRandomInt()}.txt`;

        const dir: any = `tmp/${filename}`;

        let data = "Dados do Usuário Registrado\n";

        delete user.id;

        data += `Nome Comple: ${dbFilePath.nome_completo}` + '\n';
        data += `Date de Nacimento: ${dbFilePath.data_de_nascimento}` + '\n';
        data += `CPF: ${dbFilePath.cpf}` + '\n';
        data += `RG: ${dbFilePath.rg}` + '\n\n';

        data += `Usuário Autenticado: ${user.name}` + '\n';
        data += `Login: ${user.email}` + '\n';
        data += `IP: ${ip.address()}` + '\n';

        console.log("----------data-------")
        console.log(data)

        fs.writeFileSync(dir, data);
        return dir;
    }
}

export default MockDaoMock;
