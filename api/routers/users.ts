import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const user = new User({
            username,
            password,
        });

        user.generateToken();

        await user.save();
        res.send(user);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: "This username not found!"});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: "This passwords is wrong!"});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({
            message: "Username and password are correct!",
            user
        });

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default userRouter;