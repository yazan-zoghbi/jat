import express from "express"
import { loginHandler, refresh, signupHandler } from "../controllers/auth.controller"

const router = express.Router()


router.post("/register", signupHandler)
router.post("/login", loginHandler)
router.get("/refresh", refresh)


export default router