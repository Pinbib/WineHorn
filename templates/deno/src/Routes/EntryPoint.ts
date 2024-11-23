import { Request, Response } from "express";
// @ts-ignore
import Route from "winehorn/Route";

export default new Route("GET", "/", (req: Request, res: Response) => {
    res.send("Hello World!");
}); 