import express from "express"
import cors from "cors"
import "dotenv/config"
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import multer from "multer"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import employeesRouter from "./routes/employee.route.js"
import profileRouter from "./routes/profile.route.js"
import attendanceRouter from "./routes/attendance.route.js"
import leaveRouter from "./routes/leave.route.js"
import paySlipRouter from "./routes/payslip.route.js"
import dashboardRouter from "./routes/dashboard.route.js"
const app=express()
const  PORT=process.env.PORT ||4000


app.use(cors())
app.use(express.json())
app.use(multer().none())
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/auth",authRouter)
app.use("/api/employees",employeesRouter)
app.use("/api/profile",profileRouter)
app.use('/api/attendance',attendanceRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/payslips',paySlipRouter)
app.use('/api/dashboard',dashboardRouter)
console.log("Functions:", functions);
console.log("Functions count:", functions?.length);


await connectDb()
app.listen(PORT,()=>
    console.log(`server is running on port ${PORT}`))
