import { Request, Response } from "express";
import { createAccount, login, refreshAccessToken, signAccessToken, signRefreshToken } from "../services/auth.service";


export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken
    if (!token)
        res.status(401).json({ error: "No refresh token" });

    try {
        const accessToken = await refreshAccessToken(token);
        res.json({ accessToken });
    } catch {
        res.status(403).json({ error: "Invalid refresh token" });
    }
}

export const signupHandler = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body

        const { user, accessToken, refreshToken } = await createAccount(username, password)

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })

        res.status(201).json({
            message: "account created succesfuly",
            user: user,
            token: accessToken
        })
    } catch (err) {
        if (err instanceof Error)
            res.status(400).json({ error: err.message })
    }

}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const { accessToken, refreshToken } = await login(username, password)

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })

        res.status(201).json({
            message: "You logged in successfuly",
            token: accessToken
        })
    } catch (err) {
        if (err instanceof Error)
            res.status(400).json({ error: err.message })
    }


}