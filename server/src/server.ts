import 'dotenv/config';
import express from "express"
import { connectDB } from "./config/db";


const app = express();
const PORT = process.env.PORT ?? 3000;



(async () => {
    await connectDB()
    app.listen(PORT, () => console.log(`JAT API running on port ${PORT}`))

})()

export default app;