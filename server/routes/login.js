import { setToken } from "../service/auth.js";
import { User } from "../models/user.js";
import express from "express";
export let loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            let token = setToken({ email: req.body.email, password: req.body.password });
            res.cookie('uid', token, { 
                httpOnly: false, 
                secure: false, 
                domain: 'localhost' 
              });
            res.send({ "status": true});
        } else {
            res.send({"status": false});
        }
    } catch {
        res.status(404).send("404 not found");
    }
})