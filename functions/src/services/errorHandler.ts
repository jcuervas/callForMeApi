
export function errorHandler(err: Error, req: any, res: any, next: any): any {
    console.log(res)
    if (res.headersSent) {
        next(err);
        return;
    }
    res.status(500);
    return res.json({ err });
}
