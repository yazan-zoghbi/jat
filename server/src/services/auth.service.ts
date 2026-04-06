import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import { CreateAccountDTO } from "../types/dto/auth.dto"


export const signAccessToken = (payload) => {
    const secret = process.env.JWT_ACCESS_SECRET!

    return jwt.sign(payload, secret, { expiresIn: "15m" })
}

export const signRefreshToken = (payload) => {
    const secret = process.env.JWT_REFRESH_SECRET!

    return jwt.sign(payload, secret, { expiresIn: "7d" })
}

export const refreshAccessToken = async (token: string) => {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;

    const user = await User.findById(payload.id);
    if (!user) throw new Error("User not found");

    return signAccessToken({ id: user._id, username: user.username });
};

export const createAccount = async (dto: CreateAccountDTO) => {
    try {
        const userExist = await User.findOne({ username: dto.username })

        if (userExist)
            throw new Error("This username is already exist.")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(dto.password, salt)

        const newUser = await User.create({ username: dto.username, password: hashedPassword })

        const accessToken = signAccessToken({ id: newUser._id, username: newUser.username })
        const refreshToken = signRefreshToken({ id: newUser._id })

        return { user: newUser, accessToken, refreshToken };
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }

        throw err;
    }


}

export const login = async (username, password) => {
    try {
        const userExist = await User.findOne({ username: username })

        if (!userExist)
            throw new Error("User not found.")

        const passwordValid = await bcrypt.compare(password, userExist.password)

        if (!passwordValid)
            throw new Error("username or password are not valid.")

        const accessToken = signAccessToken({ id: userExist._id, username: userExist.username })
        const refreshToken = signRefreshToken({ id: userExist._id })

        return { accessToken, refreshToken }

    } catch (err) {
        if (err instanceof Error)
            console.log(err.message);

        throw err

    }
}
