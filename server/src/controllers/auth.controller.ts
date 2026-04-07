import { NextFunction, Request, Response } from "express";
import { createAccount, login, refreshAccessToken } from "../services/auth.service";


export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken
        if (!token)
            res.status(401).json({ error: "No refresh token" });

        const accessToken = await refreshAccessToken(token);
        res.json({ accessToken });

    } catch (err) {
        next(err)
    }

}

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password } = req.body

        const { user, accessToken, refreshToken } = await createAccount({ username, password })

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })

        res.status(201).json({
            message: "account created succesfuly",
            user: user,
            token: accessToken
        })
    } catch (err) {
        next(err)
    }

}

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        const { accessToken, refreshToken } = await login(username, password)

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })

        res.status(200).json({
            message: "You logged in successfuly",
            token: accessToken
        })
    } catch (err) {
        next(err)
    }


}