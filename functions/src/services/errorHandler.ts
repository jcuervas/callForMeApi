import {isProduction} from "../../config/environment";

export function errorHandler(err: Error, req: any, res: any, next: any): any {
  if (isProduction()) {
    console.log(res)
  }
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(500);
  return res.json({err});
}
