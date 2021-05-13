import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError, IRequest } from '@shared/constants';
import { adminMW } from "./middleware";

const router = Router();
router.use(adminMW);
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add-user-system', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.addLogin(user);
    return res.status(CREATED).end();
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add-user', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const register = await userDao.addUser(user);
    return res.status(CREATED).json(register);
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
