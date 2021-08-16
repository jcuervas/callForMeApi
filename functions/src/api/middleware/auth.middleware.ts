import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import adminSdk from "../../config/adminSdk";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization?.split('Bearer ')[1]
    const verified = await adminSdk.verifyBearerToken(bearer)
    if (!verified) {
      return res.status(401).send({message: 'Access not authorized'})
    }
    next()
    return
  }
}
