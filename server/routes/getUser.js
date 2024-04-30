import { User } from "../models/user.js";
import { checkToken } from "../service/auth.js";
import express from "express";
export let getUserRouter = express.Router();

getUserRouter.get('/', async (req, res) => {
    try {
        let verifyUser = checkToken(req.headers.cookie?.slice(4));
        if (verifyUser) {
            res.send(verifyUser);
        }

    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});
