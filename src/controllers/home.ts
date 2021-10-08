import { Request, Response } from "express";


/**
 * Home Page
 * @route GET /
 */

export const index = (req: Request, res: Response) : void => {
    res.render("home", {
        title: "COVID Vaccinator"
    });
};