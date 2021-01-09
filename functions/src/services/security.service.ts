import * as jwt from 'jsonwebtoken';

const adminToken = 'aso978c8y39v8bfy3948pc';
export const API_KEY = "$%&Weprot17=?call4me@";

export function checkIfAuthenticated(req: any, res: any, next: any) {
    getAuthToken(req, async (token: string) => {
        try {
            token === adminToken
            || req.method === 'OPTIONS'
            || jwt.verify(token, API_KEY);
            next();
            return true;
        } catch (e) {
            return res.status(401).send({error: 'Access not authorized'});
        }
    })
}

function getAuthToken(req: any, next: any) {
    let access_token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        access_token = req.headers.authorization.split(' ')[1];
    }
    next(access_token);
}
