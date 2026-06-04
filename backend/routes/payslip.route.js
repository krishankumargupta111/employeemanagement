import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createPayslip, getPayslipById, getPayslips } from "../controllers/payslip.controller.js";

const paySlipRouter=Router()
paySlipRouter.post('/',protect,protectAdmin,createPayslip)
paySlipRouter.get('/',protect,getPayslips)
paySlipRouter.get('/:id',protect,getPayslipById)
export default paySlipRouter