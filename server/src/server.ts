import 'dotenv/config';
import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db";

import authRouter from "./routes/auth.routes"
import { errorHandler } from './middlewares/errorHandler';


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRouter);

app.use(errorHandler);

(async () => {
    await connectDB()
    app.listen(PORT, () => console.log(`JAT API running on port ${PORT}`))

})()

export default app;