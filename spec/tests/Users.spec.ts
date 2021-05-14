import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import UserDao from '@daos/User/UserDao.mock';
import { IUser, User } from '@entities/User';
import { login } from '../support/LoginAgent';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import { IReqBody, IResponse } from '../support/types';



describe('UserRouter', () => {

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;

    const usersPath = '/api/users';
    const addUsersPath = `${usersPath}/add-user`;

    let agent: SuperTest<Test>;
    let jwtCookie: string;


    beforeAll((done) => {
        agent = supertest.agent(app);
        login(agent, (cookie: string) => {
            jwtCookie = cookie;
            done();
        });
    });


    describe(`"POST:${addUsersPath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.post(addUsersPath).set('Cookie', jwtCookie).type('form').send(reqBody);
        };

        const userData = {
            user: new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };


        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            spyOn(UserDao.prototype, 'addUser').and.returnValue(Promise.resolve());
            callApi(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });


        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            callApi({})
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });


        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup Dummy IResponse
            const errMsg = 'Could not add user.';
            spyOn(UserDao.prototype, 'addUser').and.throwError(errMsg);
            // Call API
            callApi(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });
});
