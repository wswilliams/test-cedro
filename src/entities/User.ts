export enum UserRoles {
    Standard,
    Admin,
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
    nome_completo: string;
    data_de_nascimento: string;
    cpf: string;
    rg: string;
}

export class User implements IUser {

    public id: number;
    public name: string;
    public email: string;
    public role: UserRoles;
    public pwdHash: string;
    public nome_completo: string;
    public data_de_nascimento: string;
    public cpf: string;
    public rg: string;


    constructor(
        nameOrUser?: string | IUser,
        email?: string,
        role?: UserRoles,
        pwdHash?: string,
        id?: number,
        nome_completo?: string,
        data_de_nascimento?: string,
        cpf?: string,
        rg?: string,

    ) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            this.name = nameOrUser || '';
            this.email = email || '';
            this.role = role || UserRoles.Standard;
            this.pwdHash = pwdHash || '';
            this.id = id || -1;
            this.nome_completo = nome_completo || '',
                this.data_de_nascimento = data_de_nascimento || '',
                this.cpf = cpf || '',
                this.rg = rg || ''
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.role = nameOrUser.role;
            this.pwdHash = nameOrUser.pwdHash;
            this.id = nameOrUser.id;
            this.nome_completo = nameOrUser.nome_completo,
                this.data_de_nascimento = nameOrUser.data_de_nascimento,
                this.cpf = nameOrUser.cpf,
                this.rg = nameOrUser.rg
        }
    }
}
