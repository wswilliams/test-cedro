import { Response } from 'supertest';
import { IUser } from '@entities/User';


export interface IResponse extends Response {
    body: {
        users: IUser[];
        error: string;
    };
}

export interface IReqBody {
    user?: IUser;
    email?: string;
    password?: string;
    nome_completo?: string;
    data_de_nascimento?: string;
    cpf?: string;
    rg?: string;
}
