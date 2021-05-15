import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { User } from '@entities/User';
import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError, IRequest } from '@shared/constants';
import { adminMW } from "./middleware";
import { cookieProps } from '@shared/constants';
import { JwtService } from '@shared/JwtService';

const jwtService = new JwtService();

const router = Router();
router.use(adminMW);
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add-user-system', async (req: Request, res: Response) => {

    const { name, email, pwdHash } = req.body;
    const user = new User(name, email, 1, pwdHash);
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.addUser(user);
    return res.status(CREATED).json({ mensage: "Usuário criado com sucesso" });
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add-user', async (req: Request, res: Response) => {

    const { nome_completo, data_de_nascimento, cpf, rg } = req.body;
    const user = new User('', '', 1, '', 0, nome_completo, data_de_nascimento, cpf, rg);
  
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const jwt = req.signedCookies[cookieProps.key]
    const clientData = await jwtService.decodeJwt(jwt);
    user.id = clientData.id;
   const fileDir = await userDao.addFile(user);
    res.download(fileDir);
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
