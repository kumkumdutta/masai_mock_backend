const express = require("express")
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const cors = require("cors")
const empRouter = require("./routes/emp.route")
const { auth } = require("./middleware/auth.middleware")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())



app.use("/user",userRouter)

app.use(auth)
app.use("/emp",empRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at ${process.env.PORT}`)
})