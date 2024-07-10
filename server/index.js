require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const dbConnect = require("./utils/dbConnect")
const userRouter = require("./routes/userRoutes")

app.use(express.json())
dbConnect()
app.use("/api/v1/users/",userRouter)

app.get("/test",(req,res)=>{
    res.json({message: "API is running"})
})
app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})