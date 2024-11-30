import { Request, Response } from "express";

import Route from "winehorn/Route";

export default new Route("GET", "/", (req: Request, res: Response) => {
    res.send("Hello World!");
}); 